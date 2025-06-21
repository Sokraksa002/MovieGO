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
        Schema::table('media', function (Blueprint $table) {
            $table->integer('tmdb_id')->nullable()->unique()->after('id');
            $table->string('imdb_id')->nullable()->after('tmdb_id');
            $table->decimal('vote_average', 3, 1)->nullable()->after('rating');
            $table->integer('vote_count')->nullable()->after('vote_average');
            $table->string('original_language')->nullable()->after('vote_count');
            $table->json('production_companies')->nullable()->after('original_language');
            $table->json('production_countries')->nullable()->after('production_companies');
            $table->boolean('adult')->default(false)->after('production_countries');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn([
                'tmdb_id',
                'imdb_id', 
                'vote_average',
                'vote_count',
                'original_language',
                'production_companies',
                'production_countries',
                'adult'
            ]);
        });
    }
};
