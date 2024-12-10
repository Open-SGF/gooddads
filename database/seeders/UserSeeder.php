<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public User $userParticipant;

    public User $userAdmin;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->userParticipant = User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Participant',
            'last_name' => 'User',
            'email' => 'participant@example.com',
            'password' => bcrypt('password123'),
        ])->assignRole('Participant');

        $this->userAdmin = User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole('Admin');
    }
}
