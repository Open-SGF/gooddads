<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public User $userExample;

    public User $userAdmin;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create user
        $this->userExample = User::factory()->create([
            'name' => 'Example User',
            'email' => 'test@example.com',
        ]);

        $this->userAdmin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
    }
}
