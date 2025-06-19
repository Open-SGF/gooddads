<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\ParticipantServicePlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantServicePlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Participant $participant)
    {
        $this->authorize('view', $participant);

        return Inertia::render('Intake/ParticipantServicePlan/Index', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantServicePlan::class, $participant]);

        return Inertia::render('Intake/ParticipantServicePlan/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantServicePlan::class, $participant]);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $servicePlan = $participant->servicePlans()->create($validated);

        return redirect()->route('intake.participant-service-plan.show', [
            'participant' => $participant,
            'servicePlan' => $servicePlan,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Participant $participant, ParticipantServicePlan $servicePlan)
    {
        $this->authorize('view', $servicePlan);

        return Inertia::render('Intake/ParticipantServicePlan/Show', [
            'participant' => ParticipantData::fromModel($participant),
            'servicePlan' => $servicePlan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantServicePlan $servicePlan)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/ServicePlan/Edit', [
            'participant' => ParticipantData::fromModel($participant),
            'servicePlan' => $servicePlan->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant, ParticipantServicePlan $servicePlan)
    {
        $this->authorize('update', $servicePlan);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $servicePlan->update($validated);

        return redirect()->route('intake.participant-service-plan.show', [
            'participant' => $participant,
            'servicePlan' => $servicePlan,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ParticipantServicePlan $servicePlan)
    {
        $servicePlan->delete();

        return redirect()->back(303)->with('message', 'Deleted Successfully');
    }
}
