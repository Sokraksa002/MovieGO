<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'media_id', 'title', 'external_link', 'episode_number'
    ];

    public function media()
    {
        return $this->belongsTo(Media::class);
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