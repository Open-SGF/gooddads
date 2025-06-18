<?php

beforeEach(function () {
    $this->post('/login', [
        'email' => config('auth.testUsers.intake.email'),
        'password' => config('auth.testUsers.intake.password'),
        'remember' => true,
    ]);
    $this->user = auth()->user();
    $this->actingAs($this->user);
});

describe('intake', function () {
    test('user can create a user', function () {
        $this->assertTrue(auth()->user()->hasRole('intake'));
        $response = $this->post(route('intake.register.store'), [
            'firstName' => 'Participant',
            'lastName' => 'User',
            'email' => 'participant_test@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123456',
            'passwordConfirmation' => 'password123456',
        ]);
        $response->assertRedirect(route('intake.participantRegister.create'));
    })->group('intake');
});
