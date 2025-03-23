<?php

namespace Tests\Feature\Intake;

use App\Models\Participant;
use App\Models\ParticipantFatherhoodAssessment;
use App\Models\ParticipantFatherhoodSurvey;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ParticipantFatherhoodSurveyTest extends TestCase
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
        $fatherhoodSurvey = ParticipantFatherhoodSurvey::factory()->create();

        $participantUser = $fatherhoodSurvey->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-survey.index'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->dd() && $page->count('fatherhoodSurveys', 1));
    }

    public function test_participant_create_form_renders(): void
    {
        $fatherhoodSurvey = ParticipantFatherhoodSurvey::factory()->create();

        $participantUser = $fatherhoodSurvey->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-survey.create'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/FatherhoodSurvey/Create'));
    }

    public function test_participant_edit_form_renders(): void
    {
        $fatherhoodSurvey = ParticipantFatherhoodSurvey::factory()->create();

        $participantUser = $fatherhoodSurvey->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-survey.edit', ['fatherhoodSurvey' => $fatherhoodSurvey->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/FatherhoodSurvey/Edit'));
    }

    public function test_participant_show_form_renders(): void
    {
        $fatherhoodSurvey = ParticipantFatherhoodSurvey::factory()->create();

        $participantUser = $fatherhoodSurvey->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-survey.show', ['fatherhoodSurvey' => $fatherhoodSurvey->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/FatherhoodSurvey/Show'));
    }


    public function test_participant_store_creates_record(): void
    {
        $participant = Participant::factory()->create();

        $participantUser = $participant->user;

        $data = ParticipantFatherhoodSurvey::factory()->make()->attributesToArray();

        $response = $this->actingAs($participantUser)->post(route('intake.fatherhood-survey.store'), $data);

        $response->assertRedirect();
        $participant->refresh();

        $this->assertCount(1, $participant->fatherhoodSurveys()->get());
    }

    public function test_participant_update_record(): void
    {
        $fatherhoodSurvey = ParticipantFatherhoodSurvey::factory()->create();

        $participantUser = $fatherhoodSurvey->participant->user;

        $data = $fatherhoodSurvey->attributesToArray();
        $data['date_of_birth'] = null;

        $response = $this->actingAs($participantUser)->patch(route('intake.fatherhood-survey.update', ['fatherhoodSurvey' => $fatherhoodSurvey->id]), $data);
        $response->assertRedirect();

        $fatherhoodSurvey->refresh();
        $this->assertEquals(null, $fatherhoodSurvey->date_of_birth);
    }

    public function test_participant_deletes_record(): void
    {
        $fatherhoodSurvey = ParticipantFatherhoodSurvey::factory()->create();
        $participant = $fatherhoodSurvey->participant;
        $participantUser = $participant->user;

        $response = $this->actingAs($participantUser)->delete(route('intake.fatherhood-survey.destroy', ['fatherhoodSurvey' => $fatherhoodSurvey->id]));
        $response->assertRedirect();

        $participant->refresh();
        $this->assertCount(0, $participant->fatherhoodSurveys()->get());

    }
}
