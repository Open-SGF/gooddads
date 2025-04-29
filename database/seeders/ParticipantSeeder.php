<?php

namespace Database\Seeders;

use App\Models\Participant;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = Region::all();

        // Ensure we have users and regions before creating participants
        if ($regions->isEmpty()) {
            $this->command->info('Regions are empty. Skipping Participant creation.');

            return;
        }

        // Create Participants using the recycle method
        Participant::factory()
            ->count(200)
            ->recycle($regions)
            ->create();

        $participantId = Str::uuid();
        User::factory()->create([
            'id' => $participantId,
            'first_name' => 'Participant',
            'last_name' => 'User',
            'email' => 'participant@example.com',
            'password' => bcrypt('password123'),
        ]);

        Participant::create([
            'user_id' => $participantId,
        ]);
    }
}
