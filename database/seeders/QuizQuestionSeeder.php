<?php

namespace Database\Seeders;

use App\Enums\QuizQuestionType;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use Illuminate\Database\Seeder;

class QuizQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Quizzes
        $quizzes = Quiz::all();

        // Ensure we have quizzes before creating questions
        if ($quizzes->isEmpty()) {
            $this->command->info('No quizzes found. Skipping QuizQuestion creation.');

            return;
        }

        // Create questions for each quiz
        foreach ($quizzes as $quiz) {
            // Create multiple choice questions
            QuizQuestion::factory()
                ->count(3)
                ->for($quiz)
                ->state(['type' => QuizQuestionType::MultipleChoice])
                ->create();

            // Create true/false questions
            QuizQuestion::factory()
                ->count(2)
                ->for($quiz)
                ->state(['type' => QuizQuestionType::True_False])
                ->create();

            // Create open-ended questions
            QuizQuestion::factory()
                ->count(1)
                ->for($quiz)
                ->state(['type' => QuizQuestionType::ShortAnswer])
                ->create();
        }
    }
}
