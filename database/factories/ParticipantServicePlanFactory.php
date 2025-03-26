<?php

namespace Database\Factories;

use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParticipantServicePlan>
 */
class ParticipantServicePlanFactory extends Factory
{
    protected $model = \App\Models\ParticipantServicePlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'participant_id' => Participant::factory(), // Assumes a Participant model/factory exists
            'participant_name' => $this->faker->name(),
            'client_number' => $this->faker->unique()->numerify('CL-#####'),
            'review_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'parenting_skill_development_is_service_area' => $this->faker->boolean(),
            'effective_co_parenting_is_service_area' => $this->faker->boolean(),
            'employment_and_education_is_service_area' => $this->faker->boolean(),
            'child_support_is_service_area' => $this->faker->boolean(),
            'domestic_violence_is_service_area' => $this->faker->boolean(),
            'service_identified_by_participant' => $this->faker->optional()->sentence(),
            'goal' => $this->faker->paragraph(),
            'custody_visitation_strategy' => $this->faker->paragraph(),
            'custody_visitation_person_responsible' => $this->faker->name(),
            'custody_visitation_timeline' => $this->faker->randomElement(['1 month', '3 months', '6 months']),
            'custody_visitation_measure_of_success' => $this->faker->sentence(),
            'education_employment_strategy' => $this->faker->paragraph(),
            'education_employment_person_responsible' => $this->faker->name(),
            'education_employment_timeline' => $this->faker->randomElement(['1 month', '3 months', '6 months']),
            'education_employment_measure_of_success' => $this->faker->sentence(),
            'housing_transportation_strategy' => $this->faker->paragraph(),
            'housing_transportation_person_responsible' => $this->faker->name(),
            'housing_transportation_timeline' => $this->faker->randomElement(['1 month', '3 months', '6 months']),
            'housing_transportation_measure_of_success' => $this->faker->sentence(),
            'participant_signature' => $this->faker->name(),
            'participant_signature_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'case_manager_signature' => $this->faker->name(),
            'case_manager_signature_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'date_completed' => $this->faker->optional(0.3)->dateTimeBetween('-1 month', 'now'), // 30% chance of being completed
        ];
    }
}
