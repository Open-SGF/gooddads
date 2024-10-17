<?php

namespace Database\Seeders;

use App\Models\Participant;
use App\Models\ResponsibleParty;
use App\Models\ResponsiblePartyAssignment;
use Illuminate\Database\Seeder;

class ResponsiblePartyAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users and Participants
        $responsibleParty = ResponsibleParty::all();
        $participants = Participant::all();

        // Ensure we have responsible users and participants before creating assignments
        if ($responsibleParty->isEmpty() || $participants->isEmpty()) {
            $this->command->info('User or Participant is empty. Skipping ResponsiblePartyAssignment creation.');

            return;
        }

        // Create ResponsiblePartyAssignments using the recycle method
        ResponsiblePartyAssignment::factory()
            ->count(5)
            ->recycle($responsibleParty)
            ->recycle($participants)
            ->create();

    }
}
