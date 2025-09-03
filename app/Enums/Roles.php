<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;

enum Roles: string
{
    use EnumDisplayArray;
    case Admin = 'admin';
    case Director = 'director';
    case RegionDirector = 'region director';
    case ProgramDirector = 'program director';
    case Facilitator = 'facilitator';
    case Auditor = 'auditor';
    case Participant = 'participant';

    public function displayValue(): string
    {
        return match ($this) {
            self::Admin => 'Admin',
            self::Director => 'Director',
            self::RegionDirector => 'Region Director',
            self::ProgramDirector => 'Program Director',
            self::Facilitator => 'Facilitator',
            self::Auditor => 'Auditor',
            self::Participant => 'Participant',
            default => $this->defaultDisplayValue(),
        };
    }
}