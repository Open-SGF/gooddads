<?php

namespace Database\Factories;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Models\Region;
use App\Models\User;
use App\Services\Formatter\PhoneFormatter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dad>
 */
class DadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'region_id' => Region::factory(),
            'street_address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'zip_code' => substr($this->faker->postcode(), 0, 5),
            'employer' => $this->faker->company(),
            'cell_phone_number' => PhoneFormatter::format($this->faker->phoneNumber()),
            'home_phone_number' => PhoneFormatter::format($this->faker->phoneNumber()),
            'work_phone_number' => PhoneFormatter::format($this->faker->phoneNumber()),
            'alt_contact_number' => PhoneFormatter::format($this->faker->phoneNumber()),
            'marital_status' => $this->faker->randomElement(MaritalStatus::cases()),
            'ethnicity' => $this->faker->randomElement(Ethnicity::cases()),
            'monthly_child_support' => $this->faker->randomFloat(2, 100, 1000),
        ];
    }
}
