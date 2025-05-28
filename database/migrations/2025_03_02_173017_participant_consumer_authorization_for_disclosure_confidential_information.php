<?php

use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
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
        Schema::create('participant_disclosure_authorization', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('participant_id')->constrained()->cascadeOnDelete();

            // Authorized entities (checkboxes)
            $table->boolean('is_dss_authorized');
            $table->boolean('is_dys_authorized'); // Fixed typo from fys to dys based on form
            $table->boolean('is_mhd_authorized');
            $table->boolean('is_dfas_authorized');
            $table->boolean('is_mmac_authorized');
            $table->boolean('is_fsd_authorized');
            $table->boolean('is_cd_authorized');
            $table->boolean('is_dls_authorized');
            $table->boolean('is_other_authorized');
            $table->string('other_authorized_entity')->nullable();

            // Recipients (who info will be disclosed to)
            $table->boolean('disclose_to_attorney');
            $table->string('attorney_name')->nullable();
            $table->boolean('disclose_to_employer');
            $table->string('employer_name')->nullable();
            $table->boolean('disclose_to_legislator');
            $table->string('legislator_name')->nullable();
            $table->boolean('disclose_to_governors_staff');
            $table->string('other_recipient_details')->nullable();

            // Purpose of disclosure checkboxes
            $table->set('purposes', collect(DisclosurePurposeType::cases())->pluck('value')->toArray())->nullable();
            $table->string('other_purpose_details')->nullable(); // Changed to string for details

            // Information to be disclosed checkboxes
            $table->set('content_types', collect(DisclosureContentType::cases())->pluck('value')->toArray())->nullable();
            $table->string('other_disclosure_details')->nullable();

            // Communication preferences
            $table->boolean('accept_text_messages')->nullable();

            // Signatures
            $table->string('consumer_signature');
            $table->date('signature_date');
            $table->string('witness_signature')->nullable();
            $table->date('witness_signature_date')->nullable();
            $table->string('guardian_signature')->nullable();
            $table->date('guardian_signature_date')->nullable();

            // Survey delivery preferences
            $table->boolean('survey_by_email');
            $table->boolean('survey_by_mail');
            $table->boolean('survey_by_online');

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
        Schema::dropIfExists('participant_disclosure_authorization');
    }
};
