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
        Schema::create('favorites', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('media_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('episode_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();

            // Composite unique to prevent duplicate favorites for the same user/content
            $table->unique(['user_id', 'media_id', 'episode_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};