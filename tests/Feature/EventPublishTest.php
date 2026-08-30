<?php

use App\Models\EventPage;
use App\Models\FormSubmission;
use App\Models\User;

// ===================== SLUG SAFETY =====================

test('generateUniqueSlug avoids reserved subdomain names', function () {
    $slug = EventPage::generateUniqueSlug('www');
    expect($slug)->not->toBe('www');
    expect($slug)->toBe('www-event');
});

test('generateUniqueSlug caps length to a safe DNS label size', function () {
    $slug = EventPage::generateUniqueSlug(str_repeat('event title word ', 10));
    expect(mb_strlen($slug))->toBeLessThanOrEqual(63);
});

test('generateUniqueSlug never returns an empty string', function () {
    $slug = EventPage::generateUniqueSlug('***');
    expect($slug)->not->toBe('');
    expect($slug)->toBe('event');
});

test('generateUniqueSlug still de-duplicates collisions', function () {
    EventPage::factory()->create(['slug' => 'seminar-hijau']);
    $slug = EventPage::generateUniqueSlug('Seminar Hijau');
    expect($slug)->toBe('seminar-hijau-1');
});

// ===================== PUBLISH / UNPUBLISH =====================

test('owner can publish their event', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id, 'is_published' => false]);

    $response = $this->actingAs($eo)->postJson(route('builder.publish', $page));

    $response->assertOk()->assertJsonPath('success', true);
    expect($page->fresh()->is_published)->toBeTrue();
});

test('publishing an event with a blank slug regenerates one', function () {
    // Kolom `slug` NOT NULL di skema, jadi kondisi realistiknya bukan slug
    // benar-benar null, melainkan string kosong dari data lama/rusak.
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id, 'slug' => '', 'is_published' => false]);

    $this->actingAs($eo)->postJson(route('builder.publish', $page))->assertOk();

    expect($page->fresh()->slug)->not->toBe('');
});

test('publish response includes a working path url', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id, 'is_published' => false]);

    $response = $this->actingAs($eo)->postJson(route('builder.publish', $page));

    $path = $response->json('urls.path');
    expect($path)->toContain('/e/'.$page->slug);

    $this->get($path)->assertOk();
});

test('a non-owner cannot publish someone elses event', function () {
    $eo = User::factory()->create();
    $intruder = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id]);

    $this->actingAs($intruder)->postJson(route('builder.publish', $page))->assertForbidden();
    expect($page->fresh()->is_published)->toBeFalse();
});

test('guests cannot publish events', function () {
    $page = EventPage::factory()->create();

    $this->postJson(route('builder.publish', $page))->assertRedirect(route('login'));
});

test('the public page 404s until the event is published', function () {
    $page = EventPage::factory()->create(['is_published' => false]);

    $this->get(route('builder.public', $page->slug))->assertNotFound();
});

test('owner can unpublish, which takes the public page down again', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->published()->create(['user_id' => $eo->id]);

    $this->get(route('builder.public', $page->slug))->assertOk();

    $this->actingAs($eo)->postJson(route('builder.unpublish', $page))
        ->assertOk()->assertJsonPath('success', true);

    expect($page->fresh()->is_published)->toBeFalse();
    $this->get(route('builder.public', $page->slug))->assertNotFound();
});

test('unpublishing does not delete the event or its submissions', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->published()->create(['user_id' => $eo->id]);

    FormSubmission::create([
        'event_page_id' => $page->id,
        'data' => ['nama_lengkap' => 'Budi'],
        'status' => FormSubmission::STATUS_PENDING,
    ]);

    $this->actingAs($eo)->postJson(route('builder.unpublish', $page));

    expect(EventPage::find($page->id))->not->toBeNull();
    expect(FormSubmission::where('event_page_id', $page->id)->count())->toBe(1);
});

// ===================== SUBDOMAIN =====================

test('publish exposes a subdomain url when EVENT_SUBDOMAIN_HOST is configured', function () {
    // EVENT_SUBDOMAIN_HOST=racikevent.test sudah diisi tetap di phpunit.xml
    // (rute subdomain dibaca sekali saat boot, config() runtime tidak
    // memicu registrasi ulang rute).
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id, 'is_published' => false]);

    $response = $this->actingAs($eo)->postJson(route('builder.publish', $page));

    // APP_URL di .env testing punya port (http://localhost:8000) --
    // publicUrls() menyertakannya karena bukan port default 80/443,
    // kalau tidak link yang dibuka pengguna mengarah ke port yang salah.
    $port = parse_url(config('app.url'), PHP_URL_PORT);
    $expectedPort = $port ? ":{$port}" : '';
    expect($response->json('urls.subdomain'))->toBe("http://{$page->slug}.racikevent.test{$expectedPort}");
});

test('publish omits the subdomain url when EVENT_SUBDOMAIN_HOST is not configured', function () {
    config(['events.subdomain_host' => null]);

    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id, 'is_published' => false]);

    $response = $this->actingAs($eo)->postJson(route('builder.publish', $page));

    expect($response->json('urls.subdomain'))->toBeNull();
    expect($response->json('urls.path'))->not->toBeNull();
});

test('a published event is reachable through its subdomain', function () {
    $page = EventPage::factory()->published()->create(['slug' => 'seminar-hijau']);

    $response = $this->get('http://seminar-hijau.racikevent.test/');

    $response->assertOk();
});

test('an unpublished event 404s on its subdomain too', function () {
    EventPage::factory()->create(['slug' => 'draft-event', 'is_published' => false]);

    $this->get('http://draft-event.racikevent.test/')->assertNotFound();
});

// ===================== save() DUPLICATE-ROW BUG =====================

test('resaving with the id returned by the previous save updates the same row', function () {
    $eo = User::factory()->create();

    $payload = [
        'title' => 'Event Baru',
        'elements' => [],
        'pages' => [['id' => 'page_1', 'name' => 'Halaman 1', 'elements' => []]],
    ];

    $first = $this->actingAs($eo)->postJson(route('builder.save'), $payload)->json();
    expect(EventPage::count())->toBe(1);

    // Simulasikan autosave berikutnya: frontend sekarang mengirim id yang
    // dikembalikan save() pertama, bukan string kosong seperti sebelumnya.
    $second = $this->actingAs($eo)->postJson(route('builder.save'), $payload + ['id' => $first['id']])->json();

    expect(EventPage::count())->toBe(1);
    expect($second['id'])->toBe($first['id']);
});

test('sending an empty string id still creates only once per call (defensive backend check)', function () {
    $eo = User::factory()->create();

    $payload = [
        'id' => '',
        'title' => 'Event Baru',
        'elements' => [],
    ];

    $this->actingAs($eo)->postJson(route('builder.save'), $payload)->assertOk();

    expect(EventPage::count())->toBe(1);
});
