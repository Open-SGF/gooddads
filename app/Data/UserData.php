<?php

namespace App\Data;

use App\Enums\Permissions;
use App\Enums\Roles;
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
        #[MapInputName('role_names')]
        /** @var Roles[] */
        public array $roles,
        #[MapInputName('permission_names')]
        /** @var Permissions[] */
        public array $permissions,
        public ?string $emailVerifiedAt,
        public bool $active,
    ) {
    }
}
