<?php

namespace App\Data\Props;

use Spatie\LaravelData\Attributes\Validation\Url;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RequestProp extends Data
{
    public function __construct(
        #[Url]
        public string $location,
        
        /** @var array<string, string> $query */
        public array $query
    ) {
    }
}
