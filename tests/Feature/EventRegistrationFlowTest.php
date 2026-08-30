<?php

use App\Models\EventPage;
use App\Models\FormSubmission;
use App\Models\User;

function publishedEvent(?User $owner = null): EventPage
{
    return EventPage::factory()->published()->create([
        'user_id' => ($owner ?? User::factory()->create())->id,
    ]);
}

test('participant can claim payment which moves submission to menunggu konfirmasi', function () {
    $event = publishedEvent();
    $participant = User::factory()->create();

    $submission = FormSubmission::create([
        'event_page_id' => $event->id,
        'user_id' => $participant->id,
        'data' => ['nama_lengkap' => 'Peserta'],
        'status' => FormSubmission::STATUS_PENDING,
    ]);

    $this->actingAs($participant)
        ->postJson(route('api.form.payment.claim', $event))
        ->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('status', FormSubmission::STATUS_MENUNGGU_KONFIRMASI);

    expect($submission->fresh()->status)->toBe(FormSubmission::STATUS_MENUNGGU_KONFIRMASI);
});

test('claiming payment never jumps straight to diterima', function () {
    $event = publishedEvent();
    $participant = User::factory()->create();

    FormSubmission::create([
        'event_page_id' => $event->id,
        'user_id' => $participant->id,
        'data' => [],
        'status' => FormSubmission::STATUS_PENDING,
    ]);

    $this->actingAs($participant)
        ->postJson(route('api.form.payment.claim', $event))
        ->assertJsonMissing(['status' => FormSubmission::STATUS_DITERIMA]);
});

test('an already accepted payment is left untouched by the participant', function () {
    $event = publishedEvent();
    $participant = User::factory()->create();

    $submission = FormSubmission::create([
        'event_page_id' => $event->id,
        'user_id' => $participant->id,
        'data' => [],
        'status' => FormSubmission::STATUS_DITERIMA,
    ]);

    $this->actingAs($participant)
        ->postJson(route('api.form.payment.claim', $event))
        ->assertOk()
        ->assertJsonPath('status', FormSubmission::STATUS_DITERIMA);

    expect($submission->fresh()->status)->toBe(FormSubmission::STATUS_DITERIMA);
});

test('participant cannot touch another participant submission', function () {
    $event = publishedEvent();
    $mine = User::factory()->create();
    $other = User::factory()->create();

    $theirs = FormSubmission::create([
        'event_page_id' => $event->id,
        'user_id' => $other->id,
        'data' => [],
        'status' => FormSubmission::STATUS_PENDING,
    ]);

    // Belum mendaftar sendiri → 404, dan submission orang lain tidak berubah.
    $this->actingAs($mine)
        ->postJson(route('api.form.payment.claim', $event))
        ->assertNotFound();

    expect($theirs->fresh()->status)->toBe(FormSubmission::STATUS_PENDING);
});

test('guests cannot claim payment', function () {
    $event = publishedEvent();

    $this->postJson(route('api.form.payment.claim', $event))
        ->assertUnauthorized();
});

test('public event page exposes viewer context', function () {
    $event = publishedEvent();
    $participant = User::factory()->create();

    // Tamu: viewer null
    $this->get(route('builder.public', $event->slug))
        ->assertOk()
        ->assertSee('viewer: null', false);

    // Sudah login: identitas ikut dikirim
    $this->actingAs($participant)
        ->get(route('builder.public', $event->slug))
        ->assertOk()
        ->assertSee($participant->email, false);
});

test('google redirect remembers a published event to return to', function () {
    $event = publishedEvent();

    $this->get(route('google.redirect', ['event' => $event->slug]))
        ->assertRedirectContains('accounts.google.com');

    expect(session('google_return_event'))->toBe($event->slug);
});

test('google redirect ignores an unknown or unpublished event slug', function () {
    $draft = EventPage::factory()->create(['is_published' => false]);

    $this->get(route('google.redirect', ['event' => $draft->slug]));
    expect(session('google_return_event'))->toBeNull();

    $this->get(route('google.redirect', ['event' => 'tidak-ada']));
    expect(session('google_return_event'))->toBeNull();
});
