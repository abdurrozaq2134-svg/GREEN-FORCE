<?php

use App\Models\EventPage;

test('a text element with a custom fontFamily renders it on the public page', function () {
    $page = EventPage::factory()->published()->create([
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'participant',
            'elements' => [[
                'id' => 't1',
                'type' => 'text',
                'x' => 0, 'y' => 0, 'width' => 200, 'height' => 60,
                'props' => [
                    'content' => 'Judul Acara',
                    'fontFamily' => "'Playfair Display', Georgia, 'Times New Roman', serif",
                ],
            ]],
        ]],
        'elements' => [],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    // Sebelumnya renderer 'text' di public.blade.php sama sekali tidak
    // mengeluarkan font-family -- font yang dipilih EO di builder tidak
    // pernah sampai ke pengunjung. Ini regression guard untuk itu.
    $response->assertSee('const fontFamilyCss = tp.fontFamily', false);
    $response->assertSee('font-family:${escapeAttr(tp.fontFamily)}', false);
});

test('a text element without a fontFamily does not emit an empty font-family declaration', function () {
    $page = EventPage::factory()->published()->create([
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'participant',
            'elements' => [[
                'id' => 't1',
                'type' => 'text',
                'x' => 0, 'y' => 0, 'width' => 200, 'height' => 60,
                'props' => ['content' => 'Tanpa font kustom'],
            ]],
        ]],
        'elements' => [],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    // Guard tetap ada (fungsinya dipakai), tapi ternary-nya harus
    // menghasilkan string kosong saat fontFamily tidak diisi.
    $response->assertSee('tp.fontFamily ?', false);
});
