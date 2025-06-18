<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchHistory extends Model
{
    use HasFactory;
    
    protected $table = 'watch_history'; 

    protected $fillable = [
        'user_id',
        'media_id',
        'episode_id',
        'progress',
        'duration',
        'watched_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function episode()
    {
        return $this->belongsTo(Episode::class);
    }
}