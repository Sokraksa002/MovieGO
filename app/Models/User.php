<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- Add this line
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;


    protected $fillable = [
        'name', 'email', 'password', 'is_admin', 'google_id'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function watchHistory()
    {
        return $this->hasMany(WatchHistory::class);
    }
}