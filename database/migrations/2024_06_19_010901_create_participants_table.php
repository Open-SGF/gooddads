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
        Schema::create('participants', static function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users');
            $table->foreignUuid('region_id')->nullable()->constrained('regions');
            $table->string('street', 100)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('state', 50)->nullable();
            $table->string('zip_code', 5)->nullable();
            $table->string('employer', 100)->nullable();
            $table->string('cell_phone_number', 12)->nullable();
            $table->string('home_phone_number', 12)->nullable();
            $table->string('work_phone_number', 12)->nullable();
            $table->string('alt_contact_number', 12)->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed']);
            $table->enum('ethnicity', ['white', 'african_american', 'native_american', 'asian', 'pacific_islander', 'hispanic', 'no_answer']);
            $table->decimal('monthly_child_support', 6, 2)->nullable();


            $table->string('t_shirt_size')->nullable();
            $table->string('probation_parole_case_worker_name')->nullable();
            $table->string('probation_parole_case_worker_phone')->nullable();

            // Contact with children
            $table->boolean('contact_with_children')->nullable();
            $table->boolean('custody')->nullable();
            $table->boolean('visitation')->nullable();
            $table->boolean('phone_contact')->nullable();
            $table->string('participant_photo')->nullable();
            $table->decimal('monthly_child_support_payment', 10, 2)->nullable();

            $table->date('intake_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
