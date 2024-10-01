<?php

namespace Database\Seeders;

use App\Models\QuizAssignment;
use App\Models\QuizQuestion;
use App\Models\QuizQuestionOption;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuizAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing Users, QuizQuestions, and QuizQuestionOptions
        $users = User::all();
        $quizQuestions = QuizQuestion::all();
        $quizQuestionOptions = QuizQuestionOption::all();

        // Ensure we have users, quiz questions, and options before creating assignments
        if ($users->isEmpty() || $quizQuestions->isEmpty() || $quizQuestionOptions->isEmpty()) {
            $this->command->info('Users, quiz questions, or quiz question options are empty. Skipping QuizAssignment creation.');

            return;
        }

        // Create QuizAssignments using the recycle method
        QuizAssignment::factory()
            ->count(20)
            ->recycle($users)
            ->recycle($quizQuestions)
            ->recycle($quizQuestionOptions)
            ->create();

        // create some correct responses
        QuizAssignment::factory()
            ->count(5)
            ->recycle($users)
            ->recycle($quizQuestions)
            ->recycle($quizQuestionOptions)
            ->correctResponse()
            ->create();

        //  some incorrect responses
        QuizAssignment::factory()
            ->count(5)
            ->recycle($users)
            ->recycle($quizQuestions)
            ->recycle($quizQuestionOptions)
            ->incorrectResponse()
            ->create();
    }
}
