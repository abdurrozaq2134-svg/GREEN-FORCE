<?php

use App\Http\Controllers\Api\FormController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\BuilderController;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Route;

// Login Google — path utama sesuai konvensi /auth/google/redirect;
// path lama /auth/google tetap dialihkan agar link lama tidak mati.
Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google', function () {
    return redirect()->route('google.redirect');
});
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return view('main page.landing');
})->name('landing');

// Showcase gulir imersif — halaman publik, tidak butuh autentikasi.
Route::view('/showcase', 'showcase')->name('showcase');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [BuilderController::class, 'index'])->name('dashboard');
    Route::delete('/event-saya/{eventPage}', [BuilderController::class, 'destroy'])->name('events.destroy');
    Route::post('/event-saya/bulk-delete', [BuilderController::class, 'bulkDestroy'])->name('events.bulkDestroy');
    Route::get('/event-saya', [BuilderController::class, 'myEvents'])->name('events.index');
    Route::get('/builder/new', [BuilderController::class, 'create'])->name('builder.create');
    Route::get('/builder/{eventPage}/edit', [BuilderController::class, 'edit'])->name('builder.edit');
    Route::post('/builder/save', [BuilderController::class, 'save'])->name('builder.save');
    Route::post('/builder/{eventPage}/publish', [BuilderController::class, 'publish'])->name('builder.publish');
    Route::post('/builder/{eventPage}/unpublish', [BuilderController::class, 'unpublish'])->name('builder.unpublish');
    Route::get('/e/{eventPage:slug}/admin', [BuilderController::class, 'showAdmin'])->name('builder.public.admin');

    // Log aktivitas asli untuk panel DIAGNOSTIK SISTEM
    Route::get('/api/activity-log', function () {
        $logs = ActivityLog::where('user_id', auth()->id())
            ->latest()
            ->limit(15)
            ->get(['description', 'status', 'created_at']);

        return response()->json([
            'logs' => $logs->map(fn ($l) => [
                'time' => $l->created_at->format('H:i'),
                'text' => $l->description,
                'status' => $l->status,
            ]),
        ]);
    })->name('api.activity-log');

    // API Form (Tier 1)
    Route::prefix('api/events/{eventPage}')->group(function () {
        Route::post('/form/submit', [FormController::class, 'submit'])->name('api.form.submit');
        Route::get('/participants', [FormController::class, 'participants'])->name('api.form.participants');
        Route::post('/payment/claim', [FormController::class, 'claimPayment'])->name('api.form.payment.claim');
    });
    Route::patch('/api/submissions/{submission}/payment', [FormController::class, 'updatePayment'])->name('api.form.payment');
});

Route::get('/e/{slug}', [BuilderController::class, 'showPublic'])->name('builder.public');

// Subdomain per event: <slug>.<host> menampilkan halaman yang sama dengan
// /e/{slug}. Baru aktif kalau EVENT_SUBDOMAIN_HOST diisi DAN DNS wildcard
// (*.<host>) sudah diarahkan ke server ini. Selama kosong, blok ini dilewati
// sehingga tidak ada rute tambahan yang terdaftar.
if ($eventHost = config('events.subdomain_host')) {
    Route::domain('{eventSlug}.'.$eventHost)->group(function () {
        Route::get('/', function (string $eventSlug) {
            return app(BuilderController::class)->showPublic($eventSlug);
        })->name('builder.public.subdomain');
    });
}

// Sisa kuota dipakai komponen Penghitung Peserta di halaman event publik, jadi
// harus bisa dibaca pengunjung yang belum login. Hanya mengembalikan angka.
Route::get('/api/events/{eventPage}/form/quota', [FormController::class, 'quota'])->name('api.form.quota');

require __DIR__.'/auth.php';
