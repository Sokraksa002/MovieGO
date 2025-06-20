<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('favorites', function (Blueprint $table) {
            // Drop the existing unique constraint first
            $table->dropUnique(['user_id', 'media_id', 'episode_id']);
            
            // Add id column as primary key
            $table->id()->first();
            
            // Re-add the unique constraint but allow for different IDs
            $table->unique(['user_id', 'media_id', 'episode_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('favorites', function (Blueprint $table) {
            // Drop the unique constraint
            $table->dropUnique(['user_id', 'media_id', 'episode_id']);
            
            // Drop the id column
            $table->dropColumn('id');
            
            // Re-add the unique constraint as it was before
            $table->unique(['user_id', 'media_id', 'episode_id']);
        });
    }
};
