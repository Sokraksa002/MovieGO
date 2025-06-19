<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // We've decided to use is_admin boolean column instead of role enum
        // No action needed here
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No action needed here
    }
};
