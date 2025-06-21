<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{

    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'year',
        'duration',
        'type',
        'poster_url',
        'backdrop_url',
        'trailer_url',
        'rating',
        'tmdb_id',
        'imdb_id',
        'vote_average',
        'vote_count',
        'original_language',
        'production_companies',
        'production_countries',
        'adult',
        'first_air_date',
        'last_air_date',
        'status',
        'seasons_count',
        'episodes_count',
    ];

    protected $casts = [
        'production_companies' => 'array',
        'production_countries' => 'array',
        'adult' => 'boolean',
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'media_genre');
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function watchHistory()
    {
        return $this->hasMany(WatchHistory::class);
    }
}