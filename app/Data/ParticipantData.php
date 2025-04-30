<?php

namespace App\Data;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Models\Participant;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantData extends Data
{
    public function __construct(
        #[Max(36)]
        public string $id,
        #[Max(36)]
        public string $userId,
        public UserData $user,
        public string $name,
        #[Max(36)]
        public ?string $regionId,
        public ?RegionData $region,
        public ?ChildData $children,
        #[Max(100)]
        public ?string $addressLine1,
        #[Max(100)]
        public ?string $addressLine2,
        #[Max(50)]
        public ?string $city,
        #[Max(50)]
        public ?string $state,
        #[Max(5)]
        public ?string $zipcode,
        #[Max(100)]
        public ?string $employer,
        #[Max(12)]
        public ?string $cellPhoneNumber,
        #[Max(12)]
        public ?string $homePhoneNumber,
        #[Max(12)]
        public ?string $workPhoneNumber,
        #[Max(12)]
        public ?string $altContactNumber,
        #[Enum(MaritalStatus::class)]
        public MaritalStatus $maritalStatus,
        #[Enum(Ethnicity::class)]
        public Ethnicity $ethnicity,
        #[Regex('^-?\d{1,4}(\.\d{2})$')]
        public ?float $monthlyChildSupport,
        #[Max(255)]
        public ?string $tShirtSize,
        #[Max(255)]
        public ?string $probationParoleCaseWorkerName,
        #[Max(255)]
        public ?string $probationParoleCaseWorkerPhone,
        #[Max(255)]
        public ?string $participantPhoto,
        #[WithCast(DateTimeInterfaceCast::class)]
        public CarbonImmutable $intakeDate,
        #[WithCast(DateTimeInterfaceCast::class)]
        public Carbon $createdAt,
        #[WithCast(DateTimeInterfaceCast::class)]
        public Carbon $updatedAt,
    ) {
    }

    public static function fromModel(Participant $participant): self
    {
        return new self(
            id: $participant->id,
            userId: $participant->user_id,
            user: UserData::from($participant->user),
            name: $participant->user->first_name.' '.$participant->user->last_name,
            regionId: $participant->region_id,
            region: RegionData::from($participant->region),
            children: ChildData::from($participant->children),
            addressLine1: $participant->address_line_1,
            addressLine2: $participant->address_line_2,
            city: $participant->city,
            state: $participant->state,
            zipcode: $participant->zipcode,
            employer: $participant->employer,
            cellPhoneNumber: $participant->cell_phone_number,
            homePhoneNumber: $participant->home_phone_number,
            workPhoneNumber: $participant->work_phone_number,
            altContactNumber: $participant->alt_contact_number,
            maritalStatus: $participant->marital_status,
            ethnicity: $participant->ethnicity,
            monthlyChildSupport: $participant->monthly_child_support,
            tShirtSize: $participant->t_shirt_size,
            probationParoleCaseWorkerName: $participant->probation_parole_case_worker_name,
            probationParoleCaseWorkerPhone: $participant->probation_parole_case_worker_phone,
            participantPhoto: $participant->participant_photo,
            intakeDate: $participant->intake_date,
            createdAt: $participant->created_at,
            updatedAt: $participant->updated_at,
        );
    }
}
