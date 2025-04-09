<?php

namespace App\Data;

use App\Models\User;
use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public string $id,
        public string $firstName,
        public string $lastName,
        public string $email,
        /** @var string[] $roles */
        public array $roles,
        /** @var string[] $permissions */
        public array $permissions,
        public ?Carbon $createdAt,
        public ?Carbon $updatedAt,
        public ?string $emailVerifiedAt
    ) {
    }

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            firstName: $user->first_name,
            lastName: $user->last_name,
            email: $user->email,
            roles: $user->getRoleNames()->toArray(),
            permissions: $user->getAllPermissions()->pluck('name')->toArray(),
            createdAt: $user->created_at,
            updatedAt: $user->updated_at,
            emailVerifiedAt: $user->email_verified_at
        );
    }
}
