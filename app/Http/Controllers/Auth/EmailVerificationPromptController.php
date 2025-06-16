<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        return $request->user() ? response()->json([
            'user' => $request->user(),
            'email_verified' => $request->user()->hasVerifiedEmail(),
        ]) : response()->json(['message' => 'Unauthenticated'], 401);
    }
}