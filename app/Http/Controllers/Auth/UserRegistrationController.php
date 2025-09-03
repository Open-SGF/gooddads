<?php

namespace App\Http\Controllers\Auth;

use App\Data\Auth\PostUserData;
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
        return Inertia::render('Auth/Register');
    }

    public function store(PostUserData $request): RedirectResponse|JsonResponse
    {
        $user = User::create($request->all());

        event(new Registered($user));

        return redirect(route('auth.register.create'));
    }
}
