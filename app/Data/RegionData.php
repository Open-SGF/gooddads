<?php

namespace App\Data;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\Region;
use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RegionData extends Data
{
    public function __construct(
        public string $id,
        public string $description,
    ) {
    }

    public static function fromModel(User $user): self
    {
        return new self(
            id: $region->id,
            description: $region->description,
        );
    }
}
