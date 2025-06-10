<?php

namespace App\Services\TypeScript;

use ReflectionClass;
use Spatie\TypeScriptTransformer\Transformers\Transformer;

class EnumArrayTransformer implements Transformer
{
    public function transform(ReflectionClass $class, string $name): ?TransformedType
    {
    }
}
