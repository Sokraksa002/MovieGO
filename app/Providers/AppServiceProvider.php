<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Share auth data with all Inertia views
        \Inertia\Inertia::share([
            'auth' => function () {
                return [
                    'user' => \Illuminate\Support\Facades\Auth::user(),
                ];
            },
        ]);
    }
}
