<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantMediaReleaseRequest;
use App\Http\Requests\Intake\UpdateParticipantMediaReleaseRequest;
use App\Http\Resources\ParticipantMediaReleaseResource;
use App\Http\Resources\ParticipantResource;
use App\Models\ParticipantMediaRelease;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantMediaReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/MediaRelease/Index',[
            'participant' => ParticipantResource::make($participant),
            'mediaReleases' => ParticipantMediaReleaseResource::collection($participant?->mediaReleases),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Intake/MediaRelease/Create',[
            'participant' => ParticipantResource::make($request->user()->participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParticipantmediaReleaseRequest $request)
    {
        $validated = $request->validated();
        $participant = $request->user()->participant;

        $participant->mediaReleases()->create($validated);
        return redirect()->back(303)->with('message', 'Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ParticipantmediaRelease $mediaRelease)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/MediaRelease/Show', [
            'participant' => ParticipantResource::make($participant),
            'mediaRelease' => ParticipantMediaReleaseResource::make($mediaRelease),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantMediaRelease $mediaRelease)
    {
        $participant = $request->user()->participant;

        \Log::debug('media release', ['form' => ParticipantMediaReleaseResource::make($mediaRelease)->resolve()]);

        return Inertia::render('Intake/MediaRelease/Edit', [
            'participant' => ParticipantResource::make($participant),
            'mediaRelease' => ParticipantMediaReleaseResource::make($mediaRelease),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParticipantMediaReleaseRequest $request, ParticipantMediaRelease $mediaRelease)
    {
        $validated = $request->validated();
        $mediaRelease->update($validated);

        return redirect()->back(303)->with('message', 'Updated Successfully');
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
