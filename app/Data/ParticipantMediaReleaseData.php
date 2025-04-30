<?php

namespace App\Data;

use App\Models\ParticipantMediaRelease;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantMediaReleaseData extends Data
{
    public function __construct(
        #[Max(36)]
        public string $id,
        #[Max(36)]
        public string $participantId,
        #[Max(225)]
        public string $printedName,
        #[Max(225)]
        public string $signature,
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?CarbonImmutable $signatureDate,
        #[Max(255)]
        public string $phoneNumber,
        #[Max(255)]
        public string $email,
        #[WithCast(DateTimeInterfaceCast::class)]
        public CarbonImmutable $dateCompleted,
        #[WithCast(DateTimeInterfaceCast::class)]
        public Carbon $createdAt,
        #[WithCast(DateTimeInterfaceCast::class)]
        public Carbon $updatedAt,
    ) {
    }

    public static function fromModel(ParticipantMediaRelease $mediaRelease): self
    {
        return new self(
            id: $mediaRelease->id,
            participantId: $mediaRelease->participant_id,
            printedName: $mediaRelease->printed_name,
            signature: $mediaRelease->signature,
            signatureDate: $mediaRelease->signature_date,
            phoneNumber: $mediaRelease->phone_number,
            email: $mediaRelease->email,
            dateCompleted: $mediaRelease->date_completed,
            createdAt: $mediaRelease->created_at,
            updatedAt: $mediaRelease->updated_at,
        );
    }
}
