<?php

namespace Database\Seeders;

use App\Models\Dad;
use App\Models\ResponsibleParty;
use App\Models\ResponsiblePartyAssignment;
use App\Models\User;
use Illuminate\Database\Seeder;

class ResponsiblePartyAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users and Dads
        $reponsibleParty = ResponsibleParty::all();
        $dads = Dad::all();

        // Ensure we have responsible users and dads before creating assignments
        if ($reponsibleParty->isEmpty() || $dads->isEmpty()) {
            $this->command->info('Users or Dads are empty. Skipping ResponsiblePartyAssignment creation.');

            return;
        }

        // Create ResponsiblePartyAssignments using the recycle method
        ResponsiblePartyAssignment::factory()
            ->count(5)
            ->recycle($reponsibleParty)
            ->recycle($dads)
            ->create();

    }
}
