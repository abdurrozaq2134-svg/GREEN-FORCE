<?php

namespace App\Rules;

    use Closure;
    use Illuminate\Contracts\Validation\ValidationRule;
    use Illuminate\Support\Facades\Http;
    use Illuminate\Support\Facades\Log;

    class Recaptcha implements ValidationRule
    {
        /**
         * Run the validation rule.
         */
        public function validate(string $attribute, mixed $value, Closure $fail): void
        {
            if (empty($value)) {
                $fail('Token reCAPTCHA tidak ditemukan.');
                return;
            }

            try {
                $response = Http::asForm()
                    ->timeout(10)
                    ->post('https://www.google.com/recaptcha/api/siteverify', [
                        'secret'   => config('services.recaptcha.secret_key'),
                        'response' => $value,
                        'remoteip' => request()->ip(),
                    ]);

                $result = $response->json();
            } catch (\Throwable $e) {
                Log::error('reCAPTCHA request failed: ' . $e->getMessage());
                $fail('Tidak dapat memverifikasi reCAPTCHA saat ini. Silakan coba lagi.');
                return;
            }

            // Log untuk debugging (hapus di production)
            Log::info('reCAPTCHA verification result', $result ?? []);

            if (!($result['success'] ?? false)) {
                $errors = $result['error-codes'] ?? [];
                Log::warning('reCAPTCHA verification failed', ['errors' => $errors]);
                $fail('Verifikasi reCAPTCHA gagal: ' . implode(', ', $errors) . '. Silakan coba lagi.');
                return;
            }

            $score = $result['score'] ?? 0;
            $threshold = (float) config('services.recaptcha.score_threshold', 0.5);

            if ($score < $threshold) {
                Log::warning('reCAPTCHA score too low', [
                    'score'     => $score,
                    'threshold' => $threshold,
                    'action'    => $result['action'] ?? null,
                ]);
                $fail('Aktivitas mencurigakan terdeteksi (skor: ' . $score . '). Silakan coba lagi.');
            }
        }
    }
