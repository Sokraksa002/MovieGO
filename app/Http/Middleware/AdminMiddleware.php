<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if a user is authenticated AND if their role is 'admin'
        // Assumes you have a 'role' column in your 'users' table.
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // If not an admin, return a 403 Forbidden response.
        // This prevents non-admin users from accessing protected admin routes.
        return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
    }
}
