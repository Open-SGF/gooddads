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
        Schema::create('participant_fatherhood_surveys', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('participant_id')->constrained()->cascadeOnDelete();

            $table->date('date_of_birth')->nullable();
            $table->string('fatherhood_program')->default('Good Dads');
            $table->boolean('reason_become_responsible_father');
            $table->boolean('reason_referred');
            $table->boolean('reason_court_ordered');
            $table->boolean('reason_address_child_support_concerns');
            $table->boolean('reason_other');
            $table->string('reason_other_description')->nullable();

            $table->boolean('referred_by_word_of_mouth');
            $table->boolean('referred_by_past_participant');
            $table->boolean('referred_by_family_support_division');
            $table->boolean('referred_by_prosecuting_attorney');
            $table->boolean('referred_by_marketing');
            // Verify if this organization is good dads
            $table->boolean('referred_by_organization_itself');
            $table->boolean('referred_by_other');
            $table->string('referred_by_other_source')->nullable();

            $table->boolean('employment_opportunities_expected');
            $table->boolean('assistance_with_alcohol_abuse_expected');
            $table->boolean('increased_emphasis_on_parenting_skills_expected');
            $table->boolean('access_to_mentors_resources_outside_program_expected');
            $table->boolean('resume_building_skills_expected');
            $table->boolean('free_legal_services_expected');
            $table->boolean('assistance_with_criminal_history_expected');
            $table->boolean('assistance_with_credit_repair_expected');
            $table->boolean('assistance_with_overcoming_homelessness_expected');
            $table->boolean('assistance_with_visitation_custody_expected');
            $table->boolean('increased_understanding_of_child_support_issues_expected');
            $table->boolean('maintaining_hope_for_the_future_expected');
            $table->boolean('help_obtaining_information_about_health_wellness_expected');
            $table->boolean('other_expected');
            $table->string('other_expectations_description')->nullable();

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
        Schema::dropIfExists('participant_fatherhood_surveys');
    }
};
