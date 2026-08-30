<?php

use App\Models\EventPage;

test('route() for the admin link uses the slug, not the numeric id', function () {
    $page = EventPage::factory()->create(['slug' => 'kelas-hijau', 'id' => 555]);

    $url = route('builder.public.admin', $page);

    expect($url)->toContain('/e/kelas-hijau/admin');
    expect($url)->not->toContain('/e/555/admin');
});
