<?php

namespace App\Data\Props;

use App\Enums\ToastType;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ToastProp extends Data
{
    public function __construct(
        public string $message,
        public ToastType $type
    ) {
    }
}