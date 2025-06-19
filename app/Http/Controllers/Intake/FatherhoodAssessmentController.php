<?php

namespace App\Http\Controllers\Intake;

use App\Data\Intake\CreateFatherhoodAssessmentData;
use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use App\Models\ParticipantFatherhoodAssessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FatherhoodAssessmentController extends Controller
{
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantFatherhoodAssessment::class, $participant]);

        return Inertia::render('Intake/ParticipantFatherhoodAssessment/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    public function store(CreateFatherhoodAssessmentData $request)
    {


        return redirect()->route('intake.participant-fatherhood-assessment.show', [
            'participant' => $participant,
            'assessment' => $assessment,
        ]);
    }
}
