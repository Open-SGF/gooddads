<?php

use App\Http\Controllers\Auth\UserRegistrationController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\Intake\IntakeController;
use App\Http\Controllers\Intake\ParticipantDisclosureController;
use App\Http\Controllers\Intake\ParticipantFatherhoodAssessmentController;
use App\Http\Controllers\Intake\ParticipantFatherhoodSurveyController;
use App\Http\Controllers\Intake\ParticipantMediaReleaseController;
use App\Http\Controllers\Intake\ParticipantRegistrationController;
use App\Http\Controllers\Intake\ParticipantServicePlanController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Auth::check()
        ? Auth::user()->hasRole('intake') ?
            Inertia::render('Intake/Register') :
            Inertia::render('Dashboard')
        : Inertia::render('Auth/Login');
})->name('home')->breadcrumb('Home');

Route::controller(LegalController::class)->group(function () {
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy')->breadcrumb('Privacy Policy', 'home');
    Route::get('/terms-of-service', 'termsOfService')->name('terms-of-service')->breadcrumb('Terms of Service', 'home');
});

Route::middleware('auth')->name('profile.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
});

Route::middleware(['auth'])->name('users.')->group(function () {
    Route::get('/users', [UsersController::class, 'list'])->name('list')->breadcrumb('Users', 'home');
    Route::get('/users/create', [UsersController::class, 'create'])->name('create')->breadcrumb('Create User', 'users.list');
    Route::post('/users', [UsersController::class, 'store'])->name('store');
    Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('edit')->breadcrumb(fn ($user) => "Edit $user->first_name $user->last_name", 'users.list');
    Route::put('/users/{user}', [UsersController::class, 'update'])->name('update');
    Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('destroy');
    Route::delete('/users', [UsersController::class, 'destroyMultiple'])->name('destroyMultiple');
    Route::get('/users/{user}', [UsersController::class, 'show'])->name('show')->breadcrumb(fn ($user) => "$user->first_name $user->last_name", 'users.list');
});

Route::name('intake.')
    ->middleware(['auth', 'role:intake'])
    ->prefix('intake')
    ->group(function () {
        Route::get('/dev-auth', [IntakeController::class, 'devAuth']);
        Route::get('/intake-complete', [IntakeController::class, 'intakeComplete'])->name('complete');

        Route::get('/', [IntakeController::class, 'index'])->name('index');

        Route::get('register', [UserRegistrationController::class, 'create'])->name('register');
        Route::post('register', [UserRegistrationController::class, 'store'])->name('register');

        Route::get('participantRegister', [ParticipantRegistrationController::class, 'index'])->name('participantRegister');
        Route::post('participantRegister', [ParticipantRegistrationController::class, 'store'])->name('participantRegister');

        Route::get('disclosure', [ParticipantDisclosureController::class, 'index'])->name('disclosure');
        Route::post('disclosure', [ParticipantDisclosureController::class, 'store'])->name('disclosure');

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
    Route::get('/curriculum', [CurriculumController::class, 'list'])->name('list')->breadcrumb('Curriculum', 'home');
});

Route::middleware(['auth'])->name('classes.')->group(function () {
    Route::get('/classes', [ClassesController::class, 'list'])->name('list')->breadcrumb('Classes', 'home');
});

Route::middleware(['auth'])->name('reports.')->group(function () {
    Route::get('/reports', [ReportsController::class, 'list'])->name('list')->breadcrumb('Reports', 'home');
});

require __DIR__.'/auth.php';

Route::get('/xdebug', function () {
    xdebug_info();
});
