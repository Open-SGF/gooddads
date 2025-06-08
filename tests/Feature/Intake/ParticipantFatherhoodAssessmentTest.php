<?php

namespace Tests\Feature\Intake;

use App\Models\Participant;
use App\Models\ParticipantFatherhoodAssessment;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ParticipantFatherhoodAssessmentTest extends TestCase
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
    public function test_participant_fatherhood_assessment_index_renders(): void
    {
        $fatherhoodAssessment = ParticipantFatherhoodAssessment::factory()->create();

        $participantUser = $fatherhoodAssessment->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-assessment.index'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->count('fatherhoodAssessments', 1));
    }

    public function test_participant_fatherhood_assessment_create_form_renders(): void
    {
        $fatherhoodAssessment = ParticipantFatherhoodAssessment::factory()->create();

        $participantUser = $fatherhoodAssessment->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-assessment.create'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/FatherhoodAssessment/Create'));
    }

    public function test_participant_fatherhood_assessment_edit_form_renders(): void
    {
        $fatherhoodAssessment = ParticipantFatherhoodAssessment::factory()->create();

        $participantUser = $fatherhoodAssessment->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-assessment.edit', ['fatherhoodAssessment' => $fatherhoodAssessment->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/FatherhoodAssessment/Edit'));
    }

    public function test_participant_fatherhood_assessment_show_form_renders(): void
    {
        $fatherhoodAssessment = ParticipantFatherhoodAssessment::factory()->create();

        $participantUser = $fatherhoodAssessment->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.fatherhood-assessment.show', ['fatherhoodAssessment' => $fatherhoodAssessment->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/FatherhoodAssessment/Show'));
    }


    public function test_participant_fatherhood_assessment_store_creates_record(): void
    {
        $participant = Participant::factory()->create();

        $participantUser = $participant->user;

        $data = ParticipantFatherhoodAssessment::factory()->make()->attributesToArray();

        $response = $this->actingAs($participantUser)->post(route('intake.fatherhood-assessment.store'), $data);

        $response->assertRedirect();
        $participant->refresh();

        $this->assertCount(1, $participant->fatherhoodAssessments()->get());
    }

    public function test_participant_fatherhood_assessment_update_record(): void
    {
        $fatherhoodAssessment = ParticipantFatherhoodAssessment::factory()->create();

        $participantUser = $fatherhoodAssessment->participant->user;

        $data = $fatherhoodAssessment->attributesToArray();
        $data['participant_name'] = 'new name';

        $response = $this->actingAs($participantUser)->patch(route('intake.fatherhood-assessment.update', ['fatherhoodAssessment' => $fatherhoodAssessment->id]), $data);
        $response->assertRedirect();

        $fatherhoodAssessment->refresh();
        $this->assertEquals('new name', $fatherhoodAssessment->participant_name);
    }

    public function test_participant_fatherhood_assessment_deletes_record(): void
    {
        $fatherhoodAssessment = ParticipantFatherhoodAssessment::factory()->create();
        $participant = $fatherhoodAssessment->participant;
        $participantUser = $participant->user;

        $response = $this->actingAs($participantUser)->delete(route('intake.fatherhood-assessment.destroy', ['fatherhoodAssessment' => $fatherhoodAssessment->id]));
        $response->assertRedirect();

        $participant->refresh();
        $this->assertCount(0, $participant->fatherhoodAssessments()->get());

    }
}
