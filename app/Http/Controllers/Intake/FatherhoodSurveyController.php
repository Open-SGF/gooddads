<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use App\Models\ParticipantFatherhoodSurvey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FatherhoodSurveyController extends Controller
{
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantFatherhoodSurvey::class, $participant]);

        return Inertia::render('Intake/ParticipantFatherhoodSurvey/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

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
}
