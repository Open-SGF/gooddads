<?php

namespace App\Data\Forms;

use App\Rules\UsPhoneNumber;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\AcceptedIf;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\CamelCaseMapper;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class UserRegistrationForm extends Data
{
    public function __construct(
        #[StringType, Max(191)]
        public string $firstName,
        #[StringType, Max(191)]
        public string $lastName,
        #[StringType, Max(191), Email]
        public string $email,
        #[StringType, Max(12), UsPhoneNumber]
        public string $phoneNumber,
        #[StringType, Password, Max(191)]
        public string $password,
        #[StringType, Password, Max(191), AcceptedIf('password', 'equals_this')]
        public string $passwordConfirmation,
    ) {
    }
}
