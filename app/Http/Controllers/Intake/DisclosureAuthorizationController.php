<?php

namespace App\Http\Controllers\Intake;

use App\Data\Intake\PostDisclosureAuthorizationData;
use App\Data\Props\ParticipantDisclosureAuthorizationProps;
use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DisclosureAuthorizationController extends Controller
{
    public function create(Request $request): Response
    {
        $props = ParticipantDisclosureAuthorizationProps::from([
            'purposes' => DisclosurePurposeType::displayArray(),
            'contentTypes' => DisclosureContentType::displayArray(),
        ])->toArray();

        return Inertia::render('Intake/Disclosure', $props);
    }

    public function store(PostDisclosureAuthorizationData $request): RedirectResponse
    {
        session(['participantDisclosureAuthorizationForm' => $request->toArray()]);

        return redirect()->route('intake.fatherhoodAssessment.create');
    }
}
