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
    [$column, $direction] = explode(',', $orderBy);
    $users = User::when($search, fn($query) => $query
      ->where('first_name', 'like', "%{$search}%"))
      ->orWhere('last_name', 'like', "%{$search}%")
      ->orWhere('email', 'like', "%{$search}%")
      ->orderBy($column, $direction)
      ->paginate($pageSize, $columns = ['*'], $pageName = 'users', $page);
    return Inertia::render('Users/UsersList', [
      'users' => UserResource::collection($users)->resolve(),
      'page' => $users->currentPage(),
      'pageSize' => $users->perPage(),
      'totalPages' => $users->lastPage(),
      'userCount' => $users->total(),
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
