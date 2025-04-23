<?php

use App\Http\Controllers\ClassesController;
use App\Http\Controllers\CurriculumController;
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
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use App\Models\ParticipantFatherhoodAssesment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Auth::check()
        ? Inertia::render('Dashboard')
        : Inertia::render('Auth/Login');
})->name('home');

Route::controller(LegalController::class)->group(function () {
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
    Route::get('/terms-of-service', 'termsOfService')->name('terms-of-service');
});

Route::middleware('auth')->name('profile.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
});

Route::middleware(['auth'])->name('users.')->group(function () {
    Route::get('/users', [UsersController::class, 'list'])->name('list');
    Route::get('/users/create', [UsersController::class, 'create'])->name('create');
});

Route::name('intake.')
    ->prefix('intake')
    ->group(function () {
        Route::get('/dev-auth', [IntakeController::class, 'devAuth']);
        Route::get('/intake-complete', [IntakeController::class, 'intakeComplete'])->name('complete');

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
Route::middleware(['auth'])->group(function () {
    Route::get('/curriculum', [UsersController::class, 'list'])->name('curriculum.list');
});
Route::middleware(['auth'])->name('curriculum.')->group(function () {
    Route::get('/curriculum', [CurriculumController::class, 'list'])->name('list');
});

Route::middleware(['auth'])->name('classes.')->group(function () {
    Route::get('/classes', [ClassesController::class, 'list'])->name('list');
});

Route::middleware(['auth'])->name('reports.')->group(function () {
    Route::get('/reports', [ReportsController::class, 'list'])->name('list');
});

require __DIR__.'/auth.php';
