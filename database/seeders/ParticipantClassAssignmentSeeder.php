<?php

namespace Database\Seeders;

use App\Models\ParticipantClass;
use App\Models\ParticipantClassAssignment;
use App\Models\User;
use Illuminate\Database\Seeder;

class ParticipantClassAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users and ParticipantClasses
        $users = User::all();
        $participantClasses = ParticipantClass::all();

        // Ensure we have users and participant classes before creating assignments
        if ($users->isEmpty() || $participantClasses->isEmpty()) {
            $this->command->info('User or ParticipantClass are empty. Skipping ParticipantClassAssignment creation.');

            return;
        }

        // Create ParticipantClassAssignment using recycle
        ParticipantClassAssignment::factory()
            ->count(10)
            ->recycle($users)
            ->recycle($participantClasses)
            ->create();
    }
}
