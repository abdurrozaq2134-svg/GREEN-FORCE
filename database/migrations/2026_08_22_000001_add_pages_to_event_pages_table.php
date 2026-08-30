<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('event_pages', function (Blueprint $table) {
            // Multi-halaman: koleksi halaman milik satu event.
            // Struktur tiap item: { id, name, elements[] }
            // Kolom `elements` lama tetap ada sebagai kompatibilitas
            // (menyimpan elemen halaman pertama).
            $table->json('pages')->nullable()->after('elements');
        });
    }

    public function down(): void
    {
        Schema::table('event_pages', function (Blueprint $table) {
            $table->dropColumn('pages');
        });
    }
};
