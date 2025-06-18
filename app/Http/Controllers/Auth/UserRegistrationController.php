<?php

namespace App\Http\Controllers\Auth;

use App\Data\Forms\UserRegistrationForm;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Log;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Support\Transformation\TransformationContextFactory;
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
    public function store(UserRegistrationForm $request): RedirectResponse|JsonResponse
    {
        try {
            $user = User::create($request->all());

            if (! auth()->user()->hasRole('intake')) {
                return response()->json($user);
            }

            // Store the user ID in session
            session(['intake_user_id' => $user->id]);

            event(new Registered($user));

            return redirect(route('intake.participantRegister.create'));

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
