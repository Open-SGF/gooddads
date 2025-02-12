<?php

namespace App\Http\Controllers\Intake;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class IntakeController extends Controller
{
    public function index()
    {
        return Inertia::render('Intake/Index');
    }
}
