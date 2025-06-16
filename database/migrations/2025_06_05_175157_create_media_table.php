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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->year('year')->nullable();
            $table->integer('duration')->nullable()->comment('in minutes');
            $table->enum('type', ['movie', 'tv_show']);
            $table->string('poster_url')->nullable();
            $table->string('backdrop_url')->nullable();
            $table->string('trailer_url')->nullable();
            $table->decimal('rating', 3, 1)->default(0.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
