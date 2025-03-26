<?php

namespace Database\Factories;

use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParticipantMediaRelease>
 */
class ParticipantMediaReleaseFactory extends Factory
{
    protected $model = \App\Models\ParticipantMediaRelease::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'participant_id' => Participant::factory(),
            'printed_name' => $this->faker->name(),
            'signature' => $this->faker->name(),
            'signature_date' => $this->faker->optional()->date(),
            'phone_number' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'date_completed' => null,
        ];
    }
}
