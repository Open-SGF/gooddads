<?php

namespace Database\Factories;

use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParticipantFatherhoodAssessment>
 */
class ParticipantFatherhoodAssessmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $otherProvided = $this->faker->boolean();

        return [
            'id' => $this->faker->uuid(),
            'participant_id' => Participant::factory(),
            'vendor_name' => 'Good Dads',
            'participant_name' => $this->faker->name(),
            'date_of_birth' => $this->faker->dateTimeBetween('-50 years', '-18 years')->format('Y-m-d'),
            'social_security_number' => $this->faker->unique()->numerify('###-##-####'),
            'is_missouri_resident' => $this->faker->boolean(),
            'child_is_under_18' => $this->faker->boolean(),
            'is_financially_eligible' => $this->faker->boolean(),
            'drivers_license_provided' => $this->faker->boolean(),
            'utility_bill_provided' => $this->faker->boolean(),
            'pay_stub_provided' => $this->faker->boolean(),
            'written_employer_statement_provided' => $this->faker->boolean(),
            'social_security_benefits_provided' => $this->faker->boolean(),
            'self_attestation_provided' => $this->faker->boolean(),
            'unemployment_compensation_provided' => $this->faker->boolean(),
            'other_provided' => $otherProvided,
            'other_provided_name' => $otherProvided ? $this->faker->name() : null,
            'gross_monthly_household_income' => $this->faker->randomFloat(2, 0, 10000),
            'number_of_family_members' => $this->faker->numberBetween(1, 10),
            'percentage_of_fpl' => $this->faker->randomFloat(2, 0, 400),
            'approved_for_services' => $this->faker->boolean(),
            'state_agency_review_date' => $this->faker->optional()->date(),
            'date_completed' => $this->faker->optional()->date(),
        ];
    }
}
