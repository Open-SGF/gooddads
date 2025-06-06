<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::Admin);

        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Director',
            'last_name' => 'User',
            'email' => 'director@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::Director);

        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Region Director',
            'last_name' => 'User',
            'email' => 'region_director@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::RegionDirector);

        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Program Director',
            'last_name' => 'User',
            'email' => 'program_director@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::ProgramDirector);

        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Facilitator',
            'last_name' => 'User',
            'email' => 'facilitator@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::Facilitator);

        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Auditor',
            'last_name' => 'User',
            'email' => 'auditor@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::Auditor);

        User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Intake',
            'last_name' => 'User',
            'email' => 'intake@example.com',
            'password' => bcrypt('password123'),

        ])->assignRole(Roles::Intake);
    }
}
