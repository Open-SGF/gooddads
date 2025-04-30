<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Data\ParticipantMediaReleaseData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantMediaReleaseRequest;
use App\Http\Requests\Intake\UpdateParticipantMediaReleaseRequest;
use App\Models\Participant;
use App\Models\ParticipantMediaRelease;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantMediaReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Participant $participant)
    {
        $this->authorize('view', $participant);

        return Inertia::render('Intake/ParticipantMediaRelease/Index', [
            'participant' => ParticipantData::fromModel($participant),
            'mediaReleases' => ParticipantMediaReleaseData::collection($participant?->mediaReleases),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantMediaRelease::class, $participant]);

        return Inertia::render('Intake/ParticipantMediaRelease/Create', [
            'participant' => ParticipantData::fromModel($participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $participant = $request->user()->participant;
        $this->authorize('create', [ParticipantMediaRelease::class, $participant]);

        $validated = $request->validate([
            'printed_name' => ['required', 'string', 'max:255'],
            'signature' => ['required', 'string'],
            'signature_date' => ['required', 'date'],
            'phone_number' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $mediaRelease = $participant->mediaReleases()->create($validated);

        return redirect()->route('intake.participant-media-release.show', [
            'participant' => $participant,
            'mediaRelease' => $mediaRelease,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Participant $participant, ParticipantMediaRelease $mediaRelease)
    {
        $this->authorize('view', $mediaRelease);

        return Inertia::render('Intake/ParticipantMediaRelease/Show', [
            'participant' => ParticipantData::fromModel($participant),
            'mediaRelease' => ParticipantMediaReleaseData::fromModel($mediaRelease),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantMediaRelease $mediaRelease)
    {
        $participant = $request->user()->participant;

        \Log::debug('media release', ['form' => ParticipantMediaReleaseData::fromModel($mediaRelease)->toArray()]);

        return Inertia::render('Intake/MediaRelease/Edit', [
            'participant' => ParticipantData::fromModel($participant),
            'mediaRelease' => ParticipantMediaReleaseData::fromModel($mediaRelease),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant, ParticipantMediaRelease $mediaRelease)
    {
        $this->authorize('update', $mediaRelease);

        $validated = $request->validate([
            'printed_name' => ['required', 'string', 'max:255'],
            'signature' => ['required', 'string'],
            'signature_date' => ['required', 'date'],
            'phone_number' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $mediaRelease->update($validated);

        \Log::debug('media release', ['form' => ParticipantMediaReleaseData::fromModel($mediaRelease)->toArray()]);

        return redirect()->route('intake.participant-media-release.show', [
            'participant' => $participant,
            'mediaRelease' => $mediaRelease,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ParticipantMediaRelease $mediaRelease)
    {
        $mediaRelease->delete();

        return redirect()->back(303)->with('message', 'Deleted Successfully');
    }
}
