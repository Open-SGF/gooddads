<?php

namespace App\Http\Controllers\Intake;

use App\Data\Forms\ParticipantSignupForm;
use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Log;
use Throwable;

class ParticipantRegistrationController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {

        return Inertia::render('Intake/Signup', [
            'user' => Auth::user(),
            'ethnicity' => Ethnicity::displayArray(),
            'maritalStatus' => MaritalStatus::displayArray(),
            'regions' => Region::get(['id', 'description'])->toArray(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws Throwable
     */
    public function store(ParticipantSignupForm $request): JsonResponse
    {
        try {
            $participant = ParticipantSignupForm::from($request);
            $participantData = $participant->toArray();

            return response()->json($participantData);
        } catch (Throwable $e) {
            Log::error('Error processing participant signup form: '.$e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
