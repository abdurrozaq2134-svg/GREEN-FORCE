<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\OtpMail;
use App\Models\EmailVerification;
use App\Models\User;
use App\Rules\Recaptcha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Session;

class RegisterController extends Controller
{
    private const RESEND_COOLDOWN_SECONDS = 60;

    public function sendOtp(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'g-recaptcha-response' => ['required', new Recaptcha()],
        ]);

        $code = (string) random_int(100000, 999999);

        EmailVerification::where('email', $request->email)->delete();

        EmailVerification::create([
            'email' => $request->email,
            'code' => Hash::make($code),
            'expires_at' => now()->addMinutes(5),
        ]);

        Session::put('pending_registration', [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $this->sendOtpEmail($request->email, $code);

        // Set cooldown resend sejak OTP pertama dikirim
        $this->markResendCooldown($request->email);

        return response()->json([
            'message' => 'Kode verifikasi telah dikirim ke email Anda.',
        ]);
    }

    // TAHAP 2: user input kode OTP -> baru akun dibuat
    public function verifyAndRegister(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|digits:6',
        ]);

        $pending = Session::get('pending_registration');

        if (!$pending || $pending['email'] !== $request->email) {
            return response()->json([
                'message' => 'Sesi pendaftaran tidak ditemukan atau sudah kedaluwarsa. Silakan ulangi dari awal.',
            ], 422);
        }

        $verification = EmailVerification::where('email', $request->email)
            ->latest()
            ->first();

        if (!$verification || $verification->expires_at->isPast()) {
            return response()->json([
                'message' => 'Kode verifikasi sudah kedaluwarsa. Silakan minta kode baru.',
            ], 422);
        }

        if (!Hash::check($request->code, $verification->code)) {
            return response()->json([
                'message' => 'Kode verifikasi salah.',
            ], 422);
        }

        $user = User::create([
            'name' => $pending['name'],
            'email' => $pending['email'],
            'password' => $pending['password'],
            'email_verified_at' => now(),
        ]);

        $verification->delete();
        Session::forget('pending_registration');
        RateLimiter::clear($this->resendThrottleKey($request->email));

        Auth::login($user);

        return response()->json([
            'message' => 'Registrasi berhasil!',
            'redirect' => route('dashboard'),
        ]);
    }

    // Kirim ulang kode -> dibatasi 1x per 60 detik per email
    public function resendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $pending = Session::get('pending_registration');
        if (!$pending || $pending['email'] !== $request->email) {
            return response()->json(['message' => 'Sesi tidak ditemukan.'], 422);
        }

        $throttleKey = $this->resendThrottleKey($request->email);

        // Kalau masih dalam masa cooldown, tolak dan kasih tahu sisa detiknya
        if (RateLimiter::tooManyAttempts($throttleKey, 1)) {
            $secondsLeft = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'message' => "Mohon tunggu {$secondsLeft} detik sebelum meminta kode baru.",
                'retry_after' => $secondsLeft,
            ], 429);
        }

        $code = (string) random_int(100000, 999999);

        EmailVerification::where('email', $request->email)->delete();
        EmailVerification::create([
            'email' => $request->email,
            'code' => Hash::make($code),
            'expires_at' => now()->addMinutes(5),
        ]);

        $this->sendOtpEmail($request->email, $code);
        $this->markResendCooldown($request->email);

        return response()->json(['message' => 'Kode baru telah dikirim.']);
    }

    /**
     * Kirim email OTP. Dibungkus try-catch supaya kalau SMTP gagal,
     * error asli tercatat di storage/logs/laravel.log dan bisa dilacak.
     */
    private function sendOtpEmail(string $email, string $code): void
    {
        try {
            Mail::to($email)->send(new OtpMail($code));
        } catch (\Throwable $e) {
            \Log::error('Gagal mengirim email OTP: ' . $e->getMessage(), [
                'email' => $email,
            ]);

            abort(response()->json([
                'message' => 'Gagal mengirim email verifikasi. Silakan coba lagi beberapa saat lagi.',
            ], 500));
        }
    }

    private function resendThrottleKey(string $email): string
    {
        return 'otp-resend:' . strtolower($email);
    }

    private function markResendCooldown(string $email): void
    {
        RateLimiter::hit($this->resendThrottleKey($email), self::RESEND_COOLDOWN_SECONDS);
    }
}
