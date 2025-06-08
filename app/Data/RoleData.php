<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\Permission\Models\Role;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RoleData extends Data
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

    public static function fromModel(Role $role): self
    {
        return new self(
            id: $role->id,
            name: $role->name,
            guard_name: $role->guard_name,
        );
    }
}
