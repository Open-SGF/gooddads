<?php

namespace App\Http\Controllers\Auth;

use App\Data\Auth\CreateUserData;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserRegistrationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Intake/Register');
    }

    public function store(CreateUserData $request): RedirectResponse|JsonResponse
    {
        $user = User::create($request->all());

        if (! auth()->user()->hasRole('intake')) {
            return response()->json($user);
        }

        session(['intakeUserId' => $user->id]);

        event(new Registered($user));

        return redirect(route('intake.participantRegister.create'));
    }
}
