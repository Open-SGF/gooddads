<?php

namespace App\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapInputName(SnakeCaseMapper::class)]
class ChildData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $participantId,
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly CarbonImmutable $dateOfBirth,
        public readonly ?bool $phoneContact,
        public readonly ?bool $custody,
        public readonly ?bool $visitation,
        public readonly ?string $contact,
        public readonly float $childSupport,
        public readonly string $createdAt,
        public readonly string $updatedAt,
    ) {
    }
}
