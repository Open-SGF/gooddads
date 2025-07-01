<?php

namespace App\Http\Controllers\Intake;

use App\Data\ParticipantData;
use App\Data\ParticipantMediaReleaseData;
use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\ParticipantMediaRelease;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaReleaseController extends Controller
{
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
}
