<?php

namespace Database\Factories;

use App\Models\DadClass;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DadClassAssignment>
 */
class DadClassAssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'user_id' => User::factory(),
            'dadClass_id' => DadClass::factory(),
        ];
    }
}
 