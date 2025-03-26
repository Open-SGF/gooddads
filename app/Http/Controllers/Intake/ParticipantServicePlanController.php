<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantServicePlanRequest;
use App\Http\Requests\Intake\UpdateParticipantServicePlanRequest;
use App\Http\Resources\ParticipantResource;
use App\Models\ParticipantServicePlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantServicePlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/ServicePlan/Index',[
            'participant' => ParticipantResource::make($participant),
            'servicePlans' => $participant?->servicePlans?->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Intake/ServicePlan/Create',[
            'participant' => ParticipantResource::make($request->user()->participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParticipantservicePlanRequest $request)
    {
        $validated = $request->validated();
        $participant = $request->user()->participant;

        $participant->servicePlans()->create($validated);
        return redirect()->back(303)->with('message', 'Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ParticipantservicePlan $servicePlan)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/ServicePlan/Show', [
            'participant' => ParticipantResource::make($participant),
            'servicePlan' => $servicePlan->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantServicePlan $servicePlan)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/ServicePlan/Edit', [
            'participant' => ParticipantResource::make($participant),
            'servicePlan' => $servicePlan->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParticipantServicePlanRequest $request, ParticipantServicePlan $servicePlan)
    {
        $validated = $request->validated();
        $servicePlan->update($validated);

        return redirect()->back(303)->with('message', 'Updated Successfully');
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
