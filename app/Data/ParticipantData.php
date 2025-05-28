<?php

namespace App\Data;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Models\Participant;
use App\Rules\UsPhoneNumber;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantData extends Data
{
    public function __construct(
        #[StringType, Max(36)]
        public string $id,
        #[StringType, Max(36)]
        public string $userId,
        #[DataCollectionOf(UserData::class)]
        public UserData $user,
        #[StringType, Max(36), Nullable]
        public string $regionId,
        #[Nullable, DataCollectionOf(RegionData::class)]
        public ?RegionData $region,
        /** @var ChildData[] $children */
        public array $children,
        #[StringType, Max(100)]
        public string $addressLine1,
        #[StringType, Max(100)]
        public ?string $addressLine2,
        #[StringType, Max(50)]
        public string $city,
        #[StringType, Max(50)]
        public string $state,
        #[StringType, Max(5)]
        public string $zipcode,
        #[StringType, Max(100)]
        public ?string $employer,
        #[StringType, Max(12)]
        public ?string $cellPhoneNumber,
        #[StringType, Max(12)]
        public ?string $homePhoneNumber,
        #[StringType, Max(12)]
        public ?string $workPhoneNumber,
        #[StringType, Max(12)]
        public ?string $altContactNumber,
        #[Enum(MaritalStatus::class), Nullable]
        public ?MaritalStatus $maritalStatus,
        #[Enum(Ethnicity::class), Nullable]
        public ?Ethnicity $ethnicity,
        #[Regex('^-?\d{1,4}(\.\d{2})$')]
        public ?float $monthlyChildSupport,
        #[StringType, Max(255)]
        public ?string $tShirtSize,
        #[StringType, Max(255)]
        public ?string $probationParoleCaseWorkerName,
        #[StringType, Max(255)]
        public ?string $probationParoleCaseWorkerPhone,
        #[StringType, Max(255)]
        public ?string $participantPhoto,
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?CarbonImmutable $intakeDate,
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $createdAt,
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $updatedAt,
    ) {
    }

    public static function fromModel(Participant $participant): self
    {
        return new self(
            id: $participant->id,
            userId: $participant->user_id,
            user: UserData::from($participant->user),
            regionId: $participant->region_id,
            region: RegionData::from($participant->region),
            children: $participant->children->map(function ($child) {
                return ChildData::from($child);
            })->toArray(),
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public static function rules(): array
    {
        return [
            'id' => ['nullable'],
            'userId' => ['nullable'],
            'user' => ['nullable'],
            'user.id' => ['nullable'],
            'user.firstName' => ['nullable'],
            'user.lastName' => ['nullable'],
            'user.email' => ['nullable'],
            'user.roles' => ['nullable'],
            'user.permissions' => ['nullable'],
            'children' => ['nullable'],
            'children.*.id' => ['nullable'],
            'children.*.participantId' => ['nullable'],
            'children.*.createdAt' => ['nullable'],
            'children.*.updatedAt' => ['nullable'],
            'intakeDate' => ['nullable'],
            'createdAt' => ['nullable'],
            'updatedAt' => ['nullable'],
            'addressLine1' => ['required', 'string', 'max:200'],
            'addressLine2' => ['nullable', 'string', 'max:200'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:50'],
            'zipcode' => ['required', 'string', 'max:5'],
            'employer' => ['nullable', 'string', 'max:100'],
            'tShirtSize' => ['nullable', 'string', 'max:100'],
            'homePhoneNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'workPhoneNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'cellPhoneNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'altContactNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'probationParoleCaseWorkerPhone' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'maritalStatus' => ['required', Rule::in(MaritalStatus::values())],
            'ethnicity' => ['required', Rule::in(Ethnicity::values())],
        ];
    }
}
