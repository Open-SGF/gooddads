<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantDisclosureAuthorizationRequest;
use App\Http\Requests\Intake\UpdateParticipantDisclosureAuthorizationRequest;
use App\Http\Resources\ParticipantResource;
use App\Models\Participant;
use App\Models\ParticipantDisclosureAuthorization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantDisclosureController extends Controller
{
    public function index(Request $request, Participant $participant)
    {
        $this->authorize('view', $participant);

        return Inertia::render('Intake/ParticipantDisclosure/Index', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Display the create view.
     */
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantDisclosureAuthorization::class, $participant]);

        return Inertia::render('Intake/ParticipantDisclosure/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Handle an incoming disclosure agreement request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantDisclosureAuthorization::class, $participant]);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $disclosure = $participant->disclosureAuthorizations()->create($validated);

        return redirect()->route('intake.participant-disclosure.show', [
            'participant' => $participant,
            'disclosure' => $disclosure,
        ]);
    }

    /**
     * Show the form for editing the disclosure agreement.
     */
    public function show(Request $request, Participant $participant, ParticipantDisclosureAuthorization $disclosureAuthorization): Response
    {
        $this->authorize('view', $disclosureAuthorization);

        return Inertia::render('Intake/Disclosure/Show', [
            'participant' => ParticipantData::fromModel($participant),
            'disclosureAuthorization' => $disclosureAuthorization,
        ]);
    }

    /**
     * Show the form for editing the disclosure agreement.
     */
    public function edit(Request $request, ParticipantDisclosureAuthorization $disclosureAuthorization): Response
    {
        $participant = $request->user()->participant;
        
        return Inertia::render('Intake/Disclosure/Edit', [
            'participant' => ParticipantData::fromModel($participant),
            'disclosureAuthorization' => $disclosureAuthorization,
        ]);
    }

    /**
     * Update the disclosure agreement.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, Participant $participant, ParticipantDisclosureAuthorization $disclosureAuthorization): RedirectResponse
    {
        $this->authorize('update', $disclosureAuthorization);

        $validated = $request->validate([
            // Add validation rules here
        ]);

        $disclosureAuthorization->update($validated);

        return redirect()->route('intake.participant-disclosure.show', [
            'participant' => $participant,
            'disclosure' => $disclosureAuthorization,
        ]);
    }

    public function destroy(Request $request, Participant $participant, ParticipantDisclosureAuthorization $disclosureAuthorization): RedirectResponse
    {
        $this->authorize('delete', $disclosureAuthorization);

        if($disclosureAuthorization->participant_id !== $participant->id) {
            abort(403);
        }

        $disclosureAuthorization->delete();

        return redirect()->back(303)->with('message', 'Disclosure Authorization Deleted Successfully');
    }
}