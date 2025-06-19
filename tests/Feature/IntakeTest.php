<?php

use App\Models\Region;
use Illuminate\Support\Carbon;

beforeEach(function () {
    $this->post('/login', [
        'email' => config('auth.testUsers.intake.email'),
        'password' => config('auth.testUsers.intake.password'),
        'remember' => true,
    ]);
    $this->user = auth()->user();
    $this->actingAs($this->user);
});

test('a user can complete the intake process', function () {
    $userRegisterResponse = $this->post(route('intake.register.store'), [
        'firstName' => 'Participant',
        'lastName' => 'User',
        'email' => 'participant_test@example.com',
        'phoneNumber' => '1234567890',
        'password' => 'password123456',
        'passwordConfirmation' => 'password123456',
    ]);

    $userRegisterResponse->assertRedirect(route('intake.participantRegister.create'));
    $intakeUserId = session('intakeUserId');
    $this->assertNotNull($intakeUserId);

    $region = Region::factory()->create();
    $participantRegisterResponse = $this->post(route('intake.participantRegister.store'), [
        'userId' => $intakeUserId,
        'addressLine1' => '405 N Jefferson Ave',
        'city' => 'Springfield',
        'state' => 'MO',
        'zipcode' => '65806',
        'maritalStatus' => 'single',
        'ethnicity' => 'white',
        'regionId' => $region->value('id'),
        'children' => [
            [
                'firstName' => 'Baby',
                'lastName' => 'Participant',
                'dateOfBirth' => '2022-01-01',
                'phoneContact' => true,
                'custody' => true,
                'visitation' => false,
                'childSupport' => 123.45,
            ],
        ],
    ]);

    $participantRegisterResponse->assertRedirect(route('intake.disclosure.create'));
    $intakeParticipantId = session('intakeParticipantId');
    $this->assertNotNull($intakeParticipantId);

    $disclosureResponse = $this->post(route('intake.disclosure.store'), [
        'participantId' => $intakeParticipantId,
        'isDssAuthorized' => true,
        'isDysAuthorized' => true,
        'isMhdAuthorized' => true,
        'isDfasAuthorized' => true,
        'isMmacAuthorized' => false,
        'isFsdAuthorized' => false,
        'isCdAuthorized' => false,
        'isDlsAuthorized' => false,
        'isOtherAuthorized' => false,
        'discloseToAttorney' => true,
        'attorneyName' => 'Saul Goodman',
        'discloseToEmployer' => false,
        'discloseToLegislator' => true,
        'legislatorName' => 'Josh Hawley',
        'discloseToGovernorsStaff' => false,
        'discloseToOtherRecipient' => true,
        'purposes' => 'employment',
        'contentTypes' => 'other',
        'otherDisclosureDetails' => 'All instances of cringey dad jokes',
        'otherAuthorizedEntity' => 'John Doe',
        'subjectName' => 'John Doe',
        'subjectPhone' => '1234567890',
        'subjectDob' => '1991/08/19',
        'subjectSsn' => '123456789',
        'subjectAddress' => '123 Main St',
        'otherRecipientDetails' => 'John Doe',
        'acceptTextMessages' => true,
        'consumerSignature' => 'asdf',
        'signatureDate' => '2025-06-18',
        'dateCompleted' => '2025-06-18',
    ]);

    $disclosureResponse->assertRedirect(route('intake.fatherhoodAssessment.create'));
});
