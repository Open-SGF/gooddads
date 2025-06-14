<?php

namespace App\Data\Forms;

use App\Enums\Roles;
use App\Models\User;
use App\Rules\UsPhoneNumber;
use Spatie\LaravelData\Attributes\Hidden;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\AcceptedIf;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class UserRegistrationForm extends Data
{
    public function __construct(
        #[Max(191)]
        public string $firstName,

        #[Max(191)]
        public string $lastName,

        #[Max(191), Email, Unique(User::class)]
        public string $email,

        #[Max(12), UsPhoneNumber]
        public string $phoneNumber,

        #[Password, Max(191)]
        public string $password,

        #[Password, Max(191), AcceptedIf('password', 'equals_this'), Hidden]
        public string $passwordConfirmation,

        public Roles $role
    ) {
    }
}
