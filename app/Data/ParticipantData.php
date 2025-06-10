<?php

namespace App\Data;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Rules\UsPhoneNumber;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(CamelCaseMapper::class)]
class ParticipantData extends Data
{
    public function __construct(
        public string $id,

        public string $userId,

        public string $regionId,

        #[Max(100)]
        public string $addressLine1,

        #[Max(100)]
        public ?string $addressLine2,

        #[Max(50)]
        public string $city,

        #[Max(50)]
        public string $state,

        #[Max(5)]
        public string $zipcode,

        #[Max(100)]
        public ?string $employer,

        #[Max(12), UsPhoneNumber]
        public ?string $cellPhoneNumber,

        #[Max(12), UsPhoneNumber]
        public ?string $homePhoneNumber,

        #[Max(12), UsPhoneNumber]
        public ?string $workPhoneNumber,

        #[Max(12), UsPhoneNumber]
        public ?string $altContactNumber,

        #[Enum(MaritalStatus::class), Nullable]
        public ?MaritalStatus $maritalStatus,

        #[Enum(Ethnicity::class), Nullable]
        public ?Ethnicity $ethnicity,

        #[Max(255)]
        public ?string $tShirtSize,

        #[Max(255)]
        public ?string $probationParoleCaseWorkerName,

        #[Max(255), USPhoneNumber]
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
}
