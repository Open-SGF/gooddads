<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapInputName(SnakeCaseMapper::class)]
class ParticipantMediaReleaseData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $participantId,
        public readonly string $printedName,
        public readonly string $signature,
        public readonly ?Carbon $signatureDate,
        public readonly string $phoneNumber,
        public readonly string $email,
        public readonly ?Carbon $dateCompleted,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {
    }
}
