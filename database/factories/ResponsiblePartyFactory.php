<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ResponsibleParty>
 */
class ResponsiblePartyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'phone_number' => $this->faker->phoneNumber(),
            'role' => $this->faker->randomElement(['admin', 'director',  'region director', 'program director', 'auditor', 'intake']),
        ];
    }
}
