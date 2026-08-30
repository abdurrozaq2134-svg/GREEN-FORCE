<?php

use App\Models\EventPage;

test('the public page ships the generic link-wrapping helper and applies it to rendered elements', function () {
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
                    'content' => 'Teks link',
                    'isLink' => true,
                    'linkType' => 'external',
                    'linkTarget' => 'https://contoh.test',
                ],
            ]],
        ]],
        'elements' => [],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    // Sebelumnya toggle "Jadikan Link" di builder (untuk SEMUA elemen dasar
    // -- teks, bentuk, gambar, dst, bukan cuma tipe "link" khusus) tidak
    // pernah menghasilkan <a> apa pun di halaman publik: fungsi
    // pembungkusnya sama sekali tidak ada di public.blade.php.
    $response->assertSee('function racikWrapWithLink', false);
    $response->assertSee('racikWrapWithLink(renderElement(el), el.props)', false);
});
