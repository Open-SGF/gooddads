<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

// use App\Models\Report;

class ReportsController extends Controller
{
    // public function __construct()
    // {
    //     // Restrict access to users with specific roles
    //     $this->middleware(['auth', 'role:auditor|case_manager|director|region_director|admin']);
    // }

    /**
     * Display a list of reports.
     */
    public function list(Request $request): Response
    {
        // Authorization check
        // if (!Gate::allows('view-reports')) {
        //     abort(403, 'Unauthorized action.');
        // }

        $search = $request->query('search');
        $pageSize = $request->query('pageSize', 10);
        $sort = $request->query('sort', 'created_at,desc');
        [$column, $direction] = explode(',', $sort);

        // Fetch reports based on filters and sorting
        // $reports = Report::when($search, fn($query) => $query
        //         ->where('title', 'like', "%$search%")
        //         ->orWhere('description', 'like', "%$search%"))
        //     ->orderBy($column, $direction)
        //     ->paginate($pageSize);

        return Inertia::render('Reports/List', [
            'reports' => [],
        ]);
    }

    /**
     * Show a specific report.
     */
    public function show(Report $report): Response
    {
        if (! Gate::allows('view-reports')) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Reports/Show', [
            'report' => $report,
        ]);
    }

    /**
     * Download the report.
     */
    public function download(Report $report)
    {
        if (! Gate::allows('download-reports')) {
            abort(403, 'Unauthorized action.');
        }

        return response()->download(storage_path("app/reports/{$report->file_path}"));
    }
}
