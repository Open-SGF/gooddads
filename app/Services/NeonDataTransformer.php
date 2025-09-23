<?php

namespace App\Services;

class NeonDataTransformer
{
    public function transformPerson(array $data): object
    {
        $record = $data['records'][0] ?? [];

        return (object) [
            'id' => $record['persons_id']['value'] ?? null,
            'full_name' => $record['fullName']['displayValue'] ?? null,
            'phone' => $record['homeCellPhone']['displayValue'] ?? null,
            'address' => $record['fullAddress']['displayValue'] ?? null,
            'city' => $record['city']['displayValue'] ?? null,
            'state' => $record['state']['displayValue'] ?? null,
            'zip' => $record['zip']['displayValue'] ?? null,
            'email' => $record['email']['displayValue'] ?? null,
            'region' => $record['regions_id']['displayValue'] ?? null,
            'submission_date' => now(), // or parse if available
        ];
    }
}
