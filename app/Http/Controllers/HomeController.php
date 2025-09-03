<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        if (! Auth::check()) {
            return Inertia::render('Auth/Login');
        }

        return Inertia::render('Dashboard');
    }
}
