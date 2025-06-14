<?php

namespace Database\Seeders;

use App\Data\Forms\UserRegistrationForm;
use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $director = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.director.firstName'),
            'lastName' => config('constants.testUsers.director.lastName'),
            'email' => config('constants.testUsers.director.email'),
            'phoneNumber' => config('constants.testUsers.director.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.director.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.director.password')),
            'role' => Roles::Director,
        ]);

        $regionDirector = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.regionDirector.firstName'),
            'lastName' => config('constants.testUsers.regionDirector.lastName'),
            'email' => config('constants.testUsers.regionDirector.email'),
            'phoneNumber' => config('constants.testUsers.regionDirector.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.regionDirector.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.regionDirector.password')),
            'role' => Roles::RegionDirector,
        ]);

        $programDirector = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.programDirector.firstName'),
            'lastName' => config('constants.testUsers.programDirector.lastName'),
            'email' => config('constants.testUsers.programDirector.email'),
            'phoneNumber' => config('constants.testUsers.programDirector.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.programDirector.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.programDirector.password')),
            'role' => Roles::ProgramDirector,
        ]);

        $facilitator = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.facilitator.firstName'),
            'lastName' => config('constants.testUsers.facilitator.lastName'),
            'email' => config('constants.testUsers.facilitator.email'),
            'phoneNumber' => config('constants.testUsers.facilitator.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.facilitator.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.facilitator.password')),
            'role' => Roles::Facilitator,
        ]);

        $auditor = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.auditor.firstName'),
            'lastName' => config('constants.testUsers.auditor.lastName'),
            'email' => config('constants.testUsers.auditor.email'),
            'phoneNumber' => config('constants.testUsers.auditor.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.auditor.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.auditor.password')),
            'role' => Roles::Auditor,
        ]);

        $intake = UserRegistrationForm::from([
            'firstName' => config('constants.testUsers.intake.firstName'),
            'lastName' => config('constants.testUsers.intake.lastName'),
            'email' => config('constants.testUsers.intake.email'),
            'phoneNumber' => config('constants.testUsers.intake.phoneNumber'),
            'password' => bcrypt(config('constants.testUsers.intake.password')),
            'passwordConfirmation' => bcrypt(config('constants.testUsers.intake.password')),
            'role' => Roles::Intake,
        ]);

        User::create($director->toArray());

        User::create($regionDirector->toArray());

        User::create($programDirector->toArray());

        User::create($facilitator->toArray());

        User::create($auditor->toArray());

        User::create($intake->toArray());
    }
}
