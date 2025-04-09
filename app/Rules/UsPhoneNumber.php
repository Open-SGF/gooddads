<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UsPhoneNumber implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Regular expression for US phone number format (XXX) XXX-XXXX or XXX-XXX-XXXX or just XXXXXXXXXX
        $regex = '/^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/';

        if (! preg_match($regex, $value)) {
            $fail('The :attribute must be a valid US phone number.');
        }
    }

}
