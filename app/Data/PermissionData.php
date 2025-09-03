<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapInputName(SnakeCaseMapper::class)]
class PermissionData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $guard_name,
    ) {
    }
}
