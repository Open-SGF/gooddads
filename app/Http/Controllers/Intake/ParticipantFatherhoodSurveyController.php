<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantFatherhoodSurveyRequest;
use App\Http\Requests\Intake\UpdateParticipantFatherhoodSurveyRequest;
use App\Models\Participant;
use App\Models\ParticipantFatherhoodSurvey;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantFatherhoodSurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Participant $participant)
    {
        $this->authorize('view', $participant);

        return Inertia::render('Intake/ParticipantFatherhoodSurvey/Index', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantFatherhoodSurvey::class, $participant]);

        return Inertia::render('Intake/ParticipantFatherhoodSurvey/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantFatherhoodSurvey::class, $participant]);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $survey = $participant->fatherhoodSurveys()->create($validated);

        return redirect()->route('intake.participant-fatherhood-survey.show', [
            'participant' => $participant,
            'survey' => $survey,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Participant $participant, ParticipantFatherhoodSurvey $survey)
    {
        $this->authorize('view', $survey);

        return Inertia::render('Intake/ParticipantFatherhoodSurvey/Show', [
            'participant' => ParticipantData::fromModel($participant),
            'survey' => $survey,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantFatherhoodSurvey $fatherhoodSurvey)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodSurvey/Edit', [
            'participant' => ParticipantData::fromModel($participant),
            'fatherhoodSurvey' => $fatherhoodSurvey->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant, ParticipantFatherhoodSurvey $survey)
    {
        $this->authorize('update', $survey);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $survey->update($validated);

        return redirect()->route('intake.participant-fatherhood-survey.show', [
            'participant' => $participant,
            'survey' => $survey,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ParticipantFatherhoodSurvey $fatherhoodSurvey)
    {
        $fatherhoodSurvey->delete();

        return redirect()->back(303)->with('message', 'Deleted Successfully');
    }
}
