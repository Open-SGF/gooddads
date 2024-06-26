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
        Schema::create('children', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('dad_id')->constrained('dads');
            $table->text('name');
            $table->date('date_of_birth');
            $table->text('contact');
            $table->float('child_support');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('children');
    }
};
