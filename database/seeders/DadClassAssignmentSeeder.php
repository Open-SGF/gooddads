<?php

namespace Database\Seeders;

use App\Models\DadClass;
use App\Models\DadClassAssignment;
use App\Models\User;
use Illuminate\Database\Seeder;

class DadClassAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users and DadClasses
        $users = User::all();
        $dadClasses = DadClass::all();

        // Ensure we have users and dad classes before creating assignments
        if ($users->isEmpty() || $dadClasses->isEmpty()) {
            $this->command->info('Users or DadClasses are empty. Skipping DadClassAssignment creation.');

            return;
        }

        // Create DadClassAssignments using recycle
        DadClassAssignment::factory()
            ->count(10)
            ->recycle($users)
            ->recycle($dadClasses)
            ->create();
    }
}
