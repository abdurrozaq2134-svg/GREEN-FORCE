<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('google_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('google_id')->unique();
            $table->string('avatar')->nullable();
            $table->timestamps();
        });

        // Pindahkan data akun Google yang sudah ada dari kolom users.google_id /
        // users.avatar ke tabel barunya, lalu kosongkan kolom lama di users --
        // data akun biasa (nama/email/password) tetap di users, data spesifik
        // Google punya rumahnya sendiri.
        DB::table('users')
            ->whereNotNull('google_id')
            ->select('id', 'google_id', 'avatar')
            ->orderBy('id')
            ->each(function ($user) {
                DB::table('google_accounts')->insert([
                    'user_id' => $user->id,
                    'google_id' => $user->google_id,
                    'avatar' => $user->avatar,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'avatar']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('google_id')->nullable()->after('email');
            $table->string('avatar')->nullable()->after('google_id');
        });

        DB::table('google_accounts')->orderBy('id')->each(function ($account) {
            DB::table('users')->where('id', $account->user_id)->update([
                'google_id' => $account->google_id,
                'avatar' => $account->avatar,
            ]);
        });

        Schema::dropIfExists('google_accounts');
    }
};
