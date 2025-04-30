<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantFatherhoodAssessmentRequest;
use App\Http\Requests\Intake\UpdateParticipantFatherhoodAssessmentRequest;
use App\Http\Resources\ParticipantResource;
use App\Models\Participant;
use App\Models\ParticipantFatherhoodAssessment;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ParticipantFatherhoodAssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Participant $participant)
    {
        $this->authorize('view', $participant);

        return Inertia::render('Intake/ParticipantFatherhoodAssessment/Index', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantFatherhoodAssessment::class, $participant]);

        return Inertia::render('Intake/ParticipantFatherhoodAssessment/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantFatherhoodAssessment::class, $participant]);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $assessment = $participant->fatherhoodAssessments()->create($validated);

        return redirect()->route('intake.participant-fatherhood-assessment.show', [
            'participant' => $participant,
            'assessment' => $assessment,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Participant $participant, ParticipantFatherhoodAssessment $assessment)
    {
        $this->authorize('view', $assessment);

        return Inertia::render('Intake/ParticipantFatherhoodAssessment/Show', [
            'participant' => ParticipantData::fromModel($participant),
            'assessment' => $assessment,
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
    public function update(Request $request, Participant $participant, ParticipantFatherhoodAssessment $assessment)
    {
        $this->authorize('update', $assessment);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $assessment->update($validated);

        return redirect()->route('intake.participant-fatherhood-assessment.show', [
            'participant' => $participant,
            'assessment' => $assessment,
        ]);
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
