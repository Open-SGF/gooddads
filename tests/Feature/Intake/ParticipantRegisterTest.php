<?php

namespace Tests\Feature\Intake;

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class ParticipantRegisterTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(PermissionsSeeder::class);
    }

    public function test_intake_form_can_only_be_accessed_by_intake_role(): void
    {

        $intakeUser = User::factory()->create()->assignRole('intake');
        $adminUser = User::factory()->create()->assignRole('admin');

        $adminResponse = $this->actingAs($adminUser)->get(route('intake.index'));
        $intakeResponse = $this->actingAs($intakeUser)->get(route('intake.index'));

        $adminResponse->assertStatus(403);
        $intakeResponse->assertStatus(200);
    }

    /**
     * A basic feature test example.
     */
    public function test_registration_form_is_rendered(): void
    {
        $intakeUser = User::factory()->create()->assignRole('intake');

        $intakeResponse = $this->actingAs($intakeUser)->get(route('intake.register'));

        $intakeResponse->assertStatus(200);
    }


    public function test_new_participants_can_register(): void
    {
        Event::fake();
        $intakeUser = User::factory()->create()->assignRole('intake');

        $response = $this->actingAs($intakeUser)->post(route('intake.register'), [
            'first_name' => 'Participant',
            'last_name' => 'User',
            'email' => 'participant@example.com',
            'phone_number' => '1234567890',
            'password' => 'password',
            'password_confirmation' => 'password',
            'terms' => true
        ]);

        // Ensure the new user has been assigned participant role
         Event::assertDispatched(Registered::class, function($event){
             return $event->user->hasRole('participant');
         });

         $this->assertModelExists(User::firstWhere('email', 'participant@example.com'));

        $response->assertRedirect(route('intake.signup', absolute: false));
    }

    public function test_new_participants_requires_terms(): void
    {
        $intakeUser = User::factory()->create()->assignRole('intake');

        $response = $this->actingAs($intakeUser)->post(route('intake.register'), [
            'first_name' => 'Participant',
            'last_name' => 'User',
            'email' => 'participant@example.com',
            'phone_number' => '1234567890',
            'password' => 'password',
            'password_confirmation' => 'password',
            'terms' => false
        ]);

        $response->assertSessionHasErrors('terms');
    }


}
