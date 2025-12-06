<?php

namespace App\Enums;

use App\Concerns\EnumDisplayArray;

enum Permissions: string
{
    use EnumDisplayArray;

    case CreateUsers = 'create users';
    case EditUsers = 'edit users';
    case DeleteUsers = 'delete users';
    case ListUsers = 'list users';
    case ViewUsers = 'view users';
    case ListCurriculum = 'list curriculum';
    case ListClasses = 'list classes';
    case ListReports = 'list reports';

    public function displayValue(): string
    {
        return match ($this) {
            self::CreateUsers => 'Create Users',
            self::EditUsers => 'Edit Users',
            self::DeleteUsers => 'Delete Users',
            self::ListUsers => 'List Users',
            self::ViewUsers => 'View Users',
            self::ListCurriculum => 'List Curriculum',
            self::ListClasses => 'List Classes',
            self::ListReports => 'List Reports',
            default => $this->defaultDisplayValue(),
        };
    }
}
