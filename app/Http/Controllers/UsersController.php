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
    $users = User::all();
    $userCount = $users->count();
    $pageSize = 10;
    $paginatedUsers = $users->forPage($page, $pageSize);
    return Inertia::render('Users/List', [
      'users' => UserResource::collection($paginatedUsers),
      'page' => $page,
      'pageSize' => $pageSize,
      'totalPages' => ceil($userCount / $pageSize),
      'userCount' => $userCount,
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
