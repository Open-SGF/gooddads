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
        $regionId = Region::where('description', 'Springfield, MO')->first()->id;
        User::factory()->create([
            'id' => $participantId,
            'first_name' => 'Participant',
            'last_name' => 'User',
            'email' => 'participant@example.com',
            'password' => bcrypt('password123'),
        ]);

        Participant::create([
            'user_id' => $participantId,
            'region_id' => $regionId,
            'address_line_1' => '123 Main St',
            'address_line_2' => 'Apt 1',
            'city' => 'Anytown',
            'state' => 'CA',
            'zipcode' => '12345',
            'employer' => 'Example Company',
            'home_phone_number' => '123-456-7890',
            'work_phone_number' => '987-654-3210',
            'cell_phone_number' => '555-555-5555',
            'alt_contact_number' => '555-555-5555',
            'marital_status' => 'single',
            'ethnicity' => 'hispanic',
            'monthly_child_support' => 100,
            't_shirt_size' => 'L',
            'intake_date' => now(),

        ]);
    }
}
