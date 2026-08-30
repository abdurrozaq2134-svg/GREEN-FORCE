<?php

use App\Models\EventPage;
use App\Models\User;

test('saving a page preserves its mode instead of silently dropping it', function () {
    $user = User::factory()->create();
    $page = EventPage::factory()->create([
        'user_id' => $user->id,
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'admin',
            'elements' => [],
        ]],
    ]);

    $this->actingAs($user)->postJson(route('builder.save'), [
        'id' => $page->id,
        'title' => $page->title,
        'elements' => [],
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'admin',
            'elements' => [],
        ]],
    ])->assertOk();

    // Bug lama: array_map di BuilderController::save() cuma menyalin
    // id/name/elements, jadi mode halaman admin hilang begitu saja setelah
    // save pertama -- halaman admin jadi ikut tampil ke peserta publik.
    expect($page->fresh()->pages[0]['mode'])->toBe('admin');
});

test('saving without a mode field on a page defaults it to participant', function () {
    $user = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user)->postJson(route('builder.save'), [
        'id' => $page->id,
        'title' => $page->title,
        'elements' => [],
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'elements' => [],
        ]],
    ])->assertOk();

    expect($page->fresh()->pages[0]['mode'])->toBe('participant');
});
