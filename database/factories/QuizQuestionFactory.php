<?php

namespace Database\Factories;

use App\Enums\QuizQuestionType;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuizQuestion>
 */
class QuizQuestionFactory extends Factory
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
            'quiz_id' => Quiz::factory(),
            'question' => fake()->sentence(6, true).'?',
            'type' => fake()->randomElement(QuizQuestionType::cases()),
        ];
    }
}
