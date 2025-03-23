<?php

namespace Tests\Feature\Intake;

use App\Models\Participant;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ParticipantDisclosureTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(PermissionsSeeder::class);
    }

    /**
     * Test that the disclosure index is rendered properly
     */
    public function test_disclosure_index_is_rendered(): void
    {
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');
        $participant = Participant::factory()->create(['user_id' => $participantUser->id]);

        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.index'));

        $response->assertStatus(200);


        $disclosureData = $this->getDisclosureData();
        $participant->disclosureAuthorizations()->create($disclosureData);

        $participantUser->refresh();
        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.index'));

        $response->assertInertia(fn(AssertableInertia $page) => $page->count('disclosureAuthorizations', 1));

    }
    public function test_disclosure_create_form_is_rendered(): void
    {
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');
        Participant::factory()->create(['user_id' => $participantUser->id]);

        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.create'));

        $response->assertStatus(200);
    }

    public function test_disclosure_edit_is_rendered(): void
    {
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');
        $participant = Participant::factory()->create(['user_id' => $participantUser->id]);

        $disclosureData = $this->getDisclosureData();
        $disclosure = $participant->disclosureAuthorizations()->create($disclosureData);

        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.update', $disclosure->id));

        $response->assertStatus(200);
    }

    /**
     * Test that a participant can store a new disclosure agreement.
     */
    public function test_participant_can_create_disclosure(): void
    {
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');
        $participant = Participant::factory()->create(['user_id' => $participantUser->id]);

        $disclosureData = $this->getDisclosureData();

        $this->actingAs($participantUser)->post(route('intake.disclosure.store'), $disclosureData);

        $this->assertNotNull($participant->disclosureAuthorizations);
    }

    /**
     * Test that a participant can update an existing disclosure agreement.
     */
    public function test_participant_can_update_disclosure(): void
    {
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');
        $participant = Participant::factory()->create(['user_id' => $participantUser->id]);

        $disclosureData = $this->getDisclosureData();
        $disclosure = $participant->disclosureAuthorizations()->create($disclosureData);

        $updatedData = [
            ...$disclosureData,
            'consumer_name' => 'Jane Doe',
        ];

        // Test the update endpoint
        $updateRoute = route('intake.disclosure.update', ['disclosureAuthorization' => $disclosure->id]);
        $updateResponse = $this->actingAs($participantUser)->put($updateRoute, $updatedData);

        $updateResponse->assertRedirect();

        $disclosure->refresh();
        $this->assertEquals('Jane Doe', $disclosure->consumer_name);
    }


    /**
     * Test that a participant can update an existing disclosure agreement.
     */
    public function test_participant_can_delete_disclosure(): void
    {
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');
        $participant = Participant::factory()->create(['user_id' => $participantUser->id]);

        $disclosureData = $this->getDisclosureData();
        $disclosure = $participant->disclosureAuthorizations()->create($disclosureData);

        // Test the update endpoint
        $updateRoute = route('intake.disclosure.destroy', ['disclosureAuthorization' => $disclosure->id]);
        $this->actingAs($participantUser)->delete($updateRoute);

        $participant->refresh();

        $this->assertCount(0, $participant->disclosureAuthorizations);
    }


    public function getDisclosureData(): array
    {
        return [
            'consumer_name' => 'John Doe',

            // Authorized entities
            'is_dss_authorized' => true,
            'is_dys_authorized' => false,
            'is_mhd_authorized' => true,
            'is_dfas_authorized' => false,
            'is_mmac_authorized' => true,
            'is_fsd_authorized' => false,
            'is_cd_authorized' => true,
            'is_dls_authorized' => false,
            'is_other_authorized' => true,
            'other_authorized_entity' => 'Test Entity',

            // Subject information
            'subject_name' => 'John Doe',
            'subject_phone' => '555-123-4567',
            'subject_dob' => '1990-01-01',
            'subject_ssn' => '123-45-6789',
            'subject_address' => '123 Test St',
            'subject_email' => 'john@example.com',

            // Recipients
            'disclose_to_attorney' => true,
            'attorney_name' => 'Jane Smith',
            'disclose_to_employer' => false,
            'employer_name' => null,
            'disclose_to_legislator' => true,
            'legislator_name' => 'Sen. Johnson',
            'disclose_to_governors_staff' => false,
            'other_recipient_details' => 'Test Recipient',

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
            'other_purpose_details' => 'Test Purpose',

            // Information to disclose
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
            'consumer_signature' => 'John Doe',
            'signature_date' => now()->format('Y-m-d'),
            'witness_signature' => 'Jane Witness',
            'witness_signature_date' => now()->format('Y-m-d'),
            'guardian_signature' => null,
            'guardian_signature_date' => null,

            // Survey preferences
            'survey_by_email' => true,
            'survey_by_mail' => false,
            'survey_by_online' => true,

            'date_completed' => now()->format('Y-m-d'),
        ];

    }
} 