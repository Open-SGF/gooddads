<?php

namespace Database\Factories;

use App\Models\Dad;
use App\Models\ResponsibleParty;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ResponsiblePartyAssignment>
 */
class ResponsiblePartyAssignmentFactory extends Factory
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
            'responsible_party_id' => ResponsibleParty::factory(),
            'dad_id' => Dad::factory(),
        ];
    }
}
