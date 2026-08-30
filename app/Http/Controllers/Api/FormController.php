<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventPage;
use App\Models\FormField;
use App\Models\FormSubmission;
use App\Support\DynamicFormTableService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class FormController extends Controller
{
    // POST /api/events/{eventPage}/form/submit — Peserta submit form
    public function submit(Request $request, EventPage $eventPage)
    {
        // Cek kuota
        if ($eventPage->isQuotaFull()) {
            return response()->json([
                'success' => false,
                'message' => 'Kuota pendaftaran sudah penuh.',
            ], 422);
        }

        // Ambil field definitions
        $fields = $eventPage->formFields()->get();
        $rules = [];
        $messages = [];

        foreach ($fields as $field) {
            $key = $field->field_key;
            $fieldRules = [];

            if ($field->is_required) {
                $fieldRules[] = 'required';
            } else {
                $fieldRules[] = 'nullable';
            }

            // Validasi per data_type
            switch ($field->data_type) {
                case 'integer':
                    $fieldRules[] = 'integer';
                    break;
                case 'float':
                    $fieldRules[] = 'numeric';
                    break;
                case 'boolean':
                    $fieldRules[] = 'boolean';
                    break;
                case 'date':
                    $fieldRules[] = 'date';
                    break;
                case 'datetime':
                    $fieldRules[] = 'date_format:Y-m-d\TH:i:s';
                    break;
                case 'enum':
                    if ($field->options) {
                        $fieldRules[] = Rule::in($field->options);
                    }
                    break;
                case 'file':
                    $fieldRules[] = 'file';
                    break;
                case 'string':
                default:
                    $fieldRules[] = 'string';
                    if ($field->format === 'email') {
                        $fieldRules[] = 'email';
                    }
                    break;
            }

            if (! empty($fieldRules)) {
                $rules["data.{$key}"] = $fieldRules;
            }

            // Custom messages
            if ($field->is_required) {
                $messages["data.{$key}.required"] = "Field {$field->label} wajib diisi.";
            }
        }

        $validated = $request->validate($rules, $messages);

        // Cast values sesuai data_type
        $castedData = [];
        foreach ($fields as $field) {
            $key = $field->field_key;
            $raw = $validated['data'][$key] ?? null;
            $castedData[$key] = FormField::castValue($field->data_type, $raw);
        }

        // Simpan submission
        $submission = FormSubmission::create([
            'event_page_id' => $eventPage->id,
            'user_id' => Auth::id(),
            'data' => $castedData,
            'status' => FormSubmission::STATUS_PENDING,
        ]);

        // Paralel dengan form_submissions.data (JSON): tabel fisik
        // form_data_{event_page_id} milik event ini sendiri.
        DynamicFormTableService::insertSubmission($eventPage->id, $submission->id, Auth::id(), $castedData);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil.',
            'submission' => $submission,
            'redirect_url' => $eventPage->redirectPage?->slug
                ? route('builder.public', $eventPage->redirectPage->slug)
                : null,
        ]);
    }

    // GET /api/events/{eventPage}/participants — Admin: daftar peserta
    public function participants(EventPage $eventPage)
    {
        $this->authorizeOwner($eventPage);

        $submissions = $eventPage->formSubmissions()
            ->with(['user:id,name,email', 'user.googleAccount:id,user_id,avatar'])
            ->latest()
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $submissions->map(function ($s) {
                return [
                    'id' => $s->id,
                    'user' => $s->user ? [
                        'id' => $s->user->id,
                        'name' => $s->user->name,
                        'email' => $s->user->email,
                        'avatar' => $s->user->avatarUrl(),
                    ] : null,
                    'data' => $s->data,
                    'status' => $s->status,
                    'created_at' => $s->created_at->format('d M Y H:i'),
                ];
            }),
            'pagination' => [
                'current_page' => $submissions->currentPage(),
                'last_page' => $submissions->lastPage(),
                'total' => $submissions->total(),
            ],
            'quota' => [
                'total' => $eventPage->quota,
                'used' => $eventPage->formSubmissions()->count(),
                'remaining' => $eventPage->remainingQuota(),
            ],
        ]);
    }

    /**
     * POST /api/events/{eventPage}/payment/claim — Peserta menandai sudah bayar.
     *
     * Sengaja dipisah dari updatePayment() yang hanya boleh dipakai EO: di sini
     * peserta cuma bisa menyentuh submission miliknya sendiri, dan satu-satunya
     * status yang bisa diset adalah "menunggu_konfirmasi". Keputusan diterima
     * atau ditolak tetap manual di tangan EO lewat Daftar Peserta.
     */
    public function claimPayment(EventPage $eventPage)
    {
        $submission = $eventPage->formSubmissions()
            ->where('user_id', Auth::id())
            ->latest()
            ->first();

        if (! $submission) {
            return response()->json([
                'success' => false,
                'message' => 'Anda belum mendaftar di event ini.',
            ], 404);
        }

        if ($submission->isDiterima()) {
            return response()->json([
                'success' => true,
                'message' => 'Pembayaran Anda sudah dikonfirmasi panitia.',
                'status' => $submission->status,
            ]);
        }

        if (! $submission->isMenungguKonfirmasi()) {
            $submission->markMenungguKonfirmasi();
        }

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih. Pembayaran Anda menunggu konfirmasi panitia.',
            'status' => $submission->status,
        ]);
    }

    // PATCH /api/submissions/{submission}/payment — Admin: toggle status bayar
    public function updatePayment(Request $request, FormSubmission $submission)
    {
        $this->authorizeOwner($submission->eventPage);

        $request->validate([
            'status' => 'required|in:menunggu_konfirmasi,diterima',
        ]);

        $submission->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Status pembayaran diperbarui.',
            'submission' => [
                'id' => $submission->id,
                'status' => $submission->status,
            ],
        ]);
    }

    // GET /api/events/{eventPage}/form/quota — Cek kuota (untuk UI)
    public function quota(EventPage $eventPage)
    {
        return response()->json([
            'success' => true,
            'quota' => $eventPage->quota,
            'used' => $eventPage->formSubmissions()->count(),
            'remaining' => $eventPage->remainingQuota(),
            'is_full' => $eventPage->isQuotaFull(),
        ]);
    }

    private function authorizeOwner(EventPage $page): void
    {
        abort_if($page->user_id !== Auth::id(), 403, 'Anda tidak punya akses ke event ini.');
    }
}
