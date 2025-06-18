<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
{
    if (!$request->user() || !$request->user()->is_admin) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    return $next($request);
}
}