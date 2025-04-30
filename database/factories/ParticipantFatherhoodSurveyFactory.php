<?php

namespace Database\Factories;

use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParticipantFatherhoodSurvey>
 */
class ParticipantFatherhoodSurveyFactory extends Factory
{
    protected $model = \App\Models\ParticipantFatherhoodSurvey::class;


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reasonOther = $this->faker->boolean;
        $referredByOther = $this->faker->boolean;
        $otherExpected = $this->faker->boolean;

        return [
            'participant_id' => Participant::factory(),
            'date_of_birth' => $this->faker->dateTimeBetween('-50 years', '-18 years')->format('Y-m-d'),
            'fatherhood_program' => 'Good Dads',

            // Reasons
            'reason_become_responsible_father' => $this->faker->boolean,
            'reason_referred' => $this->faker->boolean,
            'reason_court_ordered' => $this->faker->boolean,
            'reason_address_child_support_concerns' => $this->faker->boolean,
            'reason_other' => $reasonOther,
            'reason_other_description' => $reasonOther ? $this->faker->sentence : null,

            // Referred by
            'referred_by_word_of_mouth' => $this->faker->boolean,
            'referred_by_past_participant' => $this->faker->boolean,
            'referred_by_family_support_division' => $this->faker->boolean,
            'referred_by_prosecuting_attorney' => $this->faker->boolean,
            'referred_by_marketing' => $this->faker->boolean,
            'referred_by_organization_itself' => $this->faker->boolean,
            'referred_by_other' => $referredByOther,
            'referred_by_other_source' => $referredByOther ? $this->faker->company : null,

            // Expectations
            'employment_opportunities_expected' => $this->faker->boolean,
            'assistance_with_alcohol_abuse_expected' => $this->faker->boolean,
            'increased_emphasis_on_parenting_skills_expected' => $this->faker->boolean,
            'access_to_mentors_resources_outside_program_expected' => $this->faker->boolean,
            'resume_building_skills_expected' => $this->faker->boolean,
            'free_legal_services_expected' => $this->faker->boolean,
            'assistance_with_criminal_history_expected' => $this->faker->boolean,
            'assistance_with_credit_repair_expected' => $this->faker->boolean,
            'assistance_with_overcoming_homelessness_expected' => $this->faker->boolean,
            'assistance_with_visitation_custody_expected' => $this->faker->boolean,
            'increased_understanding_of_child_support_issues_expected' => $this->faker->boolean,
            'maintaining_hope_for_the_future_expected' => $this->faker->boolean,
            'help_obtaining_information_about_health_wellness_expected' => $this->faker->boolean,
            'other_expected' => $otherExpected,
            'other_expectations_description' => $otherExpected ? $this->faker->sentence : null,
            'date_completed' => null,
        ];
    }
}
