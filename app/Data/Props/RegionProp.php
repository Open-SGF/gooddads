<?php

namespace App\Data\Props;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RegionProp extends Data
{
    public string $id;
    public string $description;
}