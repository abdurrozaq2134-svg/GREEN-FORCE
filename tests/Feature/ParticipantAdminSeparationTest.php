<?php

use App\Models\EventPage;
use App\Models\User;

function eventWithPages(array $pages, array $attrs = []): EventPage
{
    return EventPage::factory()->published()->create(array_merge([
        'pages' => $pages,
        'elements' => $pages[0]['elements'] ?? [],
    ], $attrs));
}

// ===================== PUBLIC LINK: PARTICIPANT-ONLY =====================

test('the public page never ships an admin-mode page to the browser', function () {
    $page = eventWithPages([
        ['id' => 'page_1', 'name' => 'Beranda', 'mode' => 'participant', 'elements' => [
            ['id' => 'e1', 'type' => 'text', 'props' => ['content' => 'Halo peserta']],
        ]],
        ['id' => 'page_2', 'name' => 'Panitia', 'mode' => 'admin', 'elements' => [
            ['id' => 'e2', 'type' => 'text', 'props' => ['content' => 'RAHASIA PANITIA SAJA']],
        ]],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    $response->assertDontSee('RAHASIA PANITIA SAJA');
    $response->assertDontSee('page_2', false);
});

test('a legacy single-page event with no mode field still shows on the public link', function () {
    $page = EventPage::factory()->published()->create([
        'pages' => null,
        'elements' => [['id' => 'e1', 'type' => 'text', 'props' => ['content' => 'Konten lama']]],
    ]);

    $this->get(route('builder.public', $page->slug))
        ->assertOk()
        ->assertSee('Konten lama');
});

test('an event made entirely of admin pages renders no pages on the public link, not an error', function () {
    $page = eventWithPages([
        ['id' => 'page_1', 'name' => 'Panitia', 'mode' => 'admin', 'elements' => [
            ['id' => 'e1', 'type' => 'text', 'props' => ['content' => 'RAHASIA']],
        ]],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    $response->assertDontSee('RAHASIA');
});

// ===================== ADMIN LINK: AUTH + OWNERSHIP =====================

test('guests are redirected to login when opening the admin link', function () {
    $page = EventPage::factory()->create();

    $this->get(route('builder.public.admin', $page))->assertRedirect(route('login'));
});

test('a logged-in user who is not the owner cannot open the admin link', function () {
    $eo = User::factory()->create();
    $intruder = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id]);

    $this->actingAs($intruder)->get(route('builder.public.admin', $page))->assertForbidden();
});

test('the owner can open the admin link even for an unpublished draft', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id, 'is_published' => false]);

    $this->actingAs($eo)->get(route('builder.public.admin', $page))->assertOk();
});

test('the admin link shows admin-mode pages that the public link hides', function () {
    $eo = User::factory()->create();
    $page = eventWithPages([
        ['id' => 'page_1', 'name' => 'Beranda', 'mode' => 'participant', 'elements' => [
            ['id' => 'e1', 'type' => 'text', 'props' => ['content' => 'Halo peserta']],
        ]],
        ['id' => 'page_2', 'name' => 'Panitia', 'mode' => 'admin', 'elements' => [
            ['id' => 'e2', 'type' => 'text', 'props' => ['content' => 'ISI KHUSUS PANITIA']],
        ]],
    ], ['user_id' => $eo->id]);

    // Publik: tersembunyi
    $this->get(route('builder.public', $page->slug))->assertDontSee('ISI KHUSUS PANITIA');

    // Admin: terlihat
    $this->actingAs($eo)
        ->get(route('builder.public.admin', $page))
        ->assertOk()
        ->assertSee('ISI KHUSUS PANITIA');
});

test('the admin link still shows participant-mode pages too, not just admin ones', function () {
    $eo = User::factory()->create();
    $page = eventWithPages([
        ['id' => 'page_1', 'name' => 'Beranda', 'mode' => 'participant', 'elements' => [
            ['id' => 'e1', 'type' => 'text', 'props' => ['content' => 'Halo peserta']],
        ]],
    ], ['user_id' => $eo->id]);

    $this->actingAs($eo)
        ->get(route('builder.public.admin', $page))
        ->assertOk()
        ->assertSee('Halo peserta');
});

// ===================== BACKDOOR REGRESSION =====================

test('the old preview query-string trick no longer exposes admin pages on the public link', function () {
    $page = eventWithPages([
        ['id' => 'page_1', 'name' => 'Beranda', 'mode' => 'participant', 'elements' => []],
        ['id' => 'page_2', 'name' => 'Panitia', 'mode' => 'admin', 'elements' => [
            ['id' => 'e2', 'type' => 'text', 'props' => ['content' => 'BOCOR JIKA MASIH BISA']],
        ]],
    ]);

    $response = $this->get(route('builder.public', $page->slug).'?preview=1&view=admin');

    $response->assertOk();
    $response->assertDontSee('BOCOR JIKA MASIH BISA');
});
