<?php

use App\Http\Controllers\Intake\IntakeController;
use App\Http\Controllers\Intake\ParticipantDisclosureController;
use App\Http\Controllers\Intake\ParticipantFatherhoodAssessmentController;
use App\Http\Controllers\Intake\ParticipantFatherhoodSurveyController;
use App\Http\Controllers\Intake\ParticipantMediaReleaseController;
use App\Http\Controllers\Intake\ParticipantRegistrationController;
use App\Http\Controllers\Intake\ParticipantServicePlanController;
use App\Http\Controllers\Intake\ParticipantSignupController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use App\Models\ParticipantFatherhoodAssesment;
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
            ->resource('disclosure', ParticipantDisclosureController::class)
            ->parameter('disclosure', 'disclosureAuthorization');

        Route::middleware('role:participant')
            ->resource('fatherhood-assessment', ParticipantFatherhoodAssessmentController::class)
            ->parameter('fatherhood-assessment', 'fatherhoodAssessment');

        Route::middleware('role:participant')
            ->resource('fatherhood-survey', ParticipantFatherhoodSurveyController::class)
            ->parameter('fatherhood-survey', 'fatherhoodSurvey');

        Route::middleware('role:participant')
            ->resource('service-plan', ParticipantServicePlanController::class)
            ->parameter('service-plan', 'servicePlan');

        Route::middleware('role:participant')
            ->resource('media-release', ParticipantMediaReleaseController::class)
            ->parameter('media-release', 'mediaRelease');



    });

require __DIR__.'/auth.php';
