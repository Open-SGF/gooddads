<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Program;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Programs
        $programs = Program::all();

        // Ensure we have programs before creating modules
        if ($programs->isEmpty()) {
            $this->command->info('No programs found. Skipping Module creation.');

            return;
        }

        // Create Modules using the recycle method
        Module::factory()
            ->count(15)
            ->recycle($programs)
            ->create();
    }
}
