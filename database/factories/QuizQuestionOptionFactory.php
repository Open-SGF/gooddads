<?php

namespace Database\Factories;

use App\Models\QuizQuestion;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuizQuestionOption>
 */
class QuizQuestionOptionFactory extends Factory
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
        'quiz_question_id' => QuizQuestion::factory(),
            'answer' => fake()->sentence(),
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
