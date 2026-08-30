<?php

use App\Models\EventPage;
use App\Models\User;

test('user can bulk delete their own events', function () {
    $user = User::factory()->create();
    $pages = EventPage::factory()->count(3)->create(['user_id' => $user->id]);
    $keep = EventPage::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->post(route('events.bulkDestroy'), [
        'ids' => $pages->pluck('id')->all(),
    ]);

    $response->assertRedirect(route('events.index'))
        ->assertSessionHas('success');

    expect(EventPage::whereIn('id', $pages->pluck('id'))->count())->toBe(0);
    expect(EventPage::find($keep->id))->not->toBeNull();
});

test('user cannot bulk delete events owned by someone else', function () {
    $user = User::factory()->create();
    $mine = EventPage::factory()->create(['user_id' => $user->id]);
    $theirs = EventPage::factory()->create();

    $this->actingAs($user)
        ->post(route('events.bulkDestroy'), [
            'ids' => [$mine->id, $theirs->id],
        ])
        ->assertForbidden();

    // Penolakan bersifat atomik: tidak ada yang terhapus sama sekali.
    expect(EventPage::find($mine->id))->not->toBeNull();
    expect(EventPage::find($theirs->id))->not->toBeNull();
});

test('bulk delete requires at least one existing id', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('events.bulkDestroy'), ['ids' => []])
        ->assertSessionHasErrors('ids');

    $this->actingAs($user)
        ->post(route('events.bulkDestroy'), ['ids' => [999999]])
        ->assertSessionHasErrors('ids.0');
});

test('guests cannot bulk delete events', function () {
    $page = EventPage::factory()->create();

    $this->post(route('events.bulkDestroy'), ['ids' => [$page->id]])
        ->assertRedirect(route('login'));

    expect(EventPage::find($page->id))->not->toBeNull();
});

test('my events page renders select all and per row checkboxes', function () {
    $user = User::factory()->create();
    EventPage::factory()->count(2)->create(['user_id' => $user->id]);

    $this->actingAs($user)
        ->get(route('events.index'))
        ->assertOk()
        ->assertSee('select-all-events')
        ->assertSee('bulk-delete-form')
        ->assertSee('name="ids[]"', false);
});
