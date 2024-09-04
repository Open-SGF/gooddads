<?php

namespace Database\Seeders;

use App\Models\DadClass;
use App\Models\Region;
use Illuminate\Database\Seeder;

class DadClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Regions
        $regions = Region::all();

        // Ensure we have regions before creating DadClasses
        if ($regions->isEmpty()) {
            $this->command->info('No regions found. Skipping DadClass creation.');

            return;
        }

        // Create DadClasses using the recycle method
        DadClass::factory()
            ->count(20)
            ->recycle($regions)
            ->create();
    }
}
