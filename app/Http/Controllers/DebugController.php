<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function checkAdmin()
    {
        // Get the admin user
        $admin = User::where('email', 'admin@moviego.com')->first();
        
        // Check if role column exists
        $columns = \Schema::getColumnListing('users');
        
        return response()->json([
            'admin_user' => $admin,
            'columns' => $columns,
            'has_is_admin_column' => in_array('is_admin', $columns),
            'has_role_column' => in_array('role', $columns)
        ]);
    }
}
