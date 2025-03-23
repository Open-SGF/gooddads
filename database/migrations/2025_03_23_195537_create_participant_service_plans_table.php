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
        Schema::create('participant_service_plans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('participant_id')->constrained();

            $table->string('participant_name');
            $table->string('client_number');
            $table->date('review_date')->nullable();
            $table->boolean('parenting_skill_development_is_service_area');
            $table->boolean('effective_co_parenting_is_service_area');
            $table->boolean('employment_and_education_is_service_area');
            $table->boolean('child_support_is_service_area');
            $table->boolean('domestic_violence_is_service_area');
            $table->string('service_identified_by_participant')->nullable();

            $table->text('goal');
            $table->text('custody_visitation_strategy');
            $table->string('custody_visitation_person_responsible');
            $table->string('custody_visitation_timeline');
            $table->text('custody_visitation_measure_of_success');
            $table->text('education_employment_strategy');
            $table->string('education_employment_person_responsible');
            $table->string('education_employment_timeline');
            $table->text('education_employment_measure_of_success');
            $table->text('housing_transportation_strategy');
            $table->string('housing_transportation_person_responsible');
            $table->string('housing_transportation_timeline');
            $table->text('housing_transportation_measure_of_success');

            // Potentially need "Child Support Action Goal" fields, confirming with client
            $table->string('participant_signature');
            $table->date('participant_signature_date')->nullable();
            $table->string('case_manager_signature');
            $table->date('case_manager_signature_date')->nullable();

            // Marked completed on
            $table->date('date_completed')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_service_plans');
    }
};
