<?php

use App\Http\Controllers\Auth\UserRegistrationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Intake\IntakeController;
use App\Http\Controllers\Intake\DisclosureAuthorizationController;
use App\Http\Controllers\Intake\FatherhoodAssessmentController;
use App\Http\Controllers\Intake\MediaReleaseController;
use App\Http\Controllers\Intake\ParticipantRegistrationController;
use App\Http\Controllers\Intake\ParticipantServicePlanController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('index');

Route::controller(LegalController::class)->group(function () {
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy')->breadcrumb('Privacy Policy', 'index');
    Route::get('/terms-of-service', 'termsOfService')->name('terms-of-service')->breadcrumb('Terms of Service', 'index');
});

Route::middleware('auth')->group(function () {
    Route::name('profile.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('edit')->breadcrumb('Profile', 'index');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::name('users.')->group(function () {
        Route::get('/users', [UsersController::class, 'list'])->name('list')->breadcrumb('Users', 'index');
        Route::get('/users/create', [UsersController::class, 'create'])->name('create')->breadcrumb('Create User', 'users.list');
        Route::get('/users/{user}', [UsersController::class, 'show'])->name('show')->breadcrumb(fn ($user) => "$user->first_name $user->last_name", 'users.list');
        Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('edit')->breadcrumb(fn ($user) => "Edit $user->first_name $user->last_name", 'users.list');
        Route::post('/users', [UsersController::class, 'store'])->name('store');
        Route::put('/users/{user}', [UsersController::class, 'update'])->name('update');
        Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('destroy');
        Route::delete('/users', [UsersController::class, 'destroyMultiple'])->name('destroyMultiple');
    });
});

Route::middleware(['auth', 'role:intake'])
    ->name('intake.')
    ->group(function () {
        Route::get('/dev-auth', [IntakeController::class, 'devAuth']);
        Route::get('/intake-complete', [IntakeController::class, 'intakeComplete'])->name('complete');

        Route::controller(UserRegistrationController::class)->group(function () {
            Route::get('register', 'create')->name('register.create');
            Route::post('register', 'store')->name('register.store');
        });

        Route::controller(ParticipantRegistrationController::class)->group(function () {
            Route::get('participantRegister', 'create')->name('participantRegister.create');
            Route::post('participantRegister', 'store')->name('participantRegister.store');
        });

        Route::controller(DisclosureAuthorizationController::class)->group(function () {
            Route::get('disclosure', 'create')->name('disclosure.create');
            Route::post('disclosure', 'store')->name('disclosure.store');
        });

        Route::controller(FatherhoodAssessmentController::class)->group(function () {
            Route::get('fatherhoodAssessment', 'create')->name('fatherhoodAssessment.create');
            Route::post('fatherhoodAssessment', 'store')->name('fatherhoodAssessment.store');
        });

        Route::controller(ParticipantServicePlanController::class)->group(function () {
            Route::get('servicePlan', 'create')->name('servicePlan.create');
            Route::post('servicePlan', 'store')->name('servicePlan.store');
        });

        Route::controller(MediaReleaseController::class)->group(function () {
            Route::get('mediaRelease', 'create')->name('mediaRelease.create');
            Route::post('mediaRelease', 'store')->name('mediaRelease.store');
        });
    });

require __DIR__.'/auth.php';
