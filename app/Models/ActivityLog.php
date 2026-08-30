<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = ['user_id', 'action', 'description', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /** Catat aktivitas user (helper singkat). */
    public static function record(string $action, string $description, string $status = 'SUKSES', ?int $userId = null): void
    {
        self::create([
            'user_id' => $userId ?? auth()->id(),
            'action' => $action,
            'description' => $description,
            'status' => $status,
        ]);
    }
}
