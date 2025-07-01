<?php

namespace App\Data\Intake;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Rules\UsPhoneNumber;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\RequiredWith;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class PostParticipantData extends Data
{
    public function __construct(
        #[Max(255)]
        public string $addressLine1,
        #[Max(255)]
        public ?string $addressLine2,
        #[Max(255)]
        public string $city,
        #[Max(255)]
        public string $state,
        #[Max(255)]
        public string $zipcode,
        #[Max(255)]
        public ?string $employer,
        #[Max(255)]
        public ?string $tShirtSize,
        #[UsPhoneNumber]
        public ?string $homePhoneNumber,
        #[UsPhoneNumber]
        public ?string $workPhoneNumber,
        #[UsPhoneNumber]
        public ?string $cellPhoneNumber,
        #[UsPhoneNumber]
        public ?string $altContactNumber,
        #[UsPhoneNumber, RequiredWith('probationParoleCaseWorkerName')]
        public ?string $probationParoleCaseWorkerPhone,
        #[Max(255), RequiredWith('probationParoleCaseWorkerPhone')]
        public ?string $probationParoleCaseWorkerName,
        /** @var MaritalStatus::* $maritalStatus */
        public MaritalStatus $maritalStatus,
        /** @var Ethnicity::* $ethnicity */
        public Ethnicity $ethnicity,
        public string $regionId,
        #[ArrayType, Min(1)]
        /** @var PostChildData[] $children */
        public array $children,
    ) {
    }
}
