<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
class ValidSocialSecurityNumber implements ValidationRule
{
    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        // Remove any hyphens, spaces, or other non-digit characters
        $ssn = preg_replace('/[^0-9]/', '', $value);

        // Check if we have exactly 9 digits
        if (strlen($ssn) !== 9) {
            $fail($this->message());
            return;
        }

        // Split into the three parts
        $area = substr($ssn, 0, 3);    // First 3 digits
        $group = substr($ssn, 3, 2);   // Middle 2 digits
        $serial = substr($ssn, 5, 4);  // Last 4 digits

        // Basic SSN validation rules
        // 1. Cannot start with 000
        if ($area === '000') {
            $fail($this->message());
            return;
        }

        // 2. Cannot start with 666
        if ($area === '666') {
            $fail($this->message());
            return;
        }

        // 3. Cannot start with 900-999 (reserved for ITINs and other special cases)
        if ($area >= '900' && $area <= '999') {
            $fail($this->message());
            return;
        }

        // 4. Middle group cannot be 00
        if ($group === '00') {
            $fail($this->message());
            return;
        }

        // 5. Serial number cannot be 0000
        if ($serial === '0000') {
            $fail($this->message());
            return;
        }

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'The :attribute must be a valid Social Security Number.';
    }
}