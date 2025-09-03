<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option defines the default authentication "guard" and password
    | reset "broker" for your application. You may change these values
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | which utilizes session storage plus the Eloquent user provider.
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | Supported: "session"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | If you have multiple user tables or models you may configure multiple
    | providers to represent the model / table. These providers may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', App\Models\User::class),
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | These configuration options specify the behavior of Laravel's password
    | reset functionality, including the table utilized for token storage
    | and the user provider that is invoked to actually retrieve users.
    |
    | The expiry time is the number of minutes that each reset token will be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    | The throttle setting is the number of seconds a user must wait before
    | generating more password reset tokens. This prevents the user from
    | quickly generating a very large amount of password reset tokens.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the amount of seconds before a password confirmation
    | window expires and users are asked to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

    /*
    |--------------------------------------------------------------------------
    | Test Users
    |--------------------------------------------------------------------------
    |
    | The following users are used for testing purposes. They are used only in
    | the context of seeders and tests.
    |
    */
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
        'participant' => [
            'firstName' => 'Participant',
            'lastName' => 'User',
            'email' => 'participant@example.com',
            'phoneNumber' => '1234567890',
            'password' => 'password123',
        ],
    ],

];
