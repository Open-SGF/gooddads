<?php

namespace App\Services\Formatter;

class PhoneFormatter
{
    public static function format(string $phone, string $delimiter = '-'): string
    {
        // Remove all non-numeric characters
        $phone = preg_replace('/\D/', '', $phone);

        // Remove leading 1 if present
        if (strlen($phone) > 10 && $phone[0] === '1') {
            $phone = substr($phone, 1);
        }

        // Remove trailing digits if present
        if (strlen($phone) > 10) {
            $phone = substr($phone, 0, 10);
        }

        // Format phone number "NNN-NNN-NNNN"
        $formatted = preg_replace('/(\d{3})(\d{3})(\d{4})/', '$1-$2-$3', $phone);

        // Update delimiter if present
        if ($delimiter !== '-') {
            $formatted = str_replace('-', $delimiter, $formatted);
        }

        return $formatted;
    }
}
