<?php

namespace Database\Seeders;

use App\Models\Participant;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Seeder;

class ParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users and Regions
        $users = User::all();
        $regions = Region::all();

        // Ensure we have users and regions before creating participants
        if ($users->isEmpty() || $regions->isEmpty()) {
            $this->command->info('Users or Regions are empty. Skipping Participant creation.');

            return;
        }

        // Create Participants using the recycle method
        Participant::factory()
            ->count(20)
            ->recycle($users)
            ->recycle($regions)
            ->create();
    }
}
