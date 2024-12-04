<?php

namespace Database\Factories;

use App\Models\ParticipantClass;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProgramAssignment>
 */
class ProgramAssignmentFactory extends Factory
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
            'participant_class_id' => ParticipantClass::factory(),
            'start_date' => fake()->dateTimeBetween('-1 year', '+1 year'),
            'completed' => fake()->boolean(),
        ];
    }

    /**
     * Indicate that the program is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'completed' => true,
        ]);
    }

    /**
     * Indicate that the program is not completed.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'completed' => false,
        ]);
    }

    /**
     * Set a specific start date for the program assignment.
     */
    public function startingOn(string $date): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => $date,
        ]);
    }
}
