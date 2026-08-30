<?php

use App\Models\EventPage;

function pageWithElement(array $element): EventPage
{
    return EventPage::factory()->published()->create([
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'participant',
            'elements' => [$element],
        ]],
        'elements' => [$element],
    ]);
}

test('an animated element ships its animation metadata to the public page', function () {
    $page = pageWithElement([
        'id' => 'a1',
        'type' => 'text',
        'x' => 0, 'y' => 0, 'width' => 200, 'height' => 60,
        'props' => [
            'content' => 'Halo',
            'animation' => 'bounce',
            'animInfinite' => true,
            'animDelay' => 0.5,
            'animDuration' => 1.2,
            'animTrigger' => 'load',
        ],
    ]);

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    // Data mentah elemen (dengan seluruh field animasinya) diserialisasi utuh
    // ke JSON yang dibaca JS sisi klien -- ini yang membuat racikResolveAnim()
    // di public.blade.php bisa menghasilkan durasi/delay/infinite yang benar.
    $response->assertSee('"animation":"bounce"', false);
    $response->assertSee('"animInfinite":true', false);
    $response->assertSee('"animDelay":0.5', false);
    $response->assertSee('"animDuration":1.2', false);
    $response->assertSee('"animTrigger":"load"', false);
});

test('the legacy "slide" animation key is still recognised server-side', function () {
    $page = pageWithElement([
        'id' => 'a1',
        'type' => 'text',
        'x' => 0, 'y' => 0, 'width' => 200, 'height' => 60,
        'props' => ['content' => 'Lama', 'animation' => 'slide'],
    ]);

    // Katalog RACIK_ANIM_PRESETS di public.blade.php harus tetap memetakan
    // "slide" -- dicek lewat kehadiran definisi keyframe-nya di halaman.
    $this->get(route('builder.public', $page->slug))
        ->assertOk()
        ->assertSee("slide: { keyframe: 'racikSlideDown'", false);
});

test('an element with no animation renders without breaking the page', function () {
    $page = pageWithElement([
        'id' => 'a1',
        'type' => 'text',
        'x' => 0, 'y' => 0, 'width' => 200, 'height' => 60,
        'props' => ['content' => 'Diam saja'],
    ]);

    $this->get(route('builder.public', $page->slug))
        ->assertOk()
        ->assertSee('Diam saja');
});

test('every animation preset used by the builder has a matching keyframe on the public page', function () {
    $jsCatalog = file_get_contents(resource_path('js/components/Builder/AnimationPresets.js'));
    preg_match_all('/keyframe:\s*"(racik[A-Za-z]+)"/', $jsCatalog, $matches);
    $keyframeNames = array_unique($matches[1]);

    expect($keyframeNames)->not->toBeEmpty();

    $publicBlade = file_get_contents(resource_path('views/builder/public.blade.php'));

    foreach ($keyframeNames as $name) {
        expect($publicBlade)->toContain("@keyframes {$name}");
    }
});
