<?php

namespace App\Data\Forms;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class ParticipantSignupForm extends Data
{
    public function __construct(
        #[Max(191)]
        public string $addressLine1,

        #[Optional, Max(191)]
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

        #[Required]
        public string $regionId,

        #[ArrayType, Min(1)]
        /** @var ChildForm[] $children */
        public array $children,
    ) {
    }
}
