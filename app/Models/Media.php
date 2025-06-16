<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'title', 'description', 'external_link', 'type', 'poster_url'
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