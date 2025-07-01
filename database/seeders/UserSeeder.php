<?php

namespace Database\Seeders;

use App\Data\Auth\PostUserData;
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
        $admin = PostUserData::from([
            'firstName' => config('auth.testUsers.admin.firstName'),
            'lastName' => config('auth.testUsers.admin.lastName'),
            'email' => config('auth.testUsers.admin.email'),
            'phoneNumber' => config('auth.testUsers.admin.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.admin.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.admin.password')),
        ]);

        $director = PostUserData::from([
            'firstName' => config('auth.testUsers.director.firstName'),
            'lastName' => config('auth.testUsers.director.lastName'),
            'email' => config('auth.testUsers.director.email'),
            'phoneNumber' => config('auth.testUsers.director.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.director.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.director.password')),
        ]);

        $regionDirector = PostUserData::from([
            'firstName' => config('auth.testUsers.regionDirector.firstName'),
            'lastName' => config('auth.testUsers.regionDirector.lastName'),
            'email' => config('auth.testUsers.regionDirector.email'),
            'phoneNumber' => config('auth.testUsers.regionDirector.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.regionDirector.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.regionDirector.password')),
            'role' => Roles::RegionDirector->value,
        ]);

        $programDirector = PostUserData::from([
            'firstName' => config('auth.testUsers.programDirector.firstName'),
            'lastName' => config('auth.testUsers.programDirector.lastName'),
            'email' => config('auth.testUsers.programDirector.email'),
            'phoneNumber' => config('auth.testUsers.programDirector.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.programDirector.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.programDirector.password')),
        ]);

        $facilitator = PostUserData::from([
            'firstName' => config('auth.testUsers.facilitator.firstName'),
            'lastName' => config('auth.testUsers.facilitator.lastName'),
            'email' => config('auth.testUsers.facilitator.email'),
            'phoneNumber' => config('auth.testUsers.facilitator.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.facilitator.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.facilitator.password')),
        ]);

        $auditor = PostUserData::from([
            'firstName' => config('auth.testUsers.auditor.firstName'),
            'lastName' => config('auth.testUsers.auditor.lastName'),
            'email' => config('auth.testUsers.auditor.email'),
            'phoneNumber' => config('auth.testUsers.auditor.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.auditor.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.auditor.password')),
        ]);

        $intake = PostUserData::from([
            'firstName' => config('auth.testUsers.intake.firstName'),
            'lastName' => config('auth.testUsers.intake.lastName'),
            'email' => config('auth.testUsers.intake.email'),
            'phoneNumber' => config('auth.testUsers.intake.phoneNumber'),
            'password' => bcrypt(config('auth.testUsers.intake.password')),
            'passwordConfirmation' => bcrypt(config('auth.testUsers.intake.password')),
        ]);

        User::createQuietly($admin->toArray())->assignRole(Roles::Admin->value);

        User::createQuietly($director->toArray())->assignRole(Roles::Director->value);

        User::createQuietly($regionDirector->toArray())->assignRole(Roles::RegionDirector->value);

        User::createQuietly($programDirector->toArray())->assignRole(Roles::ProgramDirector->value);

        User::createQuietly($facilitator->toArray())->assignRole(Roles::Facilitator->value);

        User::createQuietly($auditor->toArray())->assignRole(Roles::Auditor->value);

        User::createQuietly($intake->toArray())->assignRole(Roles::Intake->value);
    }
}
