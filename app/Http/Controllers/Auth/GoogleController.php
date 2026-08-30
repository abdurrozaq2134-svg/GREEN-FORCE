<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\EventPage;
use App\Models\GoogleAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    /**
     * Peserta yang login dari halaman event publik harus balik ke halaman itu,
     * bukan ke dashboard EO. Tujuan disimpan di session (bukan query string
     * yang dibawa ke Google) dan hanya boleh berupa slug event yang terbit.
     */
    public function redirect(Request $request)
    {
        $request->session()->forget('google_return_event');

        if ($slug = $request->query('event')) {
            $exists = EventPage::where('slug', $slug)->where('is_published', true)->exists();
            if ($exists) {
                $request->session()->put('google_return_event', $slug);
            }
        }

        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Data akun Google (google_id, avatar) punya tabelnya sendiri
        // (google_accounts) -- users tetap satu sumber identitas untuk semua
        // metode login, terlepas dari itu daftar manual atau lewat Google.
        $user = GoogleAccount::where('google_id', $googleUser->getId())->first()?->user
            ?? User::where('email', $googleUser->getEmail())->first();

        if (! $user) {
            // Email dari Google otomatis dianggap terverifikasi
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => Hash::make(Str::random(24)),
                'email_verified_at' => now(),
            ]);
        }

        // updateOrCreate: user lama yang login Google pertama kali ikut
        // tertaut di sini, bukan cuma user yang baru dibuat di atas.
        GoogleAccount::updateOrCreate(
            ['user_id' => $user->id],
            ['google_id' => $googleUser->getId(), 'avatar' => $googleUser->getAvatar()],
        );

        Auth::login($user);

        if ($slug = session()->pull('google_return_event')) {
            $page = EventPage::where('slug', $slug)->first();

            // Prioritaskan subdomain (<slug>.<host>) kalau sudah aktif, supaya
            // peserta yang login dari subdomain tidak dilempar balik ke URL
            // path — keduanya menuju konten yang sama, tapi URL-nya harus
            // konsisten dengan yang mereka lihat sebelum klik "Masuk dengan
            // Google".
            $subdomainUrl = $page?->publicUrls()['subdomain'] ?? null;

            return redirect($subdomainUrl ?? route('builder.public', $slug));
        }

        return redirect()->route('dashboard');
    }
}
