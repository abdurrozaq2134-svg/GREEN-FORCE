<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_MENUNGGU_KONFIRMASI = 'menunggu_konfirmasi';
    public const STATUS_DITERIMA = 'diterima';
    public const STATUS_DITOLAK = 'ditolak';

    protected $fillable = [
        'event_page_id',
        'user_id',
        'data',
        'status',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public function eventPage()
    {
        return $this->belongsTo(EventPage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isMenungguKonfirmasi(): bool
    {
        return $this->status === self::STATUS_MENUNGGU_KONFIRMASI;
    }

    public function isDiterima(): bool
    {
        return $this->status === self::STATUS_DITERIMA;
    }

    public function markMenungguKonfirmasi(): void
    {
        $this->update(['status' => self::STATUS_MENUNGGU_KONFIRMASI]);
    }

    public function markDiterima(): void
    {
        $this->update(['status' => self::STATUS_DITERIMA]);
    }
}
