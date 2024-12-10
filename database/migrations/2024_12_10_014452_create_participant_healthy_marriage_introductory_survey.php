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
        Schema::create('participant_healthy_marriage_introductory_survey', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained();
            $table->date('date_of_birth')->nullable();
            $table->string('fatherhood_program');
            $table->boolean('become_responsible_father')->default(false);
            $table->boolean('referred')->default(false);
            $table->boolean('court_ordered')->default(false);
            $table->boolean('address_child_support_concerns')->default(false);
            $table->string('other_reason_for_attendance')->nullable();
            $table->boolean('word_of_mouth')->default(false);
            $table->boolean('from_past_participant')->default(false);
            $table->boolean('family_support_division')->default(false);
            $table->boolean('prosecuting_attorney_source')->default(false);
            $table->boolean('marketing_source')->default(false);
            $table->boolean('organization_itself_source')->default(false);
            $table->string('other_source_of_information')->nullable();
            $table->boolean('employment_opportunities')->default(false);
            $table->boolean('assistance_with_alcohol_abuse')->default(false);
            $table->boolean('increased_emphasis_on_parenting_skills')->default(false);
            $table->boolean('access_to_mentors_resources_outside_program')->default(false);
            $table->boolean('resume_building_skills')->default(false);
            $table->boolean('free_legal_services')->default(false);
            $table->boolean('assistance_with_criminal_history')->default(false);
            $table->boolean('assistance_with_credit_repair')->default(false);
            $table->boolean('assistance_with_overcoming_homelessness')->default(false);
            $table->boolean('assistance_with_visitation_custody')->default(false);
            $table->boolean('increased_understanding_of_child_support_issues')->default(false);
            $table->boolean('maintaining_hope_for_the_future')->default(false);
            $table->boolean('help_obtaining_information_about_health_wellness')->default(false);
            $table->string('other_expectations_from_program')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_healthy_marriage_introductory_survey');
    }
};
