<?php

namespace Database\Factories;

use App\Models\Participant;
use App\Models\ParticipantDisclosureAuthorization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParticipantDisclosureAuthorization>
 */
class ParticipantDisclosureAuthorizationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ParticipantDisclosureAuthorization::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $isOtherAuthorized = $this->faker->boolean();

        return [
            'participant_id' => Participant::factory(),
            'consumer_name' => $this->faker->name(),
            'is_dss_authorized' => $this->faker->boolean(),
            'is_dys_authorized' => $this->faker->boolean(),
            'is_mhd_authorized' => $this->faker->boolean(),
            'is_dfas_authorized' => $this->faker->boolean(),
            'is_mmac_authorized' => $this->faker->boolean(),
            'is_fsd_authorized' => $this->faker->boolean(),
            'is_cd_authorized' => $this->faker->boolean(),
            'is_dls_authorized' => $this->faker->boolean(),
            'is_other_authorized' => $isOtherAuthorized,
            'other_authorized_entity' => $isOtherAuthorized ? $this->faker->company() : null,
            'subject_name' => $this->faker->name(),
            'subject_phone' => $this->faker->phoneNumber(),
            'subject_dob' => $this->faker->date(),
            'subject_ssn' => '123-45-6789',
            'subject_address' => $this->faker->address(),
            'subject_email' => $this->faker->email(),
            'disclose_to_attorney' => $this->faker->boolean(),
            'attorney_name' => $this->faker->name(),
            'disclose_to_employer' => $this->faker->boolean(),
            'employer_name' => $this->faker->company(),
            'disclose_to_legislator' => $this->faker->boolean(),
            'legislator_name' => $this->faker->name(),
            'disclose_to_governors_staff' => $this->faker->boolean(),
            'other_recipient_details' => $this->faker->sentence(),
            'purpose_eligibility_determination' => $this->faker->boolean(),
            'purpose_legal_consultation' => $this->faker->boolean(),
            'purpose_legal_proceedings' => $this->faker->boolean(),
            'purpose_employment' => $this->faker->boolean(),
            'purpose_complaint_investigation' => $this->faker->boolean(),
            'purpose_treatment_planning' => $this->faker->boolean(),
            'purpose_continuity_of_services' => $this->faker->boolean(),
            'purpose_background_investigation' => $this->faker->boolean(),
            'purpose_consumer_request' => $this->faker->boolean(),
            'purpose_share_and_refer' => $this->faker->boolean(),
            'purpose_other' => $this->faker->boolean(),
            'other_purpose_details' => $this->faker->sentence(),
            'disclose_entire_file' => $this->faker->boolean(),
            'disclose_licensure_information' => $this->faker->boolean(),
            'disclose_medical_psychiatric_records' => $this->faker->boolean(),
            'disclose_hotline_investigations' => $this->faker->boolean(),
            'disclose_home_studies' => $this->faker->boolean(),
            'disclose_eligibility_determinations' => $this->faker->boolean(),
            'disclose_substance_abuse_treatment' => $this->faker->boolean(),
            'disclose_client_employment_records' => $this->faker->boolean(),
            'disclose_benefits_received' => $this->faker->boolean(),
            'disclose_other_information' => $this->faker->boolean(),
            'other_disclosure_details' => $this->faker->sentence(),
            'accept_text_messages' => $this->faker->boolean(),
            'consumer_signature' => $this->faker->name(),
            'signature_date' => $this->faker->date(),
            'witness_signature' => $this->faker->name(),
            'witness_signature_date' => $this->faker->date(),
            'guardian_signature' => $this->faker->optional()->name(),
            'guardian_signature_date' => $this->faker->optional()->date(),
            'survey_by_email' => $this->faker->boolean(),
            'survey_by_mail' => $this->faker->boolean(),
            'survey_by_online' => $this->faker->boolean(),
            'date_completed' => $this->faker->date(),
        ];
    }
} 