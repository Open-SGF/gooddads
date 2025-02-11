<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;

enum Ethnicity: string
{
    use EnumDisplayArray;
    case White = 'white';
    case AfricanAmerican = 'african_american';
    case NativeAmerican = 'native_american';
    case Asian = 'asian';
    case PacificIslander = 'pacific_islander';
    case Hispanic = 'hispanic';
    case NoAnswer = 'no_answer';

    public function displayValue(): string
    {
        return match ($this) {
            self::NoAnswer => 'Prefer Not To Answer',
            default => $this->defaultDisplayValue(),
        };
    }
}
