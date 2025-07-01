<?php

namespace App\Http\Controllers\Intake;

use App\Data\Intake\PostParticipantData;
use App\Data\Props\ParticipantRegistrationProps;
use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\Participant;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Exceptions\UnauthorizedException;

class RegistrationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Intake/Signup', ParticipantRegistrationProps::from([
            'ethnicity' => Ethnicity::displayArray(),
            'maritalStatus' => MaritalStatus::displayArray(),
            'regions' => Region::get(['id', 'description'])->toArray(),
        ])->toArray());
    }

    public function store(PostParticipantData $request): RedirectResponse
    {
        $participantId = session('intakeUserId');
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

        if (! auth()->user()->hasRole('intake')) {
            throw new UnauthorizedException(401, 'Unauthorized');
        }

        session(['intakeParticipantId' => $participant->id]);

        return redirect(route('intake.disclosure.create'));
    }
}
