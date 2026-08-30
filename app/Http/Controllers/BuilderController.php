<?php

namespace App\Http\Controllers;

use App\Models\EventPage;
use App\Models\FormField;
use App\Support\FormFieldCatalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuilderController extends Controller
{
    // Buka editor untuk membuat event baru
    public function create()
    {
        return view('builder.index', ['page' => null, 'pages' => $this->userPages()]);
    }

    // Buka editor untuk mengedit event yang sudah ada
    public function edit(EventPage $eventPage)
    {
        $this->authorizeOwner($eventPage);

        // Elements di-encode ulang jadi string JSON untuk ditaruh di data-attribute HTML
        $page = (object) [
            'id' => $eventPage->id,
            'title' => $eventPage->title,
            'elements' => json_encode($eventPage->elements ?? []),
            'pages' => json_encode($eventPage->pagesList()),
            'is_published' => $eventPage->is_published,
            'slug' => $eventPage->slug,
            'urls' => $eventPage->publicUrls(),
        ];

        return view('builder.index', ['page' => $page, 'pages' => $this->userPages()]);
    }

    // Simpan (create atau update) layout dari canvas
    public function save(Request $request)
    {
        $validated = $request->validate([
            'id' => 'nullable|exists:event_pages,id',
            'title' => 'required|string|max:255',
            // 'present', bukan 'required': Laravel menganggap array kosong
            // "tidak ada" di bawah aturan required, jadi kanvas kosong (event
            // baru sebelum elemen apa pun ditambahkan) selalu gagal validasi
            // 422 kalau memakai required. present hanya memastikan kuncinya ada.
            'elements' => 'present|array',
            'pages' => 'nullable|array',
            'pages.*.id' => 'required|string',
            'pages.*.name' => 'required|string|max:255',
            'pages.*.elements' => 'present|array',
        ]);

        // Normalisasi pages (multi-halaman). `elements` tetap disinkronkan
        // dengan halaman pertama untuk kompatibilitas render lama.
        $pages = null;
        if (!empty($validated['pages'])) {
            $pages = array_values(array_map(function ($p, $i) {
                return [
                    'id' => $p['id'],
                    'name' => $p['name'] !== '' ? $p['name'] : ('Halaman ' . ($i + 1)),
                    'elements' => array_values($p['elements']),
                ];
            }, $validated['pages'], array_keys($validated['pages'])));
        }

        // `nullable` membiarkan 'id' berupa null, tidak ada di payload, ATAU
        // string kosong (builder React lama mengirim "" untuk event baru
        // sebelum tersimpan) — ketiganya harus dianggap "belum ada".
        $eventId = $validated['id'] ?? null;
        if ($eventId) {
            $page = EventPage::findOrFail($eventId);
            $this->authorizeOwner($page);

            $wasPublished = $page->is_published;
            $page->update([
                'title' => $validated['title'],
                'elements' => $validated['elements'],
                'pages' => $pages ?? $page->pages,
            ]);

            \App\Models\ActivityLog::record(
                'event.updated',
                "Event \"{$validated['title']}\" diperbarui."
            );
        } else {
            $page = EventPage::create([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'slug' => EventPage::generateUniqueSlug($validated['title']),
                'elements' => $validated['elements'],
                'pages' => $pages,
            ]);

            \App\Models\ActivityLog::record(
                'event.created',
                "Event baru \"{$validated['title']}\" dibuat."
            );
        }

        $this->syncFormFields($page);

        return response()->json([
            'message' => 'Layout berhasil disimpan.',
            'id' => $page->id,
            'slug' => $page->slug,
        ]);
    }

    /**
     * Salin definisi field dari elemen Form di JSON builder ke tabel form_fields.
     *
     * FormController::submit() memvalidasi & meng-cast berdasarkan tabel ini.
     * Tanpa sinkronisasi, tabelnya kosong sehingga setiap pendaftaran tersimpan
     * dengan kolom `data` kosong — field yang dirancang EO tidak pernah ikut.
     */
    private function syncFormFields(EventPage $page): void
    {
        $seen = [];
        $rows = [];

        foreach ($this->collectElements($page) as $el) {
            if (($el['type'] ?? null) !== 'form') {
                continue;
            }

            foreach ($el['props']['fields'] ?? [] as $field) {
                // Entri lama berupa string dianggap wajib, sama seperti
                // perilaku form sebelum ada toggle wajib/opsional.
                $key = is_array($field) ? ($field['key'] ?? null) : $field;
                $required = is_array($field) ? ($field['required'] ?? true) : true;

                if (! is_string($key) || isset($seen[$key])) {
                    continue;
                }

                $def = FormFieldCatalog::find($key);
                if (! $def) {
                    continue;
                }

                $seen[$key] = true;
                $rows[] = [
                    'event_page_id' => $page->id,
                    'label' => $def['label'],
                    'field_key' => $key,
                    'data_type' => $def['data_type'],
                    'is_long_text' => $def['is_long_text'],
                    'format' => $def['format'],
                    'options' => $def['options'] ? json_encode($def['options']) : null,
                    'is_required' => (bool) $required,
                    'sort_order' => count($rows),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Ganti seluruhnya: rancangan form di builder adalah sumber kebenaran.
        FormField::where('event_page_id', $page->id)->delete();
        if ($rows) {
            FormField::insert($rows);
        }
    }

    /**
     * Semua elemen di seluruh halaman event, termasuk kolom `elements` lama.
     *
     * @return array<int, array<string, mixed>>
     */
    private function collectElements(EventPage $page): array
    {
        $all = [];

        foreach ($page->pagesList() as $pg) {
            foreach ($pg['elements'] ?? [] as $el) {
                if (is_array($el)) {
                    $all[] = $el;
                }
            }
        }

        foreach ($page->elements ?? [] as $el) {
            if (is_array($el)) {
                $all[] = $el;
            }
        }

        return $all;
    }

    // Daftar semua event milik user yang login
    public function index()
    {
        $pages = EventPage::where('user_id', Auth::id())
            ->latest()
            ->get();

        return view('dashboard.builder', compact('pages'));
    }

    // Halaman "Event Saya" (tabel daftar event)
    public function myEvents()
    {
        $pages = EventPage::where('user_id', Auth::id())
            ->latest('updated_at')
            ->get();

        return view('dashboard.event-saya', compact('pages'));
    }

    // Halaman publik hasil publish (diakses via subdomain nanti)
    public function showPublic(string $slug)
    {
        $page = EventPage::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Konteks peserta: dipakai elemen Form (gerbang login Google) dan
        // Tombol Bayar untuk memutuskan apa yang ditampilkan.
        $viewer = Auth::user();
        $submission = $viewer
            ? $page->formSubmissions()->where('user_id', $viewer->id)->latest()->first()
            : null;

        return view('builder.public', [
            'page' => $page,
            'allPages' => $page->pagesList(),
            'viewer' => $viewer ? [
                'id' => $viewer->id,
                'name' => $viewer->name,
                'email' => $viewer->email,
                'avatar' => $viewer->avatar,
            ] : null,
            'viewerSubmission' => $submission ? [
                'id' => $submission->id,
                'status' => $submission->status,
            ] : null,
        ]);
    }

    /**
     * Terbitkan event: is_published jadi true, sehingga /e/{slug} dan
     * (kalau EVENT_SUBDOMAIN_HOST diisi) <slug>.<host> mulai bisa diakses.
     *
     * Dipanggil dari tombol "Publish Subdomain" di toolbar builder — bukan
     * dari halaman Event Saya, supaya EO selalu publish versi yang baru saja
     * mereka lihat di kanvas (frontend sudah memaksa save() lunas dulu).
     */
    public function publish(EventPage $eventPage)
    {
        $this->authorizeOwner($eventPage);

        // Event dari sebelum fitur publish ada, atau yang slug-nya kosong
        // karena alasan lain, dibuatkan slug baru alih-alih gagal terbit.
        if (! $eventPage->slug) {
            $eventPage->slug = EventPage::generateUniqueSlug($eventPage->title);
        }

        $wasPublished = $eventPage->is_published;
        $eventPage->is_published = true;
        $eventPage->save();

        if (! $wasPublished) {
            \App\Models\ActivityLog::record(
                'event.published',
                "Event \"{$eventPage->title}\" dipublikasikan."
            );
        }

        return response()->json([
            'success' => true,
            'message' => $wasPublished ? 'Event sudah live — tautan tetap sama.' : 'Event berhasil dipublikasikan.',
            'slug' => $eventPage->slug,
            'urls' => $eventPage->publicUrls(),
        ]);
    }

    // Batalkan publikasi: halaman publik & subdomain langsung 404 lagi.
    // Data event (elements, submissions, dst.) tidak terhapus — cuma disembunyikan.
    public function unpublish(EventPage $eventPage)
    {
        $this->authorizeOwner($eventPage);

        $eventPage->update(['is_published' => false]);

        \App\Models\ActivityLog::record(
            'event.unpublished',
            "Event \"{$eventPage->title}\" ditarik dari publikasi."
        );

        return response()->json([
            'success' => true,
            'message' => 'Publikasi dibatalkan. Halaman publik & subdomain sudah tidak bisa diakses.',
        ]);
    }

    // Hapus event secara massal
    public function bulkDestroy(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:event_pages,id',
        ]);

        $ids = array_unique($validated['ids']);

        // Satu query untuk cek kepemilikan: kalau ada id yang bukan milik user,
        // jumlahnya tidak akan cocok dan seluruh permintaan ditolak.
        $owned = EventPage::whereIn('id', $ids)
            ->where('user_id', Auth::id())
            ->pluck('id');

        abort_if($owned->count() !== count($ids), 403, 'Anda tidak punya akses ke event ini.');

        $deleted = EventPage::whereIn('id', $owned)->delete();

        \App\Models\ActivityLog::record(
            'event.bulk_deleted',
            "{$deleted} event dihapus secara massal."
        );

        return redirect()->route('events.index')
            ->with('success', "{$deleted} event berhasil dihapus.");
    }

    // Hapus event
    public function destroy(EventPage $eventPage)
    {
        $this->authorizeOwner($eventPage);
        $eventPage->delete();
        \App\Models\ActivityLog::record(
            'event.deleted',
            "Event \"{$eventPage->title}\" dihapus."
        );
        return redirect()->route('events.index')->with('success', 'Event berhasil dihapus.');
    }

    private function authorizeOwner(EventPage $page): void
    {
        abort_if($page->user_id !== Auth::id(), 403, 'Anda tidak punya akses ke event ini.');
    }

    // Daftar ringkas halaman milik user (untuk dropdown tautan internal)
    private function userPages(): array
    {
        return EventPage::where('user_id', Auth::id())
            ->orderBy('title')
            ->get(['id', 'title', 'slug'])
            ->toArray();
    }
}
