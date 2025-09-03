<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;

enum Ethnicity: string
{
    use EnumDisplayArray;
    case White = 'white';
    case AfricanAmerican = 'africanAmerican';
    case NativeAmerican = 'nativeAmerican';
    case Asian = 'asian';
    case PacificIslander = 'pacificIslander';
    case Hispanic = 'hispanic';
    case NoAnswer = 'noAnswer';

    public function displayValue(): string
    {
        return match ($this) {
            self::White => 'White',
            self::AfricanAmerican => 'Black or African American',
            self::Asian => 'Asian',
            self::Hispanic => 'Hispanic or Latino',
            self::NativeAmerican => 'American Indian or Alaska Native',
            self::PacificIslander => 'Native Hawaiian or Islander',
            self::NoAnswer => 'Prefer Not To Answer',
            default => $this->defaultDisplayValue(),
        };
    }
}
