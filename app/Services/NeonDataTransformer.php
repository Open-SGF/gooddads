<?php

namespace App\Services;

// use Carbon\Carbon;

class NeonDataTransformer
{
    public function transformPerson(array $data): object
    {
        $record = $data['records'][0] ?? [];

        return (object) [

            // Core identity
            'id' => $record['persons_id']['value'] ?? null,
            'first_name' => $record['firstName']['displayValue'] ?? null,
            'middle_name' => $record['middleName']['displayValue'] ?? null,
            'last_name' => $record['lastName']['displayValue'] ?? null,
            'full_name' => $record['fullName']['displayValue'] ?? null,

            // Contact
            'phone' => $record['homeCellPhone']['displayValue'] ?? null,
            'other_phone' => $record['otherNumber']['displayValue'] ?? null,
            'work_phone' => $record['workPhone']['displayValue'] ?? null,
            'email' => $record['email']['displayValue'] ?? null,

            // Address
            'address1' => $record['address1']['displayValue'] ?? null,
            'address2' => $record['address2']['displayValue'] ?? null,
            'address' => $record['fullAddress']['displayValue'] ?? null, // already concatenated
            'city' => $record['city']['displayValue'] ?? null,
            'state' => $record['state']['displayValue'] ?? null,
            'zip' => $record['zip']['displayValue'] ?? null,
            'region' => $record['regions_id']['displayValue'] ?? null,

            // Demographics
            'ethnicity' => $record['ethnicity']['displayValue'] ?? null,
            'marital_status' => $record['maritalStatus']['displayValue'] ?? null,
            'tshirt_size' => $record['tShirtSize']['displayValue'] ?? null,

            // Employment
            'employer' => $record['employer']['displayValue'] ?? null,

            // Case Worker
            'case_worker_name' => $record['probationParoleCaseWorkerName']['displayValue'] ?? null,
            'case_worker_phone' => $record['probationParoleCaseWorkerPhone']['displayValue'] ?? null,

            // Application Info
            'application_status' => $record['applicationStatus']['displayValue'] ?? null,
            // 'application_date' => isset($record['applicationDate']['value'])
            //     ? Carbon::parse($record['applicationDate']['value'])
            //     : null,

            // Child Support
            'monthly_child_support' => $record['monthlyChildSupportPayment']['displayValue'] ?? null,

            // Contact with children
            'contact_with_children' => $record['contactWithChildren']['displayValue'] ?? null,
            'contact_type' => $record['contactType']['displayValue'] ?? null, // multiple select may be comma-separated

            // Dates
            'submission_date' => now(),
            // 'entered_date' => isset($record['enteredDate']['value'])
            //     ? Carbon::parse($record['enteredDate']['value'])
            //     : null,
            // 'updated_date' => isset($record['updatedDate']['value'])
            //     ? Carbon::parse($record['updatedDate']['value'])
            //     : null,
        ];
    }
}
