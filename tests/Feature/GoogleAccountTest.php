<?php

use App\Models\GoogleAccount;
use App\Models\User;
use Illuminate\Support\Facades\Schema;

test('google account data lives in its own table, not on users', function () {
    $user = User::factory()->create();

    GoogleAccount::create([
        'user_id' => $user->id,
        'google_id' => 'g-123',
        'avatar' => 'https://example.test/avatar.png',
    ]);

    expect($user->fresh()->googleAccount->google_id)->toBe('g-123')
        ->and($user->fresh()->avatarUrl())->toBe('https://example.test/avatar.png');

    // users tidak lagi punya kolom google_id/avatar sama sekali.
    expect(Schema::hasColumn('users', 'google_id'))->toBeFalse()
        ->and(Schema::hasColumn('users', 'avatar'))->toBeFalse();
});

test('a user without a linked google account has a null avatar url', function () {
    $user = User::factory()->create();

    expect($user->avatarUrl())->toBeNull();
});
