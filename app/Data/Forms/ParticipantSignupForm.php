<?php

namespace App\Data\Forms;

use App\Data\ChildData;
use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Rules\UsPhoneNumber;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantSignupForm extends Data
{
    public function __construct(
        #[Required, StringType, Max(191)]
        public string $addressLine1,

        #[Nullable, StringType, Max(191)]
        public ?string $addressLine2,

        #[Required, StringType, Max(191)]
        public string $city,

        #[Required, StringType, Max(191)]
        public string $state,

        #[Required, StringType, Max(191)]
        public string $zipcode,

        #[Nullable, StringType, Max(191)]
        public ?string $employer,

        #[Nullable, StringType, Max(191)]
        public ?string $tShirtSize,

        public ?string $homePhoneNumber,
        public ?string $workPhoneNumber,
        public ?string $cellPhoneNumber,
        public ?string $altContactNumber,
        public ?string $probationParoleCaseWorkerPhone,

        #[Nullable, StringType, Max(191)]
        public ?string $probationParoleCaseWorkerName,

        #[Required]
        /** @var MaritalStatus::* $maritalStatus */
        public MaritalStatus $maritalStatus,

        #[Required]
        /** @var Ethnicity::* $ethnicity */
        public Ethnicity $ethnicity,

        #[Nullable, Numeric]
        public ?float $monthlyChildSupport,

        #[Required, Exists('regions', 'id')]
        public ?string $regionId,

        #[Nullable, DataCollectionOf(ChildData::class)]
        /** @var DataCollection<ChildData>|null $childrenInfo */
        public ?DataCollection $childrenInfo,
    ) {
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public static function rules(): array
    {
        return [
            'homePhoneNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'workPhoneNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'cellPhoneNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'altContactNumber' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'probationParoleCaseWorkerPhone' => ['nullable', 'string', 'max:12', new UsPhoneNumber()],
            'maritalStatus' => ['required', Rule::in(MaritalStatus::values())],
            'ethnicity' => ['required', Rule::in(Ethnicity::values())],
            'childrenInfo' => ['nullable', 'array'],
            'childrenInfo.*.firstName' => ['required_with:childrenInfo', 'string'],
            'childrenInfo.*.lastName' => ['required_with:childrenInfo', 'string'],
            'childrenInfo.*.dateOfBirth' => ['required_with:childrenInfo', 'date'],
            'childrenInfo.*.custody' => ['required_with:childrenInfo', 'boolean'],
            'childrenInfo.*.visitation' => ['required_with:childrenInfo', 'boolean'],
            'childrenInfo.*.phoneContact' => ['required_with:childrenInfo', 'boolean'],
            'childrenInfo.*.childSupport' => ['required_with:childrenInfo', 'numeric'],
        ];
    }
}
