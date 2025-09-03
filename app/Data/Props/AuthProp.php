<?php

namespace App\Data\Props;

use App\Data\UserData;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class AuthProp extends Data
{
    public function __construct(
        public ?UserData $user,
    ) {
    }
}
