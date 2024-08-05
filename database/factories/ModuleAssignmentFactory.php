<?php

namespace Database\Factories;

use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ModuleAssignment>
 */
class ModuleAssignmentFactory extends Factory
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
            'module_id' => Module::factory(),
            'event_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'description' => fake()->sentence(),
        ];
    }

    /**
     * Set a specific start date for the module assignment.
     */
    public function eventDate(string $date): static
    {
        return $this->state(fn (array $attributes) => [
            'event_date' => $date,
        ]);
    }
}
