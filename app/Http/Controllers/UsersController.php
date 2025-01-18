<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
  public function list(Request $request): Response
  {
    // get page url param
    $page = intval($request->get('page', 1) ?: 1);
    $search = $request->query('search');
    $pageSize = $request->query('pageSize', 10);
    $orderBy = $request->query('orderBy', 'first_name,ASC');
    $filters = $request->query('filters', '');
//    dd($filters);
    [$column, $direction] = explode(',', $orderBy);
    $users = User::when($search, fn($query) => $query
      ->where('first_name', 'like', "%$search%")->orWhere('last_name', 'like', "%$search%")->orWhere('email', 'like', "%$search%"))
      // filter by filters query where the url looks like http://localhost/users?filters=first_name%3DAdmin%2Clast_name%3DUser. Use a like match and require that all filters match
      ->when($filters, fn($query) => $query->where(fn($query) => collect(explode(',', $filters))
        ->map(fn($filter) => explode('=', $filter))
        ->each(fn($filter) => $query->where($filter[0], 'like', "%$filter[1]%")))
      )
      ->orderBy($column, $direction)
      ->paginate($pageSize, ['*'], 'users', $page);
    return Inertia::render('Users/List', [
      'users' => UserResource::collection($users)->resolve(),
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
