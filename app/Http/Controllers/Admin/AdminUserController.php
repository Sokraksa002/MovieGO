<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    // Get all users
    public function index()
    {
        return User::select('id', 'name', 'email', 'is_admin', 'created_at')->get();
    }

    // Promote user to admin
    public function promote(User $user)
    {
        $user->update(['is_admin' => true]);
        return response()->json($user);
    }

    // Demote admin to regular user
    public function demote(User $user)
    {
        if (auth()->id() === $user->id) {
            return response()->json(['error' => 'You cannot demote yourself.'], 403);
        }
        $user->update(['is_admin' => false]);
        return response()->json($user);
    }

    // Delete user
    public function destroy(User $user)
    {
        if (auth()->id() === $user->id) {
            return response()->json(['error' => 'You cannot delete yourself.'], 403);
        }
        $user->delete();
        return response()->json(null, 204);
    }
}