<?php

namespace Tests\Unit\Models;

use App\Models\Participant;
use App\Models\ParticipantDisclosureAuthorization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParticipantTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the relationship between Participant and User.
     *
     * @return void
     */
    public function test_user_relationship()
    {
        // Create a user
        $user = User::factory()->create();
        
        // Create a participant for the user
        $participant = Participant::factory()->create([
            'user_id' => $user->id
        ]);
        
        // Test the relationship from participant to user
        $this->assertInstanceOf(User::class, $participant->user);
        $this->assertEquals($user->id, $participant->user->id);
    }

    /**
     * Test the relationship between Participant and ParticipantDisclosureAuthorization.
     *
     * @return void
     */
    public function test_disclosure_authorization_relationship()
    {
        // Create a participant
        $participant = Participant::factory()->create();
        
        // Initially, the participant should not have a disclosure authorization
        $this->assertNull($participant->disclosureAuthorization);
        
        // Create a disclosure authorization for the participant
        $disclosureAuth = ParticipantDisclosureAuthorization::factory()->create([
            'participant_id' => $participant->id
        ]);
        
        // Refresh the participant model
        $participant->refresh();
        
        // Now the participant should have a disclosure authorization
        $this->assertInstanceOf(ParticipantDisclosureAuthorization::class, $participant->disclosureAuthorization);
        $this->assertEquals($disclosureAuth->id, $participant->disclosureAuthorization->id);
    }
} 