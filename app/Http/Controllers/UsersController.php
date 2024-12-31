<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function list(): Response
    {
        return Inertia::render('Users/List', [
            'users' => UserResource::collection(User::all()),
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
