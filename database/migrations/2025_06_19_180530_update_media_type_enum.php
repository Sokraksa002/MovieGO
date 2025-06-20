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
        // First update all 'tv_show' to 'tv'
        DB::statement("UPDATE media SET type = 'tv' WHERE type = 'tv_show'");
        
        // Then update the enum to support both old and new values temporarily
        DB::statement("ALTER TABLE media MODIFY COLUMN type ENUM('movie', 'tv_show', 'tv') NOT NULL");
        
        // Finally, set the enum to only support the new values
        DB::statement("ALTER TABLE media MODIFY COLUMN type ENUM('movie', 'tv') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to the original enum
        DB::statement("ALTER TABLE media MODIFY COLUMN type ENUM('movie', 'tv_show', 'tv') NOT NULL");
        DB::statement("UPDATE media SET type = 'tv_show' WHERE type = 'tv'");
        DB::statement("ALTER TABLE media MODIFY COLUMN type ENUM('movie', 'tv_show') NOT NULL");
    }
};
