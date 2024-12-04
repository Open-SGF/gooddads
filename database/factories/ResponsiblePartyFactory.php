<?php

namespace Database\Factories;

use App\Models\User;
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
            'user_id' => User::factory(),
            'phone_number' => $phoneNumber,
            'role' => $this->faker->randomElement([
                'admin',
                'auditor',
                'director',
                'intake',
                'programDirector',
                'regionDirector',
            ]),
        ];
    }
}
