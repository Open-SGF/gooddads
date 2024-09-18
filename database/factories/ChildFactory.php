<?php

namespace Database\Factories;

use App\Models\Dad;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Child>
 */
class ChildFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dad_id' => Dad::factory(),
            'name' => $this->faker->name(),
            'date_of_birth' => $this->faker->dateTimeBetween('-18 years', '-1 year')->format('Y-m-d'),
            'contact' => $this->faker->phoneNumber(),
            'child_support' => $this->faker->randomFloat(2, 50, 500),
        ];
    }

    /**
     * Change Date of Birth.
     */
    public function date_of_birth(string $date): static
    {
        return $this->state(fn (array $attributes) => [
            'date_of_birth' => $date,
        ]);
    }
}
