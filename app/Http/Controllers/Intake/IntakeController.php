<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntakeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Intake/Index', [
            'participant' => ParticipantData::fromModel($request->user()->participant),
        ]);
    }


    public function intakeComplete(Request $request)
    {
        return Inertia::render('Intake/IntakeComplete',[
            'participant' => ParticipantData::fromModel($request->user()->participant),
        ]);
    }

    public function devAuth()
    {
        $participant = Participant::first();
        $user = $participant->user;
        \Auth::login($user);

        $route = request()->query('route') ?? 'intake.media-release.index';

        return redirect()->route($route);
    }


}
