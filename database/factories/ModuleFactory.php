<?php

namespace Database\Factories;

use App\Models\Program;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Module>
 */
class ModuleFactory extends Factory
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
            'program_id' => Program::factory(),
            'quiz_id' => Quiz::factory(),
            'description' => fake()->sentence(),
        ];
    }
}
