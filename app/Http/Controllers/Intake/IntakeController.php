<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Http\Resources\ParticipantResource;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntakeController extends Controller
{
    public function index()
    {
        return Inertia::render('Intake/Index');
    }


    public function intakeComplete(Request $request)
    {
        return Inertia::render('Intake/IntakeComplete',[
            'participant' => ParticipantResource::make($request->user()->participant),
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
