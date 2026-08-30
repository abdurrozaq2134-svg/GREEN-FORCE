<?php

namespace App\Support;

use App\Models\FormField;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Setiap event punya form-nya sendiri (satu form logis per halaman event,
 * digabung dari seluruh elemen Form di kanvas -- lihat
 * BuilderController::syncFormFields()). Sebelumnya SEMUA event menaruh
 * jawaban peserta di satu tabel bersama `form_submissions` (kolom `data`
 * berformat JSON). Kelas ini menambahkan tabel fisik terpisah PER EVENT --
 * `form_data_{event_page_id}` -- dengan kolom asli sesuai field yang EO
 * rancang, tanpa mengganggu `form_submissions` yang sudah ada (status
 * pendaftaran, kuota, dan alur pembayaran tetap jalan dari sana).
 *
 * Nama kolom HANYA boleh berasal dari FormFieldCatalog (daftar tetap di
 * kode, bukan teks bebas dari EO/peserta) -- itu sebabnya aman dipakai
 * langsung sebagai identifier SQL tanpa parameter binding.
 */
class DynamicFormTableService
{
    /** Kolom yang tidak boleh dipakai sebagai nama field (bentrok dengan kolom baku tabel). */
    private const RESERVED_COLUMNS = ['id', 'submission_id', 'user_id', 'created_at', 'updated_at'];

    public static function tableName(int $eventPageId): string
    {
        return "form_data_{$eventPageId}";
    }

    /**
     * Pastikan tabel fisik event ini ada dan kolomnya mencakup seluruh field
     * yang sedang dirancang EO. Sengaja additive-only: kolom yang sebelumnya
     * ada tapi field-nya baru saja dicopot dari desain form TIDAK dihapus --
     * menghapus kolom berarti menghapus data peserta yang sudah terlanjur
     * mengisi field itu.
     *
     * @param  Collection<int, FormField>  $fields
     */
    public static function sync(int $eventPageId, $fields): void
    {
        $table = self::tableName($eventPageId);

        if (! Schema::hasTable($table)) {
            Schema::create($table, function (Blueprint $t) {
                $t->id();
                $t->foreignId('submission_id')->constrained('form_submissions')->cascadeOnDelete();
                $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
                $t->timestamps();
            });
        }

        $missing = $fields->filter(function ($field) use ($table) {
            $key = $field->field_key ?? null;

            return $key && ! in_array($key, self::RESERVED_COLUMNS, true) && ! Schema::hasColumn($table, $key);
        });

        if ($missing->isEmpty()) {
            return;
        }

        Schema::table($table, function (Blueprint $t) use ($missing) {
            foreach ($missing as $field) {
                self::addColumn($t, $field->field_key, $field->data_type, (bool) $field->is_long_text);
            }
        });
    }

    private static function addColumn(Blueprint $table, string $key, string $dataType, bool $isLongText): void
    {
        $column = match ($dataType) {
            'integer' => $table->integer($key),
            'float' => $table->decimal($key, 14, 2),
            'boolean' => $table->boolean($key),
            'date' => $table->date($key),
            'datetime' => $table->dateTime($key),
            'enum' => $table->string($key, 100),
            'file' => $table->string($key, 500),
            default => $isLongText ? $table->text($key) : $table->string($key, 255),
        };

        $column->nullable();
    }

    /** Simpan satu jawaban peserta ke tabel fisik event ini (paralel dengan form_submissions). */
    public static function insertSubmission(int $eventPageId, int $submissionId, ?int $userId, array $castedData): void
    {
        $table = self::tableName($eventPageId);

        if (! Schema::hasTable($table)) {
            return;
        }

        $row = [
            'submission_id' => $submissionId,
            'user_id' => $userId,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        foreach ($castedData as $key => $value) {
            if (Schema::hasColumn($table, $key)) {
                $row[$key] = $value;
            }
        }

        DB::table($table)->insert($row);
    }
}
