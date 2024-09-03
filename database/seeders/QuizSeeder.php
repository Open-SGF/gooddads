<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Modules
        $modules = Module::all();

        // Ensure we have modules before creating quizzes
        if ($modules->isEmpty()) {
            $this->command->info('No modules found. Skipping Quiz creation.');

            return;
        }

        // Create quizzes for each module
        foreach ($modules as $module) {
            Quiz::factory()
                ->count(rand(1, 3))  // Create 1 to 3 quizzes per module
                ->for($module)
                ->create();
        }
    }
}
