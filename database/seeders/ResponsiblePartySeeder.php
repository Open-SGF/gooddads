<?php

namespace Database\Seeders;

use App\Models\ResponsibleParty;
use App\Models\User;
use Illuminate\Database\Seeder;

class ResponsiblePartySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users 
        $users = User::all();

        // Ensure we have users before creating responsible parties
        if ($users->isEmpty()) {
            $this->command->info('Users are empty. Skipping ResponsibleParty creation.');
            return;
        }

        // Ensure we have at least one of each role
        $roles = [
            'admin',
            'auditor',
            'director',
            'intake',
            'programDirector',
            'regionDirector',
        ];
        foreach ($roles as $role) {
            ResponsibleParty::factory()
                ->state([
                    'role' => $role,
                    'user_id' => $users->random()->id
                    ])
                ->create();
        }

         // Create a specified number of ResponsibleParty instances
         ResponsibleParty::factory()
         ->count(10)
         ->recycle($users)
         ->create();

    }
}
