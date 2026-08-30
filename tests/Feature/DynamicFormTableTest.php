<?php

use App\Models\EventPage;
use App\Models\User;
use App\Support\DynamicFormTableService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

test('saving a form element creates a dedicated physical table for that event', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id]);

    $this->actingAs($eo)->postJson(route('builder.save'), [
        'id' => $page->id,
        'title' => $page->title,
        'elements' => [[
            'id' => 'form_1',
            'type' => 'form',
            'props' => [
                'fields' => [
                    ['key' => 'nama_lengkap', 'required' => true],
                    ['key' => 'email', 'required' => true],
                ],
            ],
        ]],
        'pages' => [],
    ])->assertOk();

    $table = DynamicFormTableService::tableName($page->id);

    expect(Schema::hasTable($table))->toBeTrue()
        ->and(Schema::hasColumn($table, 'nama_lengkap'))->toBeTrue()
        ->and(Schema::hasColumn($table, 'email'))->toBeTrue()
        ->and(Schema::hasColumn($table, 'submission_id'))->toBeTrue();
});

test('two different events get two separate physical form tables', function () {
    $eo = User::factory()->create();
    $pageA = EventPage::factory()->create(['user_id' => $eo->id]);
    $pageB = EventPage::factory()->create(['user_id' => $eo->id]);

    $formElements = [[
        'id' => 'form_1',
        'type' => 'form',
        'props' => ['fields' => [['key' => 'telepon', 'required' => false]]],
    ]];

    $this->actingAs($eo)->postJson(route('builder.save'), [
        'id' => $pageA->id, 'title' => $pageA->title, 'elements' => $formElements, 'pages' => [],
    ])->assertOk();

    $this->actingAs($eo)->postJson(route('builder.save'), [
        'id' => $pageB->id, 'title' => $pageB->title, 'elements' => $formElements, 'pages' => [],
    ])->assertOk();

    expect(DynamicFormTableService::tableName($pageA->id))
        ->not->toBe(DynamicFormTableService::tableName($pageB->id))
        ->and(Schema::hasTable(DynamicFormTableService::tableName($pageA->id)))->toBeTrue()
        ->and(Schema::hasTable(DynamicFormTableService::tableName($pageB->id)))->toBeTrue();
});

test('submitting a form writes a row into the event physical table alongside form_submissions', function () {
    $eo = User::factory()->create();
    $page = EventPage::factory()->create(['user_id' => $eo->id]);

    $this->actingAs($eo)->postJson(route('builder.save'), [
        'id' => $page->id,
        'title' => $page->title,
        'elements' => [[
            'id' => 'form_1',
            'type' => 'form',
            'props' => ['fields' => [['key' => 'nama_lengkap', 'required' => true]]],
        ]],
        'pages' => [],
    ])->assertOk();

    $participant = User::factory()->create();

    $this->actingAs($participant)->postJson(
        route('api.form.submit', $page),
        ['data' => ['nama_lengkap' => 'Budi Santoso']]
    )->assertOk();

    $table = DynamicFormTableService::tableName($page->id);
    $row = DB::table($table)->first();

    expect($row)->not->toBeNull()
        ->and($row->nama_lengkap)->toBe('Budi Santoso')
        ->and($row->user_id)->toBe($participant->id);
});
