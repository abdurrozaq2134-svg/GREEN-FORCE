<?php

use App\Mail\OtpMail;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Mail::fake();

    Http::fake([
        'https://www.google.com/recaptcha/api/siteverify' => Http::response([
            'success' => true,
            'score' => 0.9,
            'action' => 'register',
        ]),
    ]);
});

test('send otp stores a verification code and mails it', function () {
    $response = $this->postJson(route('register.send-otp'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'g-recaptcha-response' => 'valid-token',
    ]);

    $response->assertOk();

    expect(EmailVerification::where('email', 'test@example.com')->exists())->toBeTrue();
    expect(User::where('email', 'test@example.com')->exists())->toBeFalse();

    Mail::assertSent(OtpMail::class);
});

test('verifying the otp creates the user and logs them in', function () {
    $code = '123456';

    EmailVerification::create([
        'email' => 'test@example.com',
        'code' => Hash::make($code),
        'expires_at' => now()->addMinutes(5),
    ]);

    $this->withSession(['pending_registration' => [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]]);

    $response = $this->postJson(route('register.verify'), [
        'email' => 'test@example.com',
        'code' => $code,
    ]);

    $response->assertOk()
        ->assertJsonPath('redirect', route('dashboard'));

    $this->assertAuthenticated();
    expect(User::where('email', 'test@example.com')->exists())->toBeTrue();
    expect(EmailVerification::where('email', 'test@example.com')->exists())->toBeFalse();
});

test('a wrong otp does not create the user', function () {
    EmailVerification::create([
        'email' => 'test@example.com',
        'code' => Hash::make('123456'),
        'expires_at' => now()->addMinutes(5),
    ]);

    $this->withSession(['pending_registration' => [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]]);

    $this->postJson(route('register.verify'), [
        'email' => 'test@example.com',
        'code' => '654321',
    ])->assertStatus(422);

    $this->assertGuest();
    expect(User::where('email', 'test@example.com')->exists())->toBeFalse();
});

test('resend otp is throttled after the first send', function () {
    $this->postJson(route('register.send-otp'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'g-recaptcha-response' => 'valid-token',
    ])->assertOk();

    $this->postJson(route('register.resend-otp'), [
        'email' => 'test@example.com',
    ])->assertStatus(429);
});
