<?php

namespace App\Http\Requests\Intake;

use Illuminate\Foundation\Http\FormRequest;

class UpdateParticipantDisclosureAuthorizationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'consumer_name' => 'required|string|max:255',

            // Authorized entities
            'is_dss_authorized' => 'required|boolean',
            'is_dys_authorized' => 'required|boolean',
            'is_mhd_authorized' => 'required|boolean',
            'is_dfas_authorized' => 'required|boolean',
            'is_mmac_authorized' => 'required|boolean',
            'is_fsd_authorized' => 'required|boolean',
            'is_cd_authorized' => 'required|boolean',
            'is_dls_authorized' => 'required|boolean',
            'is_other_authorized' => 'required|boolean',
            'other_authorized_entity' => 'required_if:is_other_authorized,1',

            // Subject information
            'subject_name' => 'required|string|max:255',
            'subject_phone' => 'required|string|max:20',
            'subject_dob' => 'required|date',
            'subject_ssn' => 'nullable|string|max:11',
            'subject_address' => 'required|string|max:255',
            'subject_email' => 'nullable|email|max:255',

            // Recipients
            'disclose_to_attorney' => 'required|boolean',
            'attorney_name' => 'nullable|required_if:disclose_to_attorney,1|string|max:255',
            'disclose_to_employer' => 'required|boolean',
            'employer_name' => 'nullable|required_if:disclose_to_employer,1|string|max:255',
            'disclose_to_legislator' => 'required|boolean',
            'legislator_name' => 'nullable|required_if:disclose_to_legislator,1|string|max:255',
            'disclose_to_governors_staff' => 'required|boolean',
            'other_recipient_details' => 'nullable|string|max:255',

            // Purpose of disclosure
            'purpose_eligibility_determination' => 'required|boolean',
            'purpose_legal_consultation' => 'required|boolean',
            'purpose_legal_proceedings' => 'required|boolean',
            'purpose_employment' => 'required|boolean',
            'purpose_complaint_investigation' => 'required|boolean',
            'purpose_treatment_planning' => 'required|boolean',
            'purpose_continuity_of_services' => 'required|boolean',
            'purpose_background_investigation' => 'required|boolean',
            'purpose_consumer_request' => 'required|boolean',
            'purpose_share_and_refer' => 'required|boolean',
            'purpose_other' => 'required|boolean',
            'other_purpose_details' => 'nullable|required_if:purpose_other,1|string|max:255',

            // Information to be disclosed
            'disclose_entire_file' => 'required|boolean',
            'disclose_licensure_information' => 'required|boolean',
            'disclose_medical_psychiatric_records' => 'required|boolean',
            'disclose_hotline_investigations' => 'required|boolean',
            'disclose_home_studies' => 'required|boolean',
            'disclose_eligibility_determinations' => 'required|boolean',
            'disclose_substance_abuse_treatment' => 'required|boolean',
            'disclose_client_employment_records' => 'required|boolean',
            'disclose_benefits_received' => 'required|boolean',
            'disclose_other_information' => 'required|boolean',
            'other_disclosure_details' => 'nullable|required_if:disclose_other_information,1|string|max:255',

            // Communication preferences
            'accept_text_messages' => 'nullable|boolean',

            // Signatures
            'consumer_signature' => 'required|string|max:255',
            'signature_date' => 'required|date',
            'witness_signature' => 'nullable|string|max:255',
            'witness_signature_date' => 'nullable|required_with:witness_signature|date',
            'guardian_signature' => 'nullable|string|max:255',
            'guardian_signature_date' => 'nullable|required_with:guardian_signature|date',

            // Survey delivery methods
            'survey_by_email' => 'required|boolean',
            'survey_by_mail' => 'required|boolean',
            'survey_by_online' => 'required|boolean',

        ];
    }
}
