<?php

use App\Http\Controllers\Auth\UserRegistrationController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PdfController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('index');

Route::controller(LegalController::class)->group(function () {
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy')->breadcrumb('Privacy Policy', 'index');
    Route::get('/terms-of-service', 'termsOfService')->name('terms-of-service')->breadcrumb('Terms of Service', 'index');
});


Route::controller(UserRegistrationController::class)->group(function () {
    Route::get('register', 'create')->name('auth.register.create');
    Route::post('register', 'store')->name('auth.register.store');
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

    Route::get('/curriculum', [CurriculumController::class, 'list'])->name('curriculum.list');
    Route::get('/classes', [ClassesController::class, 'list'])->name('classes.list');
    Route::get('/reports', [ReportsController::class, 'list'])->name('reports.list');
});


// Route::get('/pdf-fake', [PdfController::class, 'generateFake'])
//     // ->middleware('auth')
//     ->name('test.pdf');

Route::get('/intake/{participantId}/pdf', [IntakeController::class, 'generatePdf']);



require __DIR__.'/auth.php';
