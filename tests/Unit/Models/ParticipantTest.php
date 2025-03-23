<?php

namespace Tests\Unit\Models;

use App\Models\Participant;
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
} 