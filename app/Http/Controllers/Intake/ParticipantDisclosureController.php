<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Services\ParticipantService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantDisclosureController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Intake/Disclosure', [
            'participant' => $request->user()?->participant ?? [],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, ParticipantService $participantService)
    {
        // todo: implement
        return back();
    }
}
