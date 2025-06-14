<?php

namespace App\Data;

use App\Enums\Permissions;
use App\Enums\Roles;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapInputName(SnakeCaseMapper::class)]
class UserData extends Data
{
    public function __construct(
        public string $id,
        public string $firstName,
        public string $lastName,
        public string $email,
        public Roles $roles,
        public Permissions $permissions,
        public ?string $emailVerifiedAt,
        public Carbon $createdAt,
        public Carbon $updatedAt,
    ) {
    }
}
