<?php

namespace App\Data;

use App\Models\Child;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\MapOutputName;
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
class ChildData extends Data
{
    public function __construct(
        #[StringType, Max(36), Nullable]
        public string $id,

        #[StringType, Max(36), Nullable]
        public string $participantId,

        #[StringType, Max(255)]
        public string $firstName,

        #[StringType, Max(255)]
        public string $lastName,

        #[WithCast(DateTimeInterfaceCast::class)]
        public CarbonImmutable $dateOfBirth,

        #[BooleanType, Nullable]
        public ?bool $phoneContact,

        #[BooleanType, Nullable]
        public ?bool $custody,

        #[BooleanType, Nullable]
        public ?bool $visitation,

        #[StringType, Nullable]
        public ?string $contact,

        #[Numeric]
        public float $childSupport,

        #[WithCast(DateTimeInterfaceCast::class)]
        public string $createdAt,

        #[WithCast(DateTimeInterfaceCast::class)]
        public string $updatedAt,
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

    public static function fromArray(array $data): self
    {
        // Convert snake_case keys to camelCase
        $camelCaseData = collect($data)->mapWithKeys(function ($value, $key) {
            return [Str::camel($key) => $value];
        })->all();

        return parent::from($camelCaseData);
    }

    public static function rules(): array
    {
        return [
            'id' => ['nullable'],
            'participantId' => ['nullable'],
            'firstName' => ['string', 'max:255'],
            'lastName' => ['string', 'max:255'],
            'dateOfBirth' => ['date'],
            'phoneContact' => ['boolean', 'nullable'],
            'custody' => ['boolean', 'nullable'],
            'visitation' => ['boolean', 'nullable'],
            'contact' => ['string', 'nullable'],
            'childSupport' => ['numeric'],
            'createdAt' => ['nullable'],
            'updatedAt' => ['nullable'],
        ];
    }
}
