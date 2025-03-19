<?php

namespace Tests\Unit\Models;

use App\Models\Participant;
use App\Models\ParticipantDisclosureAuthorization;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParticipantDisclosureAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the relationship between Participant and ParticipantDisclosureAuthorization.
     *
     * @return void
     */
    public function test_participant_relationship()
    {
        // Create a participant
        $participant = Participant::factory()->create();
        
        // Create a disclosure authorization for the participant
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create([
            'participant_id' => $participant->id
        ]);
        
        // Test the relationship from disclosure to participant
        $this->assertInstanceOf(Participant::class, $disclosureAuth->participant);
        $this->assertEquals($participant->id, $disclosureAuth->participant->id);
        
        // Test the relationship from participant to disclosure
        $this->assertTrue($participant->disclosureAuthorization->is($disclosureAuth));
    }

    /**
     * Test that the model uses UUIDs.
     *
     * @return void
     */
    public function test_uses_uuids()
    {
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create();
        
        // UUID should be a string, not an integer
        $this->assertIsString($disclosureAuth->id);
        
        // UUID should be 36 characters long (standard UUID format)
        $this->assertEquals(36, strlen($disclosureAuth->id));
    }

    /**
     * Test that the model casts date fields correctly.
     *
     * @return void
     */
    public function test_date_casting()
    {
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create();
        
        // Test that date fields are cast to Carbon instances
        $this->assertInstanceOf(\Carbon\Carbon::class, $disclosureAuth->subject_dob);
        $this->assertInstanceOf(\Carbon\Carbon::class, $disclosureAuth->signature_date);
        $this->assertInstanceOf(\Carbon\Carbon::class, $disclosureAuth->witness_signature_date);
        
        // If guardian_signature_date is not null, it should be a Carbon instance
        if ($disclosureAuth->guardian_signature_date) {
            $this->assertInstanceOf(\Carbon\Carbon::class, $disclosureAuth->guardian_signature_date);
        }
        
        // If date_completed is not null, it should be a Carbon instance
        if ($disclosureAuth->date_completed) {
            $this->assertInstanceOf(\Carbon\Carbon::class, $disclosureAuth->date_completed);
        }
    }

    /**
     * Test that boolean fields are cast correctly.
     *
     * @return void
     */
    public function test_boolean_casting()
    {
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create([
            'is_dss_authorized' => 1,
            'disclose_to_attorney' => 1,
            'purpose_eligibility_determination' => 1,
            'disclose_entire_file' => 1,
            'accept_text_messages' => 1,
        ]);
        
        // Test that boolean fields are cast to boolean
        $this->assertIsBool($disclosureAuth->is_dss_authorized);
        $this->assertIsBool($disclosureAuth->disclose_to_attorney);
        $this->assertIsBool($disclosureAuth->purpose_eligibility_determination);
        $this->assertIsBool($disclosureAuth->disclose_entire_file);
        $this->assertIsBool($disclosureAuth->accept_text_messages);
        
        // Test that the values are true
        $this->assertTrue($disclosureAuth->is_dss_authorized);
        $this->assertTrue($disclosureAuth->disclose_to_attorney);
        $this->assertTrue($disclosureAuth->purpose_eligibility_determination);
        $this->assertTrue($disclosureAuth->disclose_entire_file);
        $this->assertTrue($disclosureAuth->accept_text_messages);
    }
} 