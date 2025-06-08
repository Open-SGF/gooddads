<?php

namespace App\Data\Forms;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\Before;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class ChildForm extends Data
{
    public function __construct(
        #[StringType, Max(255)]
        public string $firstName,

        #[StringType, Max(255)]
        public string $lastName,

        #[Before('today'), WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public Carbon $dateOfBirth,

        #[BooleanType, Nullable]
        public ?bool $phoneContact,

        #[BooleanType, Nullable]
        public ?bool $custody,

        #[BooleanType, Nullable]
        public ?bool $visitation,

        #[Numeric]
        public float $childSupport,
    ) {

    }
}
