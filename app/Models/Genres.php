<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = ['name'];

    public function media()
    {
        return $this->belongsToMany(Media::class, 'media_genre');
    }
}