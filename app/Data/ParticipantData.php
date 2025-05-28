<?php

namespace App\Data;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Models\Participant;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(CamelCaseMapper::class)]
#[MapInputName(SnakeCaseMapper::class)]
class ParticipantData extends Data
{
    public function __construct(
        public string $id,
        public string $userId,
        public UserData $user,
        public string $regionId,
        /** @var RegionData[] $region */
        public array $region,
        /** @var ChildData[] $children */
        public ?array $children,
        public string $addressLine1,
        public ?string $addressLine2,
        public string $city,
        public string $state,
        public string $zipcode,
        public ?string $employer,
        public ?string $cellPhoneNumber,
        public ?string $homePhoneNumber,
        public ?string $workPhoneNumber,
        public ?string $altContactNumber,
        public ?MaritalStatus $maritalStatus,
        public ?Ethnicity $ethnicity,
        public ?float $monthlyChildSupport,
        public ?string $tShirtSize,
        public ?string $probationParoleCaseWorkerName,
        public ?string $probationParoleCaseWorkerPhone,
        public ?string $participantPhoto,
        public string $intakeDate,
        public string $createdAt,
        public string $updatedAt,
    ) {
    }

    //    public static function fromModel(Participant $participant): self
    //    {
    //        return new self(
    //            id: $participant->id,
    //            userId: $participant->user_id,
    //            user: UserData::from($participant->user),
    //            name: $participant->user->first_name.' '.$participant->user->last_name,
    //            regionId: $participant->region_id,
    //            region: RegionData::from($participant->region),
    //            children: ChildData::from($participant->children),
    //            addressLine1: $participant->address_line_1,
    //            addressLine2: $participant->address_line_2,
    //            city: $participant->city,
    //            state: $participant->state,
    //            zipcode: $participant->zipcode,
    //            employer: $participant->employer,
    //            cellPhoneNumber: $participant->cell_phone_number,
    //            homePhoneNumber: $participant->home_phone_number,
    //            workPhoneNumber: $participant->work_phone_number,
    //            altContactNumber: $participant->alt_contact_number,
    //            maritalStatus: $participant->marital_status,
    //            ethnicity: $participant->ethnicity,
    //            monthlyChildSupport: $participant->monthly_child_support,
    //            tShirtSize: $participant->t_shirt_size,
    //            probationParoleCaseWorkerName: $participant->probation_parole_case_worker_name,
    //            probationParoleCaseWorkerPhone: $participant->probation_parole_case_worker_phone,
    //            participantPhoto: $participant->participant_photo,
    //            intakeDate: $participant->intake_date,
    //            createdAt: $participant->created_at,
    //            updatedAt: $participant->updated_at,
    //        );
    //    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public static function rules(): array
    {
        return [
            'id' => ['nullable'],
            'addressLine1' => ['required', 'string', 'max:200'],
            'addressLine2' => ['nullable', 'string', 'max:200'],
            'altContactNumber' => ['nullable', 'string', 'max:12'],
            'cellPhoneNumber' => ['nullable', 'string', 'max:12'],
            'children' => ['nullable'],
            'city' => ['required', 'string', 'max:100'],
            'createdAt' => ['nullable'],
            'employer' => ['nullable', 'string', 'max:100'],
            'ethnicity' => ['required', Rule::in(Ethnicity::values())],
            'homePhoneNumber' => ['nullable', 'string', 'max:12'],
            'id' => ['nullable'],
            'intakeDate' => ['nullable'],
            'maritalStatus' => ['required', Rule::in(MaritalStatus::values())],
            'monthlyChildSupport' => ['nullable'],
            'participantPhoto' => ['nullable', 'string', 'max:255'],
            'probationParoleCaseWorkerName' => ['nullable', 'string', 'max:255'],
            'probationParoleCaseWorkerPhone' => ['nullable', 'string', 'max:12'],
            'region' => ['nullable'],
            'regionId' => ['nullable'],
            'state' => ['required', 'string', 'max:50'],
            'tShirtSize' => ['nullable', 'string', 'max:100'],
            'updatedAt' => ['nullable'],
            'user' => ['nullable'],
            'userId' => ['nullable'],
            'workPhoneNumber' => ['nullable', 'string', 'max:12'],
            'zipcode' => ['required', 'string', 'max:5'],
        ];
    }
}
