<?php

namespace App\Rules;

use Attribute;
use Illuminate\Contracts\Validation\ValidationRule;

#[Attribute]
class ValidSocialSecurityNumber implements ValidationRule
{
    protected string $message = 'The :attribute must be a valid Social Security Number.';

    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        // Remove any hyphens, spaces, or other non-digit characters
        $ssn = preg_replace('/[^0-9]/', '', $value);

        // Check if we have exactly 9 digits
        if (strlen($ssn) !== 9) {
            $fail($this->message);
            return;
        }

        $area = substr($ssn, 0, 3);
        $group = substr($ssn, 3, 2);
        $serial = substr($ssn, 5, 4);

        /**
         * Basic SSN validation rules
         *
         * Cannot start with 000
         * Cannot start with 666
         * Cannot start with 900-999 (reserved for ITINs and other special cases)
         * Middle group cannot be 00
         * Serial number cannot be 0000
         */
        if ($area === '000' ||
            $area === '666' ||
            ($area >= '900' && $area <= '999') ||
            $group === '00' ||
            $serial === '0000') {
            $fail($this->message);
        }
    }
}
