<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantDisclosureAuthorization extends Model
{

    use HasFactory, HasUuids;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'participant_disclosure_authorization';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'participant_id',
        'consumer_name',
        'is_dss_authorized',
        'is_dys_authorized',
        'is_mhd_authorized',
        'is_dfas_authorized',
        'is_mmac_authorized',
        'is_fsd_authorized',
        'is_cd_authorized',
        'is_dls_authorized',
        'is_other_authorized',
        'other_authorized_entity',
        'subject_name',
        'subject_phone',
        'subject_dob',
        'subject_ssn',
        'subject_address',
        'subject_email',
        'disclose_to_attorney',
        'attorney_name',
        'disclose_to_employer',
        'employer_name',
        'disclose_to_legislator',
        'legislator_name',
        'disclose_to_governors_staff',
        'other_recipient_details',
        'purpose_eligibility_determination',
        'purpose_legal_consultation',
        'purpose_legal_proceedings',
        'purpose_employment',
        'purpose_complaint_investigation',
        'purpose_treatment_planning',
        'purpose_continuity_of_services',
        'purpose_background_investigation',
        'purpose_consumer_request',
        'purpose_share_and_refer',
        'purpose_other',
        'other_purpose_details',
        'disclose_entire_file',
        'disclose_licensure_information',
        'disclose_medical_psychiatric_records',
        'disclose_hotline_investigations',
        'disclose_home_studies',
        'disclose_eligibility_determinations',
        'disclose_substance_abuse_treatment',
        'disclose_client_employment_records',
        'disclose_benefits_received',
        'disclose_other_information',
        'other_disclosure_details',
        'accept_text_messages',
        'consumer_signature',
        'signature_date',
        'witness_signature',
        'witness_signature_date',
        'guardian_signature',
        'guardian_signature_date',
        'survey_by_email',
        'survey_by_mail',
        'survey_by_online',
        'date_completed',
        'date',
        'signature',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'subject_dob' => 'date',
        'signature_date' => 'date',
        'witness_signature_date' => 'date',
        'guardian_signature_date' => 'date',
        'date_completed' => 'date',
        'is_dss_authorized' => 'boolean',
        'is_dys_authorized' => 'boolean',
        'is_mhd_authorized' => 'boolean',
        'is_dfas_authorized' => 'boolean',
        'is_mmac_authorized' => 'boolean',
        'is_fsd_authorized' => 'boolean',
        'is_cd_authorized' => 'boolean',
        'is_dls_authorized' => 'boolean',
        'disclose_to_attorney' => 'boolean',
        'disclose_to_employer' => 'boolean',
        'disclose_to_legislator' => 'boolean',
        'disclose_to_governors_staff' => 'boolean',
        'purpose_eligibility_determination' => 'boolean',
        'purpose_legal_consultation' => 'boolean',
        'purpose_legal_proceedings' => 'boolean',
        'purpose_employment' => 'boolean',
        'purpose_complaint_investigation' => 'boolean',
        'purpose_treatment_planning' => 'boolean',
        'purpose_continuity_of_services' => 'boolean',
        'purpose_background_investigation' => 'boolean',
        'purpose_consumer_request' => 'boolean',
        'purpose_share_and_refer' => 'boolean',
        'purpose_other' => 'boolean',
        'disclose_entire_file' => 'boolean',
        'disclose_licensure_information' => 'boolean',
        'disclose_medical_psychiatric_records' => 'boolean',
        'disclose_hotline_investigations' => 'boolean',
        'disclose_home_studies' => 'boolean',
        'disclose_eligibility_determinations' => 'boolean',
        'disclose_substance_abuse_treatment' => 'boolean',
        'disclose_client_employment_records' => 'boolean',
        'disclose_benefits_received' => 'boolean',
        'disclose_other_information' => 'boolean',
        'accept_text_messages' => 'boolean',
        'survey_by_email' => 'boolean',
        'survey_by_mail' => 'boolean',
        'survey_by_online' => 'boolean',
    ];

    /**
     * Get the participant that owns the authorization disclosure.
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
