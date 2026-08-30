<?php

use App\Models\EventPage;
use App\Models\FormField;
use App\Models\FormSubmission;
use App\Models\User;

function formElement(array $fields, string $id = 'f1'): array
{
    return [
        'id' => $id,
        'type' => 'form',
        'x' => 0, 'y' => 0, 'width' => 500, 'height' => 400,
        'scope' => 'participant',
        'props' => ['title' => 'Form Pendaftaran', 'fields' => $fields, 'requireLogin' => false],
    ];
}

function savePayload(array $elements, array $extra = []): array
{
    return array_merge([
        'title' => 'Event Uji',
        'elements' => $elements,
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'elements' => $elements,
        ]],
    ], $extra);
}

test('saving a form syncs its fields into form_fields with the required flag', function () {
    $eo = User::factory()->create();

    $this->actingAs($eo)
        ->postJson(route('builder.save'), savePayload([
            formElement([
                ['key' => 'nama_lengkap', 'required' => true],
                ['key' => 'telepon', 'required' => false],
            ]),
        ]))
        ->assertOk();

    $page = EventPage::latest('id')->first();
    $fields = FormField::where('event_page_id', $page->id)->orderBy('sort_order')->get();

    expect($fields)->toHaveCount(2);
    expect($fields[0]->field_key)->toBe('nama_lengkap');
    expect($fields[0]->is_required)->toBeTrue();
    expect($fields[0]->data_type)->toBe('string');
    expect($fields[1]->field_key)->toBe('telepon');
    expect($fields[1]->is_required)->toBeFalse();
    expect($fields[1]->format)->toBe('phone');
});

test('legacy string fields are treated as required', function () {
    $eo = User::factory()->create();

    $this->actingAs($eo)
        ->postJson(route('builder.save'), savePayload([formElement(['email'])]))
        ->assertOk();

    $page = EventPage::latest('id')->first();
    $field = FormField::where('event_page_id', $page->id)->first();

    expect($field->field_key)->toBe('email');
    expect($field->is_required)->toBeTrue();
});

test('resaving replaces the previous field definitions', function () {
    $eo = User::factory()->create();

    $this->actingAs($eo)->postJson(route('builder.save'), savePayload([
        formElement([['key' => 'nama_lengkap', 'required' => true]]),
    ]))->assertOk();

    $page = EventPage::latest('id')->first();

    $this->actingAs($eo)->postJson(route('builder.save'), savePayload([
        formElement([['key' => 'email', 'required' => true]]),
    ], ['id' => $page->id]))->assertOk();

    $keys = FormField::where('event_page_id', $page->id)->pluck('field_key')->all();
    expect($keys)->toBe(['email']);
});

test('a participant submission stores the designed fields and is counted', function () {
    $eo = User::factory()->create();

    $this->actingAs($eo)->postJson(route('builder.save'), savePayload([
        formElement([
            ['key' => 'nama_lengkap', 'required' => true],
            ['key' => 'telepon', 'required' => false],
        ]),
    ]))->assertOk();

    $page = EventPage::latest('id')->first();
    $page->update(['is_published' => true]);

    $peserta = User::factory()->create();

    // Kuota sebelum ada pendaftar
    $this->getJson(route('api.form.quota', $page))
        ->assertOk()
        ->assertJsonPath('used', 0);

    $this->actingAs($peserta)
        ->postJson(route('api.form.submit', $page), [
            'data' => ['nama_lengkap' => 'Siti', 'telepon' => '0811'],
        ])
        ->assertOk()
        ->assertJsonPath('success', true);

    $submission = FormSubmission::where('event_page_id', $page->id)->first();
    expect($submission->data['nama_lengkap'])->toBe('Siti');
    expect($submission->data['telepon'])->toBe('0811');
    expect($submission->status)->toBe(FormSubmission::STATUS_PENDING);

    // Penghitung Peserta membaca angka ini
    $this->getJson(route('api.form.quota', $page))
        ->assertOk()
        ->assertJsonPath('used', 1);
});

test('a required field cannot be left empty', function () {
    $eo = User::factory()->create();

    $this->actingAs($eo)->postJson(route('builder.save'), savePayload([
        formElement([['key' => 'nama_lengkap', 'required' => true]]),
    ]))->assertOk();

    $page = EventPage::latest('id')->first();
    $peserta = User::factory()->create();

    $this->actingAs($peserta)
        ->postJson(route('api.form.submit', $page), ['data' => ['nama_lengkap' => '']])
        ->assertStatus(422);

    expect(FormSubmission::where('event_page_id', $page->id)->count())->toBe(0);
});

test('an optional field may be omitted', function () {
    $eo = User::factory()->create();

    $this->actingAs($eo)->postJson(route('builder.save'), savePayload([
        formElement([
            ['key' => 'nama_lengkap', 'required' => true],
            ['key' => 'telepon', 'required' => false],
        ]),
    ]))->assertOk();

    $page = EventPage::latest('id')->first();
    $peserta = User::factory()->create();

    $this->actingAs($peserta)
        ->postJson(route('api.form.submit', $page), ['data' => ['nama_lengkap' => 'Budi']])
        ->assertOk();

    $submission = FormSubmission::where('event_page_id', $page->id)->first();
    expect($submission->data['nama_lengkap'])->toBe('Budi');
});

test('the public page ships the scope field so the renderer can filter on it', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->published()->create([
        'user_id' => $eo->id,
        'pages' => [[
            'id' => 'page_1',
            'name' => 'Halaman 1',
            'mode' => 'participant',
            'elements' => [
                ['id' => 'a1', 'type' => 'text', 'scope' => 'admin', 'props' => ['content' => 'RAHASIA PANITIA']],
                ['id' => 'p1', 'type' => 'text', 'scope' => 'participant', 'props' => ['content' => 'Halo peserta']],
            ],
        ]],
    ]);

    $this->get(route('builder.public', $page->slug))
        ->assertOk()
        ->assertSee('"scope":"admin"', false)
        ->assertSee('isElementVisibleInMode', false);
});
