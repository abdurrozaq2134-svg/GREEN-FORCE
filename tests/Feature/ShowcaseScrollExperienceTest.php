<?php

use App\Models\User;

it('menampilkan halaman showcase untuk tamu', function () {
    $this->get(route('showcase'))
        ->assertOk()
        ->assertViewIs('showcase')
        ->assertSee('Halaman event yang', false);
});

it('memasang panggung WebGL beserta deskripsi teks alternatifnya', function () {
    $response = $this->get(route('showcase'));

    $response->assertSee('data-showcase-stage', false);
    $response->assertSee('data-showcase-canvas', false);
    $response->assertSee('role="img"', false);

    // Canvas tidak bisa dibaca screen reader, jadi aria-label wajib ada.
    expect($response->getContent())->toContain('aria-label="Visual 3D:');
});

it('menyediakan lima babak yang terhubung ke rel navigasi', function () {
    $content = $this->get(route('showcase'))->getContent();

    expect(substr_count($content, 'data-act-section'))->toBe(5);
    expect(substr_count($content, 'data-act-index='))->toBe(5);

    foreach (['Pembuka', 'Kanvas', 'Modular', 'Menyatu', 'Mulai'] as $actName) {
        expect($content)->toContain('data-act-name="'.$actName.'"');
    }
});

it('menyertakan kontrol aksesibilitas: skip link dan sakelar animasi', function () {
    $this->get(route('showcase'))
        ->assertSee('Lewati ke konten')
        ->assertSee('data-motion-toggle', false)
        ->assertSee('aria-pressed="true"', false);
});

it('memuat entrypoint vite milik showcase', function () {
    $content = $this->get(route('showcase'))->getContent();

    // Cocok untuk dev server (resources/js/showcase.js) maupun build (showcase-<hash>.js).
    expect($content)->toMatch('/showcase(-[A-Za-z0-9_-]+)?\.js/')
        ->and($content)->toMatch('/showcase(-[A-Za-z0-9_-]+)?\.css/');
});

it('mengarahkan tamu ke landing dan pengguna terautentikasi ke builder', function () {
    $this->get(route('showcase'))
        ->assertSee(route('landing'), false)
        ->assertDontSee(route('builder.create'), false);

    $this->actingAs(User::factory()->create())
        ->get(route('showcase'))
        ->assertSee(route('dashboard'), false)
        ->assertSee(route('builder.create'), false);
});
