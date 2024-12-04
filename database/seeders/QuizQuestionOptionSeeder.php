<?php

namespace Database\Seeders;

use App\Models\QuizQuestion;
use App\Models\QuizQuestionOption;
use Illuminate\Database\Seeder;

class QuizQuestionOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing QuizQuestions
        $quizQuestions = QuizQuestion::all();

        // Ensure we have quiz questions before creating options
        if ($quizQuestions->isEmpty()) {
            $this->command->info('No quiz questions found. Skipping QuizQuestionOption creation.');

            return;
        }

        // Create options for each quiz question
        foreach ($quizQuestions as $quizQuestion) {
            // Create one correct option
            QuizQuestionOption::factory()
                ->count(1)
                ->for($quizQuestion)
                ->correctResponse()
                ->create();

            // Create three incorrect options
            QuizQuestionOption::factory()
                ->count(3)
                ->for($quizQuestion)
                ->incorrectResponse()
                ->create();
        }
    }
}
