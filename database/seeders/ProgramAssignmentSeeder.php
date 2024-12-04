<?php

namespace Database\Seeders;

use App\Models\ParticipantClass;
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
        // Fetch existing Programs and ParticipantClass
        $programs = Program::all();
        $participantClasses = ParticipantClass::all();

        // Ensure we have programs and participant classes before creating assignments
        if ($programs->isEmpty() || $participantClasses->isEmpty()) {
            $this->command->info('No programs or participant classes found. Skipping ProgramAssignment creation.');

            return;
        }

        // Create ProgramAssignments using the recycle method
        ProgramAssignment::factory()
            ->count(50)  // Adjust the count as needed
            ->recycle($programs)
            ->recycle($participantClasses)
            ->create();

        // Create some completed program assignments
        ProgramAssignment::factory()
            ->count(5)
            ->recycle($programs)
            ->recycle($participantClasses)
            ->completed()
            ->create();

        // Create some in-progress program assignments
        ProgramAssignment::factory()
            ->count(5)
            ->recycle($programs)
            ->recycle($participantClasses)
            ->inProgress()
            ->create();
    }
}
