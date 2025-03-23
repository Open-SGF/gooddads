<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\StoreParticipantFatherhoodSurveyRequest;
use App\Http\Requests\Intake\UpdateParticipantFatherhoodSurveyRequest;
use App\Http\Resources\ParticipantResource;
use App\Models\ParticipantFatherhoodSurvey;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantFatherhoodSurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodSurvey/Index',[
            'participant' => ParticipantResource::make($participant),
            'fatherhoodSurveys' => $participant?->fatherhoodSurveys?->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Intake/FatherhoodSurvey/Create',[
            'participant' => ParticipantResource::make($request->user()->participant),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParticipantFatherhoodSurveyRequest $request)
    {
        $validated = $request->validated();
        $participant = $request->user()->participant;

        $participant->FatherhoodSurveys()->create($validated);
        return redirect()->back(303)->with('message', 'Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ParticipantFatherhoodSurvey $fatherhoodSurvey)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodSurvey/Show', [
            'participant' => ParticipantResource::make($participant),
            'fatherhoodSurvey' => $fatherhoodSurvey->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ParticipantFatherhoodSurvey $fatherhoodSurvey)
    {
        $participant = $request->user()->participant;

        return Inertia::render('Intake/FatherhoodSurvey/Edit', [
            'participant' => ParticipantResource::make($participant),
            'fatherhoodSurvey' => $fatherhoodSurvey->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParticipantFatherhoodSurveyRequest $request, ParticipantFatherhoodSurvey $fatherhoodSurvey)
    {
        $validated = $request->validated();
        $fatherhoodSurvey->update($validated);

        return redirect()->back(303)->with('message', 'Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ParticipantFatherhoodSurvey $fatherhoodSurvey)
    {
        $fatherhoodSurvey->delete();

        return redirect()->back(303)->with('message', 'Deleted Successfully');
    }

}
