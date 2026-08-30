<?php

use App\Models\EventPage;

function pageWithShape(array $props, string $type = 'rectangle'): EventPage
{
    return EventPage::factory()->published()->create([
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'participant',
            'elements' => [[
                'id' => 'shape-1',
                'type' => $type,
                'x' => 0, 'y' => 0, 'width' => 200, 'height' => 100,
                'props' => $props,
            ]],
        ]],
        'elements' => [],
    ]);
}

/*
 * shapeMarkup() dan racikResolveBackgroundFill() jalan di BROWSER (JS),
 * bukan di server -- Laravel cuma mengirim data mentah elemen (lewat
 * @json($allPages)) plus kode JS-nya sendiri. Jadi yang bisa dites di sini
 * adalah: (1) data gradient sampai utuh ke payload yang dibaca klien, dan
 * (2) fungsi JS yang memprosesnya benar-benar terkirim & terstruktur benar.
 * Verifikasi hasil akhirnya (apakah <linearGradient> beneran muncul di DOM)
 * dilakukan lewat browser sungguhan, bukan Pest.
 */

test('a gradient background is serialised intact into the client-side payload', function () {
    $page = pageWithShape([
        'background' => [
            'type' => 'gradient',
            'angle' => 135,
            'stops' => [
                ['color' => '#7F77DD', 'position' => 0],
                ['color' => '#D4537E', 'position' => 100],
            ],
        ],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    $response->assertSee('"type":"gradient"', false);
    $response->assertSee('"angle":135', false);
    $response->assertSee('"color":"#7F77DD"', false);
    $response->assertSee('"color":"#D4537E"', false);
});

test('a gradient with more than two colours is serialised in full, not truncated', function () {
    $page = pageWithShape([
        'background' => [
            'type' => 'gradient',
            'angle' => 90,
            'stops' => [
                ['color' => '#111111', 'position' => 0],
                ['color' => '#222222', 'position' => 50],
                ['color' => '#333333', 'position' => 100],
            ],
        ],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    $response->assertSee('"color":"#111111"', false);
    $response->assertSee('"color":"#222222"', false);
    $response->assertSee('"color":"#333333"', false);
});

test('a shape with only the legacy bgColor still serialises correctly (no background object required)', function () {
    $page = pageWithShape(['bgColor' => '#4b5563']);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    $response->assertSee('"bgColor":"#4b5563"', false);
});

test('the public page ships the gradient rendering functions the client needs', function () {
    $page = pageWithShape(['bgColor' => '#4b5563']);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    $response->assertSee('function racikResolveBackgroundFill', false);
    $response->assertSee('function racikCssGradientString', false);
    $response->assertSee('function racikSvgGradientLine', false);
    $response->assertSee('function racikSvgOpen', false);
});

test('the JS gradient helper functions exist identically named in both the builder and the public page', function () {
    $jsFile = file_get_contents(resource_path('js/components/Builder/GradientColorField.jsx'));
    $bladeFile = file_get_contents(resource_path('views/builder/public.blade.php'));

    expect($jsFile)->toContain('export function resolveBackgroundFill');
    expect($jsFile)->toContain('export function cssGradientString');
    expect($jsFile)->toContain('export function svgGradientLine');

    expect($bladeFile)->toContain('function racikResolveBackgroundFill');
    expect($bladeFile)->toContain('function racikCssGradientString');
    expect($bladeFile)->toContain('function racikSvgGradientLine');
});

test('every raw svg-open call site in shapeMarkup passes gradientDefsStr through', function () {
    // Regresi spesifik: svgPolygon() dipanggil dari 6 tempat berbeda di
    // shapeMarkup(); kalau salah satu lupa meneruskan gradientDefsStr,
    // bentuk itu (segitiga/segilima/dst.) akan diam-diam kehilangan
    // gradiennya tanpa error apa pun.
    $bladeFile = file_get_contents(resource_path('views/builder/public.blade.php'));

    preg_match_all('/svgPolygon\([^;]*?\);/s', $bladeFile, $matches);
    expect($matches[0])->not->toBeEmpty();

    foreach ($matches[0] as $call) {
        expect($call)->toContain('gradientDefsStr');
    }
});
