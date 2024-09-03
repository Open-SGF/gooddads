<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\ModuleAssignment;
use Illuminate\Database\Seeder;

class ModuleAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Modules
        $modules = Module::all();

        // Ensure we have modules before creating assignments
        if ($modules->isEmpty()) {
            $this->command->info('No modules found. Skipping ModuleAssignment creation.');

            return;
        }

        // Create ModuleAssignments using the recycle method
        ModuleAssignment::factory()
            ->count(10)
            ->recycle($modules)
            ->create();

        // Optionally, create some assignments with specific event dates
        ModuleAssignment::factory()
            ->count(10)
            ->recycle($modules)
            ->eventDate(now()->addMonths(3)->toDateTimeString())
            ->create();

        ModuleAssignment::factory()
            ->count(10)
            ->recycle($modules)
            ->eventDate(now()->addMonths(6)->toDateTimeString())
            ->create();
    }
}
