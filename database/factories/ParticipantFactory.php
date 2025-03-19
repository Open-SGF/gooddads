<?php

namespace Database\Factories;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Participant>
 */
class ParticipantFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Participant::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'user_id' => User::factory(),
            'cell_phone_number' => random_int(1000000000, 9999999999),
            'address_line_1' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->stateAbbr(),
            'zipcode' => random_int(10000,99999),
            'employer' => $this->faker->company(),
            'probation_parole_case_worker_name' => $this->faker->name(),
            'probation_parole_case_worker_phone' => random_int(1000000000, 9999999999),
            'ethnicity' => $this->faker->randomElement(Ethnicity::values()),
            'marital_status' => $this->faker->randomElement(MaritalStatus::values()),

        ];
    }
}
