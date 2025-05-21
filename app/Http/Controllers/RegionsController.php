<?php

namespace App\Http\Controllers;

use App\Data\RegionData;
use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Database\QueryException;
use Exception;

class RegionsController extends Controller
{
    private array $regionValidationRules;

    public function __construct()
    {
        $this->regionValidationRules = [
            'description' => ['required', 'string', 'max:255'],
        ];
    }

    public function list(Request $request): Response
    {
        $page = intval($request->get('page', 1) ?: 1);
        $search = $request->query('search');
        $pageSize = $request->query('pageSize', '10');
        $sort = $request->query('sort', 'description,asc');
        [$column, $direction] = explode(',', $sort);
        $filters = $request->query('filters', '');
        $regions = Region::when($search, fn ($query) => $query
            ->where('description', 'like', "%$search%"))
            ->when($filters, fn ($query) => $query->where(fn ($query) => collect(explode(',', $filters))
                ->map(fn ($filter) => explode('=', $filter))
                ->each(fn ($filter) => $query->where($filter[0], 'like', "%$filter[1]%")))
            )
            ->orderBy($column, $direction)
            ->paginate($pageSize, ['*'], 'users', $page);

        return Inertia::render('Regions/List', [
            'regions' => RegionData::collect($regions)->values(),
            'page' => $regions->currentPage(),
            'pageSize' => $regions->perPage(),
            'totalPages' => $regions->lastPage(),
            'count' => $regions->total(),
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(Region $region): Response
    {
        if (! auth()->user()->hasPermissionTo(Permissions::ViewRegions)) {
            abort(403, 'You do not have permission to view region details.');
        }

        return Inertia::render('Regions/Show', [
            'region' => RegionData::from($region),
        ]);
    }

    public function destroy(Region $region): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::DeleteRegions)) {
            return back()->withErrors(['error' => 'You do not have permission to delete regions.']);
        }

        try {
            $region->delete();
            return redirect()->route('regions.list')->with('toast', [
                'type' => 'success',
                'message' => "Region {$region->description} was successfully deleted.",
            ]);
        } catch (QueryException $e) {

            // Check if it's a foreign key constraint error
            if ($e->getCode() == "23000") {
                
                return back()->withErrors(['error' => "Cannot delete region '{$region->description}' because it is being used by participants."]);
            }    
            
            // For other database errors
            return back()->withErrors(['error' => "An error occurred while deleting the region: {$e->getMessage()}"]);
        } catch (Exception $e) {
            // Catch any other exceptions
            return back()->withErrors(['error' => "An unexpected error occurred: {$e->getMessage()}"]);
        }
    }

    public function destroyMultiple(Request $request): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::DeleteRegions)) {
            return back()->withErrors(['error' => 'You do not have permission to delete regions.']);
        }

        $regionIds = $request->input('region_ids', []);

        if (empty($regionIds)) {
            return back()->withErrors(['error' => 'No regions specified for deletion.']);
        }

        $regions = Region::whereIn('id', $regionIds)->get();
        $count = $regions->count();

        foreach($regions as $region) {

            try {
                $region->delete();
            } catch (QueryException $e) {

                // Check if it's a foreign key constraint error
                if ($e->getCode() == "23000") {                    
                    return back()->withErrors(['error' => "Cannot delete region '{$region->description}' because it is being used by participants."]);
                }    
                
                // For other database errors
                return back()->withErrors(['error' => "An error occurred while deleting the region: {$e->getMessage()}"]);
            } catch (Exception $e) {
                // Catch any other exceptions
                return back()->withErrors(['error' => "An unexpected error occurred: {$e->getMessage()}"]);
            }
        }

        return back()->with('toast', [
                'type' => 'success',
                'message' => "{$count} ".($count === 1 ? 'region' : 'regions').' successfully deleted.',
            ]);
    }

    public function create(): Response
    {
        if (! auth()->user()->hasPermissionTo(Permissions::CreateRegions)) {
            abort(403, 'You do not have permission to create regions.');
        }

        return Inertia::render('Regions/Create');
    }

    public function edit(Region $region): Response
    {
        if (! auth()->user()->hasPermissionTo(Permissions::EditRegions)) {
            abort(403, 'You do not have permission to edit regions.');
        }

        return Inertia::render('Regions/Edit', [
            'region' => RegionData::from($region),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::CreateRegions)) {
            return back()->withErrors(['error' => 'You do not have permission to create regions.']);
        }

        $request->validate($this->regionValidationRules);

        $region = Region::create([
            'description' => $request->description,
        ]);

        return redirect()->route('regions.list')->with('toast', [
            'type' => 'success',
            'message' => "Region {$region->description} was successfully created.",
        ]);
    }

    public function update(Request $request, Region $region): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::EditRegions)) {
            return back()->withErrors(['error' => 'You do not have permission to edit regions.']);
        }

        $rules = $this->regionValidationRules;
        $rules['description'] = ['required', 'string'];
        
        $request->validate($rules);

        $region->update([
            'description' => $request->description,
        ]);

        return redirect()->route('regions.list')->with('toast', [
            'type' => 'success',
            'message' => "Region {$region->description} was successfully updated.",
        ]);
    }
}
