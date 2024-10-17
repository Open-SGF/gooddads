<?php

namespace Database\Seeders;

use App\Models\ParticipantClass;
use App\Models\Region;
use Illuminate\Database\Seeder;

class ParticipantClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Regions
        $regions = Region::all();

        // Ensure we have regions before creating ParticipantClasses
        if ($regions->isEmpty()) {
            $this->command->info('No regions found. Skipping ParticipantClass creation.');

            return;
        }

        // Create ParticipantClasses using the recycle method
        ParticipantClass::factory()
            ->count(20)
            ->recycle($regions)
            ->create();
    }
}
