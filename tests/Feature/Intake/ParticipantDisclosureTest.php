<?php

namespace Tests\Feature\Intake;

use App\Models\Participant;
use App\Models\ParticipantDisclosureAuthorization;
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


    public function test_disclosure_index_is_rendered(): void
    {
        $disclosure = ParticipantDisclosureAuthorization::factory()->create();
        $participantUser = $disclosure->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.index'));

        $response->assertInertia(fn(AssertableInertia $page) => $page->count('disclosureAuthorizations', 1));
    }

    public function test_disclosure_create_form_is_rendered(): void
    {
        $participant = Participant::factory()->create();
        $participantUser = $participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.create'));

        $response->assertStatus(200);
    }

    public function test_disclosure_edit_is_rendered(): void
    {
        $disclosure = ParticipantDisclosureAuthorization::factory()->create();
        $participantUser = $disclosure->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.disclosure.update', $disclosure->id));

        $response->assertStatus(200);
    }

    /**
     * Test that a participant can store a new disclosure agreement.
     */
    public function test_participant_can_create_disclosure(): void
    {
        $participant = Participant::factory()->create();
        $participantUser = $participant->user;

        $disclosureData = ParticipantDisclosureAuthorization::factory()->make()->attributesToArray();

        $this->actingAs($participantUser)->post(route('intake.disclosure.store'), $disclosureData);

        $this->assertNotNull($participant->disclosureAuthorizations);
    }

    public function test_participant_can_update_disclosure(): void
    {
        $disclosure = ParticipantDisclosureAuthorization::factory()->create();
        $participant = $disclosure->participant;
        $participantUser = $participant->user;

        $disclosureData = $disclosure->attributesToArray();

        $updatedData = [
            ...$disclosureData,
            'consumer_name' => 'Jane Doe',
        ];

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
        $disclosure = ParticipantDisclosureAuthorization::factory()->create();
        $participant = $disclosure->participant;
        $participantUser = $participant->user;

        // Test the update endpoint
        $updateRoute = route('intake.disclosure.destroy', ['disclosureAuthorization' => $disclosure->id]);
        $this->actingAs($participantUser)->delete($updateRoute);

        $participant->refresh();

        $this->assertCount(0, $participant->disclosureAuthorizations);
    }

} 