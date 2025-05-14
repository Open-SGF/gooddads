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
    public function show(User $user): Response
    {
        if (! auth()->user()->hasPermissionTo(Permissions::ViewUsers)) {
            abort(403, 'You do not have permission to view user details.');
        }

        return Inertia::render('Users/Show', [
            'user' => UserData::from($user),
        ]);
    }

    public function destroy(User $user): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::DeleteUsers)) {
            return back()->withErrors(['error' => 'You do not have permission to delete users.']);
        }
        if (auth()->id() === $user->id) {
            return back()->withErrors(['error' => 'You cannot delete your own account.']);
        }

        $user->delete();

        return redirect()->route('users.list')->with('toast', [
            'type' => 'success',
            'message' => "User {$user->first_name} {$user->last_name} was successfully deleted.",
        ]);
    }

    public function destroyMultiple(Request $request): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::DeleteUsers)) {
            return back()->withErrors(['error' => 'You do not have permission to delete users.']);
        }

        $userIds = $request->input('user_ids', []);

        if (empty($userIds)) {
            return back()->withErrors(['error' => 'No users specified for deletion.']);
        }

        // Prevent deleting your own account
        if (in_array(auth()->id(), $userIds)) {
            return back()->withErrors(['error' => 'You cannot delete your own account.']);
        }

        $users = User::whereIn('id', $userIds)->get();
        $count = $users->count();

        // Delete the users
        User::whereIn('id', $userIds)->delete();

        return back()->with('toast', [
            'type' => 'success',
            'message' => "{$count} ".($count === 1 ? 'user' : 'users').' successfully deleted.',
        ]);
    }

    public function create(): Response
    {
        if (! auth()->user()->hasPermissionTo(Permissions::CreateUsers)) {
            abort(403, 'You do not have permission to create users.');
        }

        return Inertia::render('Users/Create', [
            'roles' => Roles::cases(),
        ]);
    }

    public function edit(User $user): Response
    {
        if (! auth()->user()->hasPermissionTo(Permissions::EditUsers)) {
            abort(403, 'You do not have permission to edit users.');
        }

        return Inertia::render('Users/Edit', [
            'user' => UserData::from($user),
            'roles' => Roles::cases(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::CreateUsers)) {
            return back()->withErrors(['error' => 'You do not have permission to create users.']);
        }

        $request->validate($this->userValidationRules);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'active' => $request->active,
        ]);

        $user->syncRoles($request->roles);

        return redirect()->route('users.list')->with('toast', [
            'type' => 'success',
            'message' => "User {$user->first_name} {$user->last_name} was successfully created.",
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        if (! auth()->user()->hasPermissionTo(Permissions::EditUsers)) {
            return back()->withErrors(['error' => 'You do not have permission to edit users.']);
        }

        $rules = $this->userValidationRules;
        $rules['email'] = ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)];
        $rules['password'] = ['nullable', Rules\Password::defaults()];

        $request->validate($rules);

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'active' => $request->active,
        ]);

        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        $user->syncRoles($request->roles);

        return redirect()->route('users.list')->with('toast', [
            'type' => 'success',
            'message' => "User {$user->first_name} {$user->last_name} was successfully updated.",
        ]);
    }
}
