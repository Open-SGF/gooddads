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
    $this->userAdmin = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Admin',
      'last_name' => 'User',
      'email' => 'admin@example.com',
      'password' => bcrypt('password123'),

    ])->assignRole('admin');

    $this->userAdmin = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Director',
      'last_name' => 'User',
      'email' => 'director@example.com',
      'password' => bcrypt('password123'),

    ])->assignRole('director');

    $this->userAdmin = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Region Director',
      'last_name' => 'User',
      'email' => 'region_director@example.com',
      'password' => bcrypt('password123'),

    ])->assignRole('region director');

    $this->userAdmin = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Facilitator',
      'last_name' => 'User',
      'email' => 'facilitator@example.com',
      'password' => bcrypt('password123'),

    ])->assignRole('facilitator');

    $this->userAdmin = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Auditor',
      'last_name' => 'User',
      'email' => 'auditor@example.com',
      'password' => bcrypt('password123'),

    ])->assignRole('auditor');

    $this->userAdmin = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Intake',
      'last_name' => 'User',
      'email' => 'intake@example.com',
      'password' => bcrypt('password123'),

    ])->assignRole('intake');

    $this->userParticipant = User::factory()->create([
      'id' => Str::uuid(),
      'first_name' => 'Participant',
      'last_name' => 'User',
      'email' => 'participant@example.com',
      'password' => bcrypt('password123'),
    ])->assignRole('participant');
  }
}
