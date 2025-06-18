<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'color'];

    public function media()
    {
        return $this->belongsToMany(Media::class, 'media_genre');
    }
}