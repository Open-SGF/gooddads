<?php

namespace App\Http\Controllers;

use App\Data\UserData;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function list(Request $request): Response
    {
        $page = intval($request->get('page', 1) ?: 1);
        $search = $request->query('search');
        $pageSize = $request->query('pageSize', '10');
        $sort = $request->query('sort', 'first_name,asc');
        [$column, $direction] = explode(',', $sort);
        $filters = $request->query('filters', '');
        $users = User::when($search, fn ($query) => $query
            ->where('first_name', 'like', "%$search%")->orWhere('last_name', 'like', "%$search%")->orWhere('email', 'like', "%$search%"))
            ->when($filters, fn ($query) => $query->where(fn ($query) => collect(explode(',', $filters))
                ->map(fn ($filter) => explode('=', $filter))
                ->each(fn ($filter) => $query->where($filter[0], 'like', "%$filter[1]%")))
            )
            ->orderBy($column, $direction)
            ->paginate($pageSize, ['*'], 'users', $page);

        return Inertia::render('Users/List', [
            'users' => UserData::collect($users)->values(),
            'page' => $users->currentPage(),
            'pageSize' => $users->perPage(),
            'totalPages' => $users->lastPage(),
            'count' => $users->total(),
        ]);
    }

    //    public function show(User $user): Response
    //    {
    //        return Inertia::render('Users/Show', [
    //            'user' => new UserResource($user),
    //        ]);
    //    }
    //
    //    public function edit(User $user): Response
    //    {
    //        return Inertia::render('Users/Edit', [
    //            'user' => new UserResource($user),
    //        ]);
    //    }
    //
    //    public function update(User $user): Response
    //    {
    //        $user->update(
    //            request()->validate([
    //                'name' => ['required', 'max:50'],
    //                'email' => ['required', 'email'],
    //            ])
    //        );
    //
    //        return redirect()->route('users.index');
    //    }
    //
    //    public function destroy(User $user)
    //    {
    //        $user->delete();
    //
    //        return redirect()->route('users.index');
    //    }

    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }
}
