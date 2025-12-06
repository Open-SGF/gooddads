<?php

namespace App\Http\Controllers\Intake;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\ParticipantSignupStoreRequest;
use App\Models\Region;
use App\Services\ParticipantService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantSignupController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {

        return Inertia::render('Intake/Signup', [
            'ethnicity' => Ethnicity::displayArray(),
            'maritalStatus' => MaritalStatus::displayArray(),
            'regions' => Region::get(['id', 'description'])->toArray(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(ParticipantSignupStoreRequest $request, ParticipantService $participantService): RedirectResponse
    {
        $participantData = $request->validated();
        $participantData['date'] ??= now();

        $participantService->create($request->user(), $participantData);

        return redirect(route('intake.disclosure', absolute: false));
    }
}
