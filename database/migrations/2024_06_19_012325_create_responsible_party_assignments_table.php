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
        Schema::create('responsible_party_assignments', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('responsible_party_id')->constrained('responsible_parties');
            $table->foreignUuid('dad_id')->constrained('dads');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responsible_party_assignments');
    }
};
