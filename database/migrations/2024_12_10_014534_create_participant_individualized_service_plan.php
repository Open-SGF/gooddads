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
        Schema::create('participant_individualized_service_plan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained();
            $table->string('participant_name');
            $table->string('client_number');
            $table->date('review_date');
            $table->boolean('parenting_skill_development')->default(false);
            $table->boolean('effective_co_parenting')->default(false);
            $table->boolean('employment_and_education')->default(false);
            $table->boolean('child_support')->default(false);
            $table->boolean('domestic_violence')->default(false);
            $table->string('service_identified_by_participant')->nullable();
            $table->text('goal');
            $table->text('parenting_skills_objective');
            $table->text('parenting_skills_strategy');
            $table->string('parenting_skills_person_responsible');
            $table->string('parenting_skills_timeline');
            $table->text('parenting_skills_measure_of_success');
            $table->text('stress_anger_management_objective');
            $table->text('stress_anger_management_strategy');
            $table->string('stress_anger_management_person_responsible');
            $table->string('stress_anger_management_timeline');
            $table->text('stress_anger_management_measure_of_success');
            $table->text('custody_visitation_objective');
            $table->text('custody_visitation_strategy');
            $table->string('custody_visitation_person_responsible');
            $table->string('custody_visitation_timeline');
            $table->text('custody_visitation_measure_of_success');
            $table->text('education_employment_objective');
            $table->text('education_employment_strategy');
            $table->string('education_employment_person_responsible');
            $table->string('education_employment_timeline');
            $table->text('education_employment_measure_of_success');
            $table->text('housing_transportation_objective');
            $table->text('housing_transportation_strategy');
            $table->string('housing_transportation_person_responsible');
            $table->string('housing_transportation_timeline');
            $table->text('housing_transportation_measure_of_success');
            $table->text('child_support_awareness_objective');
            $table->text('child_support_awareness_strategy');
            $table->string('child_support_awareness_person_responsible');
            $table->string('child_support_awareness_timeline');
            $table->text('child_support_awareness_measure_of_success');
            $table->text('effective_co_parenting_objective');
            $table->text('effective_co_parenting_strategy');
            $table->string('effective_co_parenting_person_responsible');
            $table->string('effective_co_parenting_timeline');
            $table->text('effective_co_parenting_measure_of_success');
            $table->text('father_to_father_mentoring_objective');
            $table->text('father_to_father_mentoring_strategy');
            $table->string('father_to_father_mentoring_person_responsible');
            $table->string('father_to_father_mentoring_timeline');
            $table->text('father_to_father_mentoring_measure_of_success');
            $table->string('participant_signature');
            $table->date('participant_signature_date');
            $table->string('case_manager_signature');
            $table->date('case_manager_signature_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_individualized_service_plan');
    }
};
