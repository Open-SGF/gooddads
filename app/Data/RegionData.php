<?php

namespace App\Data;

use App\Models\Region;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RegionData extends Data
{
    public function __construct(
        #[Max(36)]
        public readonly string $id,
        public readonly string $description,
        #[WithCast(DateTimeInterfaceCast::class)]
        public readonly Carbon $createdAt,
        #[WithCast(DateTimeInterfaceCast::class)]
        public readonly Carbon $updatedAt,
    ) {
    }

    public static function fromModel(Region $region): self
    {
        return new self(
            id: $region->id,
            description: $region->description,
            createdAt: $region->created_at,
            updatedAt: $region->updated_at,
        );
    }
}
