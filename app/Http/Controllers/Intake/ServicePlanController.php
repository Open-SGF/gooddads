<?php

namespace App\Http\Controllers\Intake;

use App\Data\Intake\PostServicePlanData;
use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicePlanController extends Controller
{
    public function create(Request $request)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/ServicePlan/Create', [
            'participant' => ParticipantData::from($participant),
        ]);
    }

    public function store(PostServicePlanData $request)
    {
        session(['participantServicePlan' => $request->toArray()]);

        return redirect()->route('intake.mediaRelease.create');
    }
}
