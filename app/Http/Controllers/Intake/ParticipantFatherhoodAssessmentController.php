<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantFatherhoodAssessmentRequest;
use App\Http\Requests\Intake\UpdateParticipantFatherhoodAssessmentRequest;
use App\Http\Resources\ParticipantResource;
use App\Models\ParticipantFatherhoodAssessment;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ParticipantFatherhoodAssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodAssessment/Index',[
            'participant' => ParticipantResource::make($participant),
            'fatherhoodAssessments' => $participant?->fatherhoodAssessments?->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Intake/FatherhoodAssessment/Create',[
            'participant' => ParticipantResource::make($request->user()->participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParticipantFatherhoodAssessmentRequest $request)
    {
        $validated = $request->validated();
        $participant = $request->user()->participant;

        $participant->fatherhoodAssessments()->create($validated);
        return redirect()->back(303)->with('message', 'Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ParticipantFatherhoodAssessment $fatherhoodAssessment)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodAssessment/Show', [
            'participant' => ParticipantResource::make($participant),
            'fatherhoodAssessment' => $fatherhoodAssessment->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantFatherhoodAssessment $fatherhoodAssessment)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodAssessment/Edit', [
            'participant' => ParticipantResource::make($participant),
            'fatherhoodAssessment' => $fatherhoodAssessment->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParticipantFatherhoodAssessmentRequest $request, ParticipantFatherhoodAssessment $fatherhoodAssessment)
    {
        $validated = $request->validated();
        $fatherhoodAssessment->update($validated);

        return redirect()->back(303)->with('message', 'Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ParticipantFatherhoodAssessment $fatherhoodAssessment)
    {
        $fatherhoodAssessment->delete();

        return redirect()->back(303)->with('message', 'Deleted Successfully');
    }
}
