<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\Permission\Models\Permission;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PermissionData extends Data
{
    public function __construct(
        #[Max(36)]
        public readonly int|string $id,
        #[Max(255)]
        public readonly string $name,
        #[Max(255)]
        public readonly string $guard_name,
    ) {
    }

    public static function fromModel(Permission $permission): self
    {
        return new self(
            id: $permission->id,
            name: $permission->name,
            guard_name: $permission->guard_name,
        );
    }
}
