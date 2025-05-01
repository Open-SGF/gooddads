<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    public User $adminUser;

    public function run(): void
    {
        $this->adminUser = User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => env('ADMIN_FIRST_NAME'),
            'last_name' => env('ADMIN_LAST_NAME'),
            'email' => env('ADMIN_EMAIL'),
                'password' => bcrypt(env('ADMIN_PASSWORD')),
            ]
        );

        $this->adminUser->assignRole('admin');
    }
}
