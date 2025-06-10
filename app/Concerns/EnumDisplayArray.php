<?php

namespace App\Concerns;

use BackedEnum as Enum;

/**
 * @mixin Enum
 */
trait EnumDisplayArray
{
    public function defaultDisplayValue(): string
    {
        return str($this->value)
            ->snake()
            ->replace('-', ' ')
            ->replace('_', ' ')
            ->title()
            ->value();
    }

    // this can be overridden in the enum class for specific names
    public function displayValue(): string
    {
        return $this->defaultDisplayValue();
    }

    public static function displayArray(array $displayOnly = []): array
    {
        $displayValues = count($displayOnly) > 0 ? $displayOnly : self::cases();

        if (! method_exists(self::class, 'cases')) {
            return [];
        }

        $cases = collect($displayValues);

        return $cases
            ->mapWithKeys(function ($case) {
                return [
                    $case->value => $case->displayValue(),
                ];
            })
            ->toArray();
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
