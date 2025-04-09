<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalController extends Controller
{
    public function privacyPolicy()
    {
        return Inertia::render('Legal/PrivacyPolicy');
    }

    public function termsOfService()
    {
        return Inertia::render('Legal/TermsOfService');
    }
}
