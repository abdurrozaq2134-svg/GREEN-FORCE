<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    /** Katalog data_type yang valid (bukan tipe input UI). */
    public const DATA_TYPES = [
        'string', 'integer', 'float', 'boolean',
        'date', 'datetime', 'enum', 'file',
    ];

    protected $fillable = [
        'event_page_id',
        'label',
        'field_key',
        'data_type',
        'is_long_text',
        'format',
        'options',
        'is_required',
        'sort_order',
    ];

    protected $casts = [
        'options' => 'array',
        'is_required' => 'boolean',
        'is_long_text' => 'boolean',
    ];

    public function eventPage()
    {
        return $this->belongsTo(EventPage::class);
    }

    /**
     * Cast nilai mentah dari form peserta sesuai data_type field ini,
     * sehingga kolom JSON `data` di form_submissions menyimpan tipe
     * beneran: integer/float sebagai angka, boolean sebagai true/false
     * (bukan string "5" / "true") — gampang difilter & di-query.
     */
    public static function castValue(string $dataType, mixed $raw): mixed
    {
        switch ($dataType) {
            case 'integer':
                if ($raw === null || $raw === '') {
                    return null;
                }
                return (int) $raw;
            case 'float':
                if ($raw === null || $raw === '') {
                    return null;
                }
                return (float) str_replace(',', '.', (string) $raw);
            case 'boolean':
                // checkbox mengirim "1"/"on"/"true" atau absen sama sekali
                return !in_array($raw, [null, '', '0', 0, false], true);
            case 'date':
            case 'datetime':
                if ($raw === null || $raw === '') {
                    return null;
                }
                try {
                    $d = new \DateTimeImmutable((string) $raw);
                } catch (\Exception) {
                    return null;
                }
                return $d->format($dataType === 'date' ? 'Y-m-d' : 'Y-m-d\TH:i:s');
            case 'enum':
                $raw = is_string($raw) ? trim($raw) : $raw;
                return ($raw === '' || $raw === null) ? null : $raw;
            case 'file':
                // Bagian 3: file di-upload ke disk NON-PUBLIC, yang disimpan
                // di sini hanya path/URL-nya.
                return ($raw === '' || $raw === null) ? null : $raw;
            case 'string':
            default:
                $raw = is_string($raw) ? trim($raw) : $raw;
                return ($raw === '' || $raw === null) ? null : $raw;
        }
    }
}
