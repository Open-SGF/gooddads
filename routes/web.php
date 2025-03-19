<?php

use App\Http\Controllers\Intake\IntakeController;
use App\Http\Controllers\Intake\ParticipantDisclosureController;
use App\Http\Controllers\Intake\ParticipantRegistrationController;
use App\Http\Controllers\Intake\ParticipantSignupController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;

Route::get('/', function () {
    return Auth::check()
        ? Inertia::render('Dashboard')
        : Inertia::render('Auth/Login');
})->name('home');

Route::controller(LegalController::class)->group(function () {
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
    Route::get('/terms-of-service', 'termsOfService')->name('terms-of-service');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/users', [UsersController::class, 'list'])->name('users.list');
    Route::get('/users/create', [UsersController::class, 'create'])->name('users.create');
});

Route::name('intake.')
    ->prefix('intake')
    ->group(function () {
        Route::middleware(['role:intake'])->group(function () {
            Route::get('/', [IntakeController::class, 'index'])->name('index');
            Route::get('register', [ParticipantRegistrationController::class, 'create'])->name('register');
            Route::post('register', [ParticipantRegistrationController::class, 'store']);
        });

        Route::middleware('role:participant')->group(function () {
            Route::get('signup', [ParticipantSignupController::class, 'create'])->name('signup');
            Route::post('signup', [ParticipantSignupController::class, 'store']);
        });

        Route::middleware('role:participant')
            ->name('disclosure.')
            ->prefix('disclosure')
            ->controller(ParticipantDisclosureController::class)
            ->group(function () {
                Route::get('/',  'create')->name('index');
                Route::get('/',  'create')->name('create');
                Route::post('/',  'store')->name('store');
                Route::get('/edit', 'edit')->name('edit');
                Route::match(['put', 'patch'], '{disclosureAuthorization}', 'update')->name('update');
        });

        Route::middleware('role:participant')
            ->name('fatherhood-assessment.')
            ->prefix('fatherhood-assessment.')
            ->group(function () {
                Route::get('/', [ParticipantDisclosureController::class, 'create'])->name('index');
                Route::get('/', [ParticipantDisclosureController::class, 'create'])->name('create');
                Route::post('/', [ParticipantDisclosureController::class, 'store'])->name('store');
                Route::get('edit', [ParticipantDisclosureController::class, 'edit'])->name('edit');
                Route::match(['put', 'patch'],'{id}', [ParticipantDisclosureController::class, 'update'])->name('update');
        });

    });

require __DIR__.'/auth.php';
