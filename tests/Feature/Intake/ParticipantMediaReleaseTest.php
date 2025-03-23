<?php

namespace Tests\Feature\Intake;

use App\Models\Participant;
use App\Models\ParticipantMediaRelease;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ParticipantMediaReleaseTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(PermissionsSeeder::class);
    }


    /**
     * A basic feature test example.
     */
    public function test_participant_index_renders(): void
    {
        $mediaRelease = ParticipantMediaRelease::factory()->create();

        $participantUser = $mediaRelease->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.media-release.index'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->dd() && $page->count('mediaReleases', 1));
    }

    public function test_participant_create_form_renders(): void
    {
        $mediaRelease = ParticipantMediaRelease::factory()->create();

        $participantUser = $mediaRelease->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.media-release.create'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/MediaRelease/Create'));
    }

    public function test_participant_edit_form_renders(): void
    {
        $mediaRelease = ParticipantMediaRelease::factory()->create();

        $participantUser = $mediaRelease->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.media-release.edit', ['mediaRelease' => $mediaRelease->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/MediaRelease/Edit'));
    }

    public function test_participant_show_form_renders(): void
    {
        $mediaRelease = ParticipantMediaRelease::factory()->create();

        $participantUser = $mediaRelease->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.media-release.show', ['mediaRelease' => $mediaRelease->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/MediaRelease/Show'));
    }


    public function test_participant_store_creates_record(): void
    {
        $participant = Participant::factory()->create();

        $participantUser = $participant->user;

        $data = ParticipantMediaRelease::factory()->make()->attributesToArray();

        $response = $this->actingAs($participantUser)->post(route('intake.media-release.store'), $data);

        $response->assertRedirect();
        $participant->refresh();

        $this->assertCount(1, $participant->mediaReleases()->get());
    }

    public function test_participant_update_record(): void
    {
        $mediaRelease = ParticipantMediaRelease::factory()->create();

        $participantUser = $mediaRelease->participant->user;

        $data = $mediaRelease->attributesToArray();
        $data['email'] = 'this-is-a-new-email-to-test@some-random-domain.gov';

        $response = $this->actingAs($participantUser)->patch(route('intake.media-release.update', ['mediaRelease' => $mediaRelease->id]), $data);
        $response->assertRedirect();

        $mediaRelease->refresh();
        $this->assertEquals('this-is-a-new-email-to-test@some-random-domain.gov', $mediaRelease->email);
    }

    public function test_participant_deletes_record(): void
    {
        $mediaRelease = ParticipantMediaRelease::factory()->create();
        $participant = $mediaRelease->participant;
        $participantUser = $participant->user;

        $response = $this->actingAs($participantUser)->delete(route('intake.media-release.destroy', ['mediaRelease' => $mediaRelease->id]));
        $response->assertRedirect();

        $participant->refresh();
        $this->assertCount(0, $participant->mediaReleases()->get());
    }

}
