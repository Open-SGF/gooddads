<?php

namespace Tests\Feature\Intake;

use App\Models\Participant;
use App\Models\ParticipantServicePlan;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ParticipantServicePlanTest extends TestCase
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
        $servicePlan = ParticipantServicePlan::factory()->create();

        $participantUser = $servicePlan->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.service-plan.index'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->dd() && $page->count('servicePlans', 1));
    }

    public function test_participant_create_form_renders(): void
    {
        $servicePlan = ParticipantServicePlan::factory()->create();

        $participantUser = $servicePlan->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.service-plan.create'));
        $response->assertStatus(200);


        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/ServicePlan/Create'));
    }

    public function test_participant_edit_form_renders(): void
    {
        $servicePlan = ParticipantServicePlan::factory()->create();

        $participantUser = $servicePlan->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.service-plan.edit', ['servicePlan' => $servicePlan->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/ServicePlan/Edit'));
    }

    public function test_participant_show_form_renders(): void
    {
        $servicePlan = ParticipantServicePlan::factory()->create();

        $participantUser = $servicePlan->participant->user;

        $response = $this->actingAs($participantUser)->get(route('intake.service-plan.show', ['servicePlan' => $servicePlan->id]));
        $response->assertStatus(200);

        $response->assertInertia(fn(AssertableInertia $page) => $page->component('Intake/ServicePlan/Show'));
    }


    public function test_participant_store_creates_record(): void
    {
        $participant = Participant::factory()->create();

        $participantUser = $participant->user;

        $data = ParticipantServicePlan::factory()->make()->attributesToArray();

        $response = $this->actingAs($participantUser)->post(route('intake.service-plan.store'), $data);

        $response->assertRedirect();
        $participant->refresh();

        $this->assertCount(1, $participant->servicePlans()->get());
    }

    public function test_participant_update_record(): void
    {
        $servicePlan = ParticipantServicePlan::factory()->create();

        $participantUser = $servicePlan->participant->user;

        $data = $servicePlan->attributesToArray();
        $data['goal'] = 'This is a new goal to test';

        $response = $this->actingAs($participantUser)->patch(route('intake.service-plan.update', ['servicePlan' => $servicePlan->id]), $data);
        $response->assertRedirect();

        $servicePlan->refresh();
        $this->assertEquals('This is a new goal to test', $servicePlan->goal);
    }

    public function test_participant_deletes_record(): void
    {
        $servicePlan = ParticipantServicePlan::factory()->create();
        $participant = $servicePlan->participant;
        $participantUser = $participant->user;

        $response = $this->actingAs($participantUser)->delete(route('intake.service-plan.destroy', ['servicePlan' => $servicePlan->id]));
        $response->assertRedirect();

        $participant->refresh();
        $this->assertCount(0, $participant->servicePlans()->get());

    }
}
