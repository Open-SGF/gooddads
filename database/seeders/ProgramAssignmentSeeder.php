<?php

namespace Database\Seeders;

use App\Models\DadClass;
use App\Models\Program;
use App\Models\ProgramAssignment;
use Illuminate\Database\Seeder;

class ProgramAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Programs and DadClasses
        $programs = Program::all();
        $dadClasses = DadClass::all();

        // Ensure we have programs and dad classes before creating assignments
        if ($programs->isEmpty() || $dadClasses->isEmpty()) {
            $this->command->info('No programs or dad classes found. Skipping ProgramAssignment creation.');

            return;
        }

        // Create ProgramAssignments using the recycle method
        ProgramAssignment::factory()
            ->count(50)  // Adjust the count as needed
            ->recycle($programs)
            ->recycle($dadClasses)
            ->create();

        // Create some completed program assignments
        ProgramAssignment::factory()
            ->count(5)
            ->recycle($programs)
            ->recycle($dadClasses)
            ->completed()
            ->create();

        // Create some in-progress program assignments
        ProgramAssignment::factory()
            ->count(5)
            ->recycle($programs)
            ->recycle($dadClasses)
            ->inProgress()
            ->create();
    }
}
