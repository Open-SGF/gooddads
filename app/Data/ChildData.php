<?php

namespace App\Data;

use App\Models\Child;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ChildData extends Data
{
    public function __construct(
        #[Max(36)]
        public string $id,
        #[Max(36)]
        public string $participantId,
        #[Max(255)]
        public string $firstName,
        #[Max(255)]
        public string $lastName,
        #[WithCast(DateTimeInterfaceCast::class)]
        public CarbonImmutable $dateOfBirth,
        public ?bool $phoneContact,
        public ?bool $custody,
        public ?bool $visitation,
        public ?string $contact,
        #[Regex('^-?\d{1,4}(\.\d{2})$')]
        public float $childSupport,
        #[WithCast(DateTimeInterfaceCast::class)]
        public Carbon $createdAt,
        #[WithCast(DateTimeInterfaceCast::class)]
        public Carbon $updatedAt,
    ) {
    }

    public static function fromModel(Child $child): self
    {
        return new self(
            id: $child->id,
            participantId: $child->participant_id,
            firstName: $child->first_name,
            lastName: $child->last_name,
            dateOfBirth: $child->date_of_birth,
            phoneContact: $child->phone_contact,
            custody: $child->custody,
            visitation: $child->visitation,
            contact: $child->contact,
            childSupport: $child->child_support,
            createdAt: $child->created_at,
            updatedAt: $child->updated_at,
        );
    }
}
