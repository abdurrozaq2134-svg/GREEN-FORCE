<?php

use App\Models\EventPage;

test('the public event page does not load the builder React bundle', function () {
    $page = EventPage::factory()->published()->create();

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    // public.blade.php dulu ikut memuat @vite(['resources/js/builder.jsx']),
    // padahal halaman ini vanilla JS murni. Elemen di sini memakai class
    // "canvas-element" yang sama dengan kanvas builder, jadi CSS bundle itu
    // ikut aktif di sini: cursor:move di semua elemen + teks tidak bisa
    // di-select. Regression guard: bundle builder tidak boleh lagi muncul.
    $response->assertDontSee('builder.jsx', false);
    $response->assertDontSee('assets/builder-', false);
});
