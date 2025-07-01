<?php

namespace App\Data\Auth;

use App\Enums\Roles;
use App\Models\User;
use App\Rules\UsPhoneNumber;
use Spatie\LaravelData\Attributes\Hidden;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\AcceptedIf;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class PostUserData extends Data
{
    public function __construct(
        #[Max(255)]
        public string $firstName,
        #[Max(255)]
        public string $lastName,
        #[Max(255), Email, Unique(User::class)]
        public string $email,
        #[Max(12), UsPhoneNumber]
        public string $phoneNumber,
        #[Password, Max(255)]
        public string $password,
        #[Password, Max(255), AcceptedIf('password', 'equals_this'), Hidden]
        public string $passwordConfirmation,
        #[Enum(Roles::class), Optional, Hidden]
        public ?string $role
    ) {
    }
}
