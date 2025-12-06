<?php

namespace Tests\Feature\Intake;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Models\Region;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParticipantSignupTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_participant_signup(): void
    {
        $this->seed(PermissionsSeeder::class);

        $region = Region::factory()->create();

        $participantData = [
            'address_line_1' => '123 Main St',
            'address_line_2' => 'Apt 1',
            'city' => 'Anytown',
            'state' => 'CA',
            'zipcode' => '12345',
            'employer' => 'Example Company',
            't_shirt_size' => 'L',
            'home_phone_number' => '123-456-7890',
            'work_phone_number' => '987-654-3210',
            'other_phone_number' => '555-555-5555',
            'alt_contact_number' => '555-555-5555',
            'probation_parole_case_worker_name' => 'John Doe',
            'probation_parole_case_worker_phone' => '123-456-9999',
            'marital_status' => MaritalStatus::Single->value,
            'ethnicity' => Ethnicity::Asian->value,
            'monthly_child_support' => 100.00,
            'region_id' => $region->id,
            'children_info' => [
                [
                    'first_name' => 'John',
                    'last_name' => 'Doe Jr.',
                    'date_of_birth' => now()->subYears(5)->format('Y-m-d'),
                    'custody' => true,
                    'visitation' => true,
                    'phone_contact' => true,
                    'child_support' => 50.00,
                ],
                [
                    'first_name' => 'Jane',
                    'last_name' => 'Doe Jr.',
                    'date_of_birth' => now()->subYears(10)->format('Y-m-d'),
                    'custody' => true,
                    'visitation' => true,
                    'phone_contact' => true,
                    'child_support' => 50.00,
                ],
            ],
        ];
        $participantUser = User::factory()->create();
        $participantUser->assignRole('participant');

        $response = $this->actingAs($participantUser)->post(route('intake.signup'), $participantData);

        $response->assertRedirectToRoute('intake.disclosure');

        $participant = $participantUser->participant()->first();

        $this->assertNotNull($participant);

        $this->assertCount(2, $participant->children);
    }
}
