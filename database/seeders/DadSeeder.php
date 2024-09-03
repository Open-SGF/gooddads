<?php

namespace Database\Seeders;

use App\Models\Dad;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Seeder;

class DadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users and Regions
        $users = User::all();
        $regions = Region::all();

        // Ensure we have users and regions before creating dads
        if ($users->isEmpty() || $regions->isEmpty()) {
            $this->command->info('Users or Regions are empty. Skipping Dad creation.');

            return;
        }

        // Create Dads using the recycle method
        Dad::factory()
            ->count(50)  // Adjust the count as needed
            ->recycle($users)
            ->recycle($regions)
            ->create();
    }
}
