<?php

namespace Database\Factories;

use App\Services\Formatter\PhoneFormatter;
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
        $phoneNumber = PhoneFormatter::format($this->faker->phoneNumber());

        return [
            'id' => $this->faker->uuid(),
            'phone_number' => $phoneNumber,
            'role' => $this->faker->randomElement(['admin', 'director',  'region director', 'program director', 'auditor', 'intake']),
        ];
    }
}
