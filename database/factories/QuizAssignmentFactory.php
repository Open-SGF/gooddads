<?php

namespace Database\Factories;

use App\Models\QuizQuestion;
use App\Models\QuizQuestionOption;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuizAssignment>
 */
class QuizAssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'user_id' => User::factory(),
            'quiz_question_id' => QuizQuestion::factory(),
            'quiz_question_option_id' => QuizQuestionOption::factory(),
            'response' => fake()->sentence(),
            'is_correct' => fake()->boolean(),
        ];
    }

    /**
     * Indicate that the answer is Correct
     */
    public function correctResponse(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_correct' => true,
        ]);
    }

    /**
     * Indicate that the response is Incorrect
     */
    public function incorrectResponse(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_correct' => false,
        ]);
    }
}
