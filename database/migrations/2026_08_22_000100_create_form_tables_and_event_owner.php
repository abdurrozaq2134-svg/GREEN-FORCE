<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Pemilik event (EO) & toggle wajib login per event.
        // Catatan: tabel event di project ini bernama `event_pages`.
        Schema::table('event_pages', function (Blueprint $table) {
            $table->foreignId('owner_id')
                ->nullable()
                ->after('user_id')
                ->constrained('users')
                ->nullOnDelete();
            $table->boolean('requires_login')->default(false)->after('is_published');
        });

        // Skema field formulir pendaftaran per event (dikelola dari builder).
        // Tipe data EKSPLISIT (bukan tipe input UI) supaya nilai di JSON
        // submissions bisa di-cast & di-query dengan benar:
        //   string   -> text input / textarea (lihat is_long_text)
        //   integer  -> number tanpa desimal (KODE POS TETAP string agar
        //               nol di depan tidak hilang!)
        //   float    -> number dengan desimal
        //   boolean  -> checkbox
        //   date     -> date picker
        //   datetime -> date+time picker
        //   enum     -> dropdown/radio, opsi dari kolom `options`
        //   file     -> upload, disimpan sebagai path/URL di disk non-public
        // `format` menambah validasi khusus untuk string (mis. "email",
        // "phone") tanpa perlu data_type baru.
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_page_id')->constrained('event_pages')->cascadeOnDelete();
            $table->string('label');
            $table->string('field_key'); // slug dari label
            $table->enum('data_type', [
                'string', 'integer', 'float', 'boolean',
                'date', 'datetime', 'enum', 'file',
            ])->default('string');
            $table->boolean('is_long_text')->default(false);
            $table->string('format')->nullable(); // mis. "email", "phone"
            $table->json('options')->nullable(); // untuk enum
            $table->boolean('is_required')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['event_page_id', 'sort_order']);
        });

        // Jawaban peserta. user_id NULL = form terbuka tanpa akun.
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_page_id')->constrained('event_pages')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->json('data'); // key-value sesuai field_key
            $table->enum('status', ['pending', 'diterima', 'ditolak'])->default('pending');
            $table->timestamps();

            $table->index(['event_page_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
        Schema::dropIfExists('form_fields');
        Schema::table('event_pages', function (Blueprint $table) {
            $table->dropConstrainedForeignId('owner_id');
            $table->dropColumn('requires_login');
        });
    }
};
