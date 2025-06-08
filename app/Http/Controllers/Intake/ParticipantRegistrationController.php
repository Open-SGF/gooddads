<?php

namespace App\Http\Controllers\Intake;

use App\Data\Forms\ChildForm;
use App\Data\Forms\ParticipantSignupForm;
use App\Data\Props\ParticipantRegistrationProps;
use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\Participant;
use App\Models\Region;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        return Inertia::render('Intake/Signup', ParticipantRegistrationProps::from([
            'ethnicity' => Ethnicity::displayArray(),
            'maritalStatus' => MaritalStatus::displayArray(),
            'regions' => Region::get(['id', 'description'])->toArray(),
        ])->toArray());
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws Throwable
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        try {
            $participant = ParticipantSignupForm::from($request->all());

            $participantId = session('intake_user_id');
            unset($participant->children);
            $participant = Participant::create([
                'user_id' => $participantId,
                ...$participant->toArray(),
            ]);
            $children = $request->children;
            foreach ($children as $child) {
                $child = ChildForm::from($child);
                $child = $child->toArray();
                $child['participant_id'] = $participant->id;
                Child::create($child);
            }

            if (auth()->user()->hasRole('intake')) {
                // Store the user ID in session
                session(['intake_participant_id' => $participant->id]);

                return redirect(route('intake.disclosure'));
            }

            return response()->json($participant);
        } catch (Throwable $e) {
            Log::error('Error processing participant signup form: '.$e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
