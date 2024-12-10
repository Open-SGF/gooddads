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
        Schema::create('participant_state_form_authorization_for_confidential_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained();
            $table->string('consumer_name');
            $table->boolean('dss_authorized');
            $table->boolean('fys_authorized');
            $table->boolean('mhd_authorized');
            $table->boolean('dfas_authorized');
            $table->boolean('mmac_authorized');
            $table->boolean('fsd_authorized');
            $table->boolean('cd_authorized');
            $table->boolean('dls_authorized');
            $table->string('other_authorized_entity')->nullable();
            $table->string('disclosure_entity_name');
            $table->string('disclosure_entity_phone');
            $table->date('disclosure_entity_dob');
            $table->string('disclosure_entity_ssn')->nullable();
            $table->string('disclosure_entity_address');
            $table->string('disclosure_entity_email')->nullable();
            $table->boolean('attorney_recipient');
            $table->boolean('employer_recipient');
            $table->boolean('legislator_recipient');
            $table->boolean('governors_staff_recipient');
            $table->string('other_recipient_details')->nullable();
            $table->boolean('eligibility_determination');
            $table->boolean('legal_consultation');
            $table->boolean('legal_proceedings');
            $table->boolean('employment_purpose');
            $table->boolean('complaint_investigation');
            $table->boolean('treatment_planning');
            $table->boolean('continuity_of_services');
            $table->boolean('background_investigation');
            $table->boolean('at_consumers_request');
            $table->boolean('entire_file_disclosure');
            $table->boolean('licensure_information_disclosure');
            $table->boolean('medical_psychiatric_records_disclosure');
            $table->boolean('hotline_investigations_disclosure');
            $table->boolean('home_studies_disclosure');
            $table->boolean('eligibility_determinations_disclosure');
            $table->boolean('substance_abuse_treatment_disclosure');
            $table->boolean('client_employment_records_disclosure');
            $table->boolean('benefits_received_disclosure');
            $table->string('other_information_disclosure_details')->nullable();
            $table->boolean('accept_text_messages')->nullable();
            $table->string('signature_of_consumer');
            $table->date('date_of_signature');
            $table->string('witness_signature')->nullable();
            $table->date('witness_signature_date')->nullable();
            $table->string('parent_guardian_representative_signature')->nullable();
            $table->date('parent_guardian_representative_signature_date')->nullable();
            $table->boolean('email_survey_delivery');
            $table->boolean('address_survey_delivery');
            $table->boolean('online_survey_delivery');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participant_state_form_authorization_for_confidential_information');
    }
};
