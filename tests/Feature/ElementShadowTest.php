<?php

use App\Models\EventPage;

test('the public page ships the effects (shadow/border/blur) rendering helper', function () {
    $page = EventPage::factory()->published()->create();

    $response = $this->get(route('builder.public', $page->slug));

    $response->assertOk();
    // Panel properti builder sudah lama punya kontrol bayangan/border/blur
    // (props.effects, dipakai fxToCss() di kanvas), tapi public.blade.php
    // tidak pernah merender efek itu sama sekali -- EO desain bayangan,
    // publish, dan bayangannya hilang di halaman yang sebenarnya dilihat
    // peserta.
    $response->assertSee('function racikFxToCss', false);
    $response->assertSee('racikFxToCss(el.props && el.props.effects)', false);
});
