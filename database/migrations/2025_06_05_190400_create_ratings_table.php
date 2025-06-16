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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Polymorphic relation using nullable fields
            $table->foreignId('media_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('episode_id')->nullable()->constrained()->onDelete('set null');

            $table->unsignedTinyInteger('rating'); // 1 to 5
            $table->timestamps();

            // Optional: Ensure user can't rate same media/episode twice
            $table->unique(['user_id', 'media_id', 'episode_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};