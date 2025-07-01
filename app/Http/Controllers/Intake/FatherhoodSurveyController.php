<?php

namespace App\Http\Controllers\Intake;

use App\Data\Intake\PostFatherhoodSurveyData;
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

        return Inertia::render('Intake/FatherhoodSurvey', [
            'participant' => ParticipantData::from($participant),
        ]);
    }

    public function store(PostFatherhoodSurveyData $request)
    {
        $participant = $request->user()->participant;

        $survey = $participant->fatherhoodSurveys()->create($validated);

        return redirect()->route('intake.participant-fatherhood-survey.show', [
            'participant' => $participant,
            'survey' => $survey,
        ]);
    }
}
