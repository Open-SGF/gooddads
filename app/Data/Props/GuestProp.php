<?php

namespace App\Data\Props;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class GuestProp extends Data
{
    public function __construct(
        public null $user,
    ) {
    }
}
