<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ContentSecurityPolicy
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Allow iframe embedding from Vidsrc
        $csp = "frame-src 'self' https://vidsrc.xyz https://*.vidsrc.xyz; ";
        $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval'; ";
        $csp .= "style-src 'self' 'unsafe-inline'; ";
        $csp .= "img-src 'self' data: https:; ";
        $csp .= "connect-src 'self' https://api.themoviedb.org https://vidsrc.xyz;";

        $response->headers->set('Content-Security-Policy', $csp);
        
        return $response;
    }
}
