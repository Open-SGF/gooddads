<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ReportsController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->name('profile.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
});

Route::middleware(['auth'])->name('users.')->group(function () {
    Route::get('/users', [UsersController::class, 'list'])->name('list');
    Route::get('/users/create', [UsersController::class, 'create'])->name('create');
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
