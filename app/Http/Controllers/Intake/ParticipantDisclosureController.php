<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\ParticipantDisclosureAuthorizationStoreRequest;
use App\Http\Requests\Intake\ParticipantDisclosureAuthorizationUpdateRequest;
use App\Models\ParticipantDisclosureAuthorization;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('Intake/Disclosure',[
            'participant' => $request->user()?->participant ?? [],
        ]);
    }

    /**
     * Handle an incoming disclosure agreement request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(ParticipantDisclosureAuthorizationStoreRequest $request)
    {
        $validated = $request->validated();
        
        // Get the current participant
        $participant = $request->user()->participant;
        
        // Create or update the disclosure authorization
        if ($participant->disclosureAuthorization) {
            // Update existing authorization
            $participant->disclosureAuthorization->update($validated);
            $disclosureAuthorization = $participant->disclosureAuthorization;
        } else {
            // Create new authorization
            $disclosureAuthorization = $participant->disclosureAuthorization()->create($validated);
        }
        
        return redirect()->route('intake.fatherhood-assessment.index');
    }

    /**
     * Show the form for editing the disclosure agreement.
     */
    public function edit(Request $request): Response
    {
        $participant = $request->user()->participant;
        
        return Inertia::render('Intake/Disclosure', [
            'participant' => $participant,
            'disclosureAuthorization' => $participant->disclosureAuthorization,
        ]);
    }

    /**
     * Update the disclosure agreement.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(ParticipantDisclosureAuthorizationUpdateRequest $request, ParticipantDisclosureAuthorization $disclosureAuthorization): RedirectResponse
    {
        $validated = $request->validated();

        $disclosureAuthorization->update($validated);

        return redirect()->route('intake.fatherhood-assessment.index');
    }
}