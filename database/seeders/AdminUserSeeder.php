<?php

namespace Database\Seeders;

use App\Data\Forms\UserRegistrationForm;
use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.admin.firstName'),
            'lastName' => config('constants.testUsers.admin.lastName'),
            'email' => config('constants.testUsers.admin.email'),
            'phoneNumber' => config('constants.testUsers.admin.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.admin.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.admin.password')),
            'role' => Roles::Admin,
        ]);

        User::create($user->toArray());
    }
}
