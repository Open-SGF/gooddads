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
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
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
    public function store(ParticipantSignupForm $request): RedirectResponse|JsonResponse
    {
        try {
            $participantId = session('intake_user_id');
            $participant = Participant::create([
                'user_id' => $participantId,
                ...array_diff_key($request->all(), ['children' => '']),
            ]);
            $children = $request->children;
            foreach ($children as $child) {
                $child = $child->all();
                $child['participant_id'] = $participant->id;
                Child::create($child);
            }

            if (auth()->user()->hasRole('intake')) {
                session(['intake_participant_id' => $participant->id]);

                return redirect(route('intake.disclosure', ['participant' => $participant]));
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
