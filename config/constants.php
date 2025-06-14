<?php

return [
    'testUsers' => [
        'admin' => [
            'firstName' => env('ADMIN_FIRST_NAME'),
            'lastName' => env('ADMIN_LAST_NAME'),
            'email' => env('ADMIN_EMAIL'),
            'phoneNumber' => env('ADMIN_PHONE_NUMBER'),
            'password' => env('ADMIN_PASSWORD'),
        ],
        'director' => [
            'firstName' => 'Director',
            'lastName' => 'User',
            'email' => 'director@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
        'regionDirector' => [
            'firstName' => 'Region Director',
            'lastName' => 'User',
            'email' => 'region_director@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
        'programDirector' => [
            'firstName' => 'Program Director',
            'lastName' => 'User',
            'email' => 'program_director@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
        'facilitator' => [
            'firstName' => 'Facilitator',
            'lastName' => 'User',
            'email' => 'facilitator@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
        'auditor' => [
            'firstName' => 'Auditor',
            'lastName' => 'User',
            'email' => 'auditor@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
        'intake' => [
            'firstName' => 'Intake',
            'lastName' => 'User',
            'email' => 'intake@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
        'participant' => [
            'firstName' => 'Participant',
            'lastName' => 'User',
            'email' => 'participant@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
    ],
];
