<?php

namespace App\Http\Controllers\Intake;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Intake\ParticipantSignupStoreRequest;
use App\Models\User;
use App\Services\ParticipantService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantDisclosureController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Intake/Disclosure',[
            'participant' => $request->user()?->participant ?? [],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, ParticipantService $participantService)
    {
        // todo: implement
        return back();
    }



}