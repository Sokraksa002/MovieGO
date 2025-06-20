<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->date('first_air_date')->nullable()->after('trailer_url');
            $table->date('last_air_date')->nullable()->after('first_air_date');
            $table->enum('status', ['returning', 'ended', 'canceled', 'in_production'])->nullable()->after('last_air_date');
            $table->integer('seasons_count')->nullable()->after('status');
            $table->integer('episodes_count')->nullable()->after('seasons_count');
        });
        
        // Update existing 'tv_show' records to 'tv' before changing the enum
        DB::statement("UPDATE media SET type = 'tv' WHERE type = 'tv_show'");
        
        // Now change the enum
        DB::statement("ALTER TABLE media MODIFY COLUMN type ENUM('movie', 'tv') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn(['first_air_date', 'last_air_date', 'status', 'seasons_count', 'episodes_count']);
        });
        
        // Revert the enum change
        DB::statement("ALTER TABLE media MODIFY COLUMN type ENUM('movie', 'tv_show') NOT NULL");
        DB::statement("UPDATE media SET type = 'tv_show' WHERE type = 'tv'");
    }
};
