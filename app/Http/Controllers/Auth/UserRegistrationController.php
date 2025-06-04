<?php

namespace App\Http\Controllers\Auth;

use App\Data\Forms\UserRegistrationForm;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Log;
use Throwable;

class UserRegistrationController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Intake/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $user = UserRegistrationForm::from($request);
            $user = User::create($user->toArray());

            event(new Registered($user));

            Auth::login($user);

            return redirect(route('intake.participantRegister'));
        } catch (Throwable $e) {
            Log::error('Error processing participant signup form: '.$e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors([
                $e->getMessage(),
            ]);
        }
    }
}
