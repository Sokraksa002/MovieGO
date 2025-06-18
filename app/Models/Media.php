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