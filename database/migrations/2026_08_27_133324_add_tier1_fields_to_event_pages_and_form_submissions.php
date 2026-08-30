<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // event_pages: quota, redirect_page_id, mode (admin/participant view)
        Schema::table('event_pages', function (Blueprint $table) {
            $table->unsignedInteger('quota')->nullable()->after('requires_login');
            $table->foreignId('redirect_page_id')->nullable()->after('quota')->constrained('event_pages')->nullOnDelete();
            $table->enum('mode', ['participant', 'admin'])->default('participant')->after('redirect_page_id');
        });

        // form_submissions: add 'menunggu_konfirmasi' to status enum
        $this->setSubmissionStatusValues(['pending', 'menunggu_konfirmasi', 'diterima', 'ditolak']);
    }

    public function down(): void
    {
        Schema::table('event_pages', function (Blueprint $table) {
            $table->dropConstrainedForeignId('redirect_page_id');
            $table->dropColumn(['quota', 'redirect_page_id', 'mode']);
        });

        // Revert form_submissions status enum
        $this->setSubmissionStatusValues(['pending', 'diterima', 'ditolak']);
    }

    /**
     * PostgreSQL backs an enum column with a named CHECK constraint that has to be
     * dropped and rebuilt by hand. Other drivers (sqlite under test) only need the
     * column widened to a plain string, which drops their inline check on rebuild.
     *
     * @param  list<string>  $allowed
     */
    private function setSubmissionStatusValues(array $allowed): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            Schema::table('form_submissions', function (Blueprint $table) {
                $table->string('status')->default('pending')->change();
            });

            return;
        }

        $values = "'".implode("', '", $allowed)."'";

        DB::statement('ALTER TABLE form_submissions DROP CONSTRAINT IF EXISTS form_submissions_status_check');
        DB::statement('ALTER TABLE form_submissions ALTER COLUMN status TYPE varchar(255) USING status::varchar(255)');
        DB::statement('ALTER TABLE form_submissions ALTER COLUMN status DROP DEFAULT');
        DB::statement("ALTER TABLE form_submissions ALTER COLUMN status SET DEFAULT 'pending'");
        DB::statement("ALTER TABLE form_submissions ADD CONSTRAINT form_submissions_status_check CHECK (status IN ({$values}))");
    }
};
