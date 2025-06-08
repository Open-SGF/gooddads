<?php

namespace App\Data\Props;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantRegistrationProps extends Data
{
    public function __construct(
        #[Enum(Ethnicity::class)]
        /** @var Ethnicity $ethnicity */
        public array $ethnicity,

        #[Enum(MaritalStatus::class)]
        /** @var MaritalStatus $maritalStatus */
        public array $maritalStatus,

        /** @var RegionProp[] $regions */
        public array $regions,
    ) {
    }
}
