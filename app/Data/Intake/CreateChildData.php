<?php

namespace App\Data\Intake;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\Before;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class CreateChildData extends Data
{
    public function __construct(
        #[Max(255)]
        public string $firstName,
        #[Max(255)]
        public string $lastName,
        #[Before('today'), WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public CarbonImmutable $dateOfBirth,
        public ?bool $phoneContact,
        public ?bool $custody,
        public ?bool $visitation,
        public float $childSupport,
    ) {
    }
}
