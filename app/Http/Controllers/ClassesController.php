<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassesController extends Controller
{
    /**
     * Display a list of classes.
     */
    public function list(Request $request): Response
    {
        $search = $request->query('search');
        $pageSize = $request->query('pageSize', 10);
        $sort = $request->query('sort', 'created_at,desc');
        [$column, $direction] = explode(',', $sort);

        return Inertia::render('Classes/List', [
            'classes' => [],
        ]);
    }
}
