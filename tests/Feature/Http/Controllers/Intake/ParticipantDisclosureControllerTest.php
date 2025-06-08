<?php

namespace Tests\Feature\Http\Controllers\Intake;

use App\Models\Participant;
use App\Models\ParticipantDisclosureAuthorization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ParticipantDisclosureControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test storing a new disclosure agreement.
     *
     * @return void
     */
    public function test_store_disclosure_agreement()
    {
        // Create a user with a participant
        $user = User::factory()->create();
        $participant = Participant::factory()->create(['user_id' => $user->id]);
        
        // Login as the user
        $this->actingAs($user);
        
        // Prepare disclosure agreement data
        $data = $this->getDisclosureAgreementData();
        
        // Send POST request to store endpoint
        $response = $this->post(route('intake.disclosure.store'), $data);
        
        // Assert redirect to dashboard with success message
        $response->assertRedirect(route('intake.dashboard'));
        $response->assertSessionHas('success', 'Disclosure agreement saved successfully.');
        
        // Assert the disclosure agreement was created in the database
        $this->assertDatabaseHas('participant_consumer_authorization_for_disclosure_confidential_information', [
            'participant_id' => $participant->id,
            'consumer_name' => $data['consumer_name'],
            'subject_name' => $data['subject_name'],
        ]);
    }

    /**
     * Test updating an existing disclosure agreement.
     *
     * @return void
     */
    public function test_update_disclosure_agreement()
    {
        // Create a user with a participant
        $user = User::factory()->create();
        $participant = Participant::factory()->create(['user_id' => $user->id]);
        
        // Create an existing disclosure authorization
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create([
            'participant_id' => $participant->id,
            'consumer_name' => 'Original Name',
        ]);
        
        // Login as the user
        $this->actingAs($user);
        
        // Prepare updated disclosure agreement data
        $data = $this->getDisclosureAgreementData([
            'consumer_name' => 'Updated Consumer Name',
        ]);
        
        // Send PUT request to update endpoint
        $response = $this->put(route('intake.disclosure.update'), $data);
        
        // Assert redirect to dashboard with success message
        $response->assertRedirect(route('intake.dashboard'));
        $response->assertSessionHas('success', 'Disclosure agreement updated successfully.');
        
        // Assert the disclosure agreement was updated in the database
        $this->assertDatabaseHas('participant_consumer_authorization_for_disclosure_confidential_information', [
            'participant_id' => $participant->id,
            'consumer_name' => 'Updated Consumer Name',
        ]);
    }

    /**
     * Test that a user cannot access another user's disclosure agreement.
     *
     * @return void
     */
    public function test_cannot_access_other_users_disclosure_agreement()
    {
        // Create two users with participants
        $user1 = User::factory()->create();
        $participant1 = Participant::factory()->create(['user_id' => $user1->id]);
        
        $user2 = User::factory()->create();
        $participant2 = Participant::factory()->create(['user_id' => $user2->id]);
        
        // Create a disclosure authorization for user2
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create([
            'participant_id' => $participant2->id,
        ]);
        
        // Login as user1
        $this->actingAs($user1);
        
        // Prepare disclosure data with user2's participant ID
        $data = $this->getDisclosureAgreementData([
            'participant_id' => $participant2->id,
        ]);
        
        // Send POST request to store endpoint
        $response = $this->post(route('intake.disclosure.store'), $data);
        
        // The controller should only use the authenticated user's participant
        // So the disclosure should be created for user1's participant, not user2's
        $this->assertDatabaseHas('participant_consumer_authorization_for_disclosure_confidential_information', [
            'participant_id' => $participant1->id,
            'consumer_name' => $data['consumer_name'],
        ]);
    }

    /**
     * Helper method to generate disclosure agreement test data.
     *
     * @param array $overrides
     * @return array
     */
    private function getDisclosureAgreementData(array $overrides = [])
    {
        $data = [
            'consumer_name' => $this->faker->name,
            
            // Authorized entities
            'is_dss_authorized' => true,
            'is_dys_authorized' => false,
            'is_mhd_authorized' => true,
            'is_dfas_authorized' => false,
            'is_mmac_authorized' => true,
            'is_fsd_authorized' => false,
            'is_cd_authorized' => true,
            'is_dls_authorized' => false,
            'other_authorized_entity' => $this->faker->company,
            
            // Subject information
            'subject_name' => $this->faker->name,
            'subject_phone' => $this->faker->phoneNumber,
            'subject_dob' => $this->faker->date,
            'subject_ssn' => '123-45-6789',
            'subject_address' => $this->faker->address,
            'subject_email' => $this->faker->email,
            
            // Recipients
            'disclose_to_attorney' => true,
            'attorney_name' => $this->faker->name,
            'disclose_to_employer' => false,
            'employer_name' => null,
            'disclose_to_legislator' => true,
            'legislator_name' => $this->faker->name,
            'disclose_to_governors_staff' => false,
            'other_recipient_details' => $this->faker->sentence,
            
            // Purpose of disclosure
            'purpose_eligibility_determination' => true,
            'purpose_legal_consultation' => false,
            'purpose_legal_proceedings' => true,
            'purpose_employment' => false,
            'purpose_complaint_investigation' => true,
            'purpose_treatment_planning' => false,
            'purpose_continuity_of_services' => true,
            'purpose_background_investigation' => false,
            'purpose_consumer_request' => true,
            'purpose_share_and_refer' => false,
            'purpose_other' => true,
            'other_purpose_details' => $this->faker->sentence,
            
            // Information to be disclosed
            'disclose_entire_file' => true,
            'disclose_licensure_information' => false,
            'disclose_medical_psychiatric_records' => true,
            'disclose_hotline_investigations' => false,
            'disclose_home_studies' => true,
            'disclose_eligibility_determinations' => false,
            'disclose_substance_abuse_treatment' => true,
            'disclose_client_employment_records' => false,
            'disclose_benefits_received' => true,
            'disclose_other_information' => false,
            'other_disclosure_details' => null,
            
            // Communication preferences
            'accept_text_messages' => true,
            
            // Signatures
            'consumer_signature' => $this->faker->name,
            'signature_date' => $this->faker->date,
            'witness_signature' => $this->faker->name,
            'witness_signature_date' => $this->faker->date,
            'guardian_signature' => null,
            'guardian_signature_date' => null,
            
            // Survey delivery methods
            'survey_by_email' => true,
            'survey_by_mail' => false,
            'survey_by_online' => true,
        ];
        
        return array_merge($data, $overrides);
    }
} 