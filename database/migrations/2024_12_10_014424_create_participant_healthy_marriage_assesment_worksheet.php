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
        Schema::create('participant_healthy_marriage_assessment_worksheet', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained();
            $table->string('vendor_name')->default('Good Dads');
            $table->string('participant_name');
            $table->date('date_of_birth');
            $table->string('social_security_number');
            $table->boolean('missouri_resident');
            $table->boolean('child_under_18');
            $table->boolean('financially_eligible');
            $table->boolean('drivers_license_provided');
            $table->boolean('utility_bill_provided');
            $table->boolean('pay_stub_provided');
            $table->boolean('written_employer_statement_provided');
            $table->boolean('social_security_benefits_provided');
            $table->boolean('self_attestation_provided');
            $table->boolean('unemployment_compensation_provided');
            $table->string('other_document_provided')->nullable();
            $table->decimal('gross_monthly_household_income', 10, 2);
            $table->integer('number_of_family_members');
            $table->decimal('percentage_of_fpl', 5, 2);
            $table->boolean('approved_for_services');
            $table->date('state_agency_review_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_healthy_marriage_assessment_worksheet');
    }
};
