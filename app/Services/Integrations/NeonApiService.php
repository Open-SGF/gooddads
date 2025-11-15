<?php

namespace App\Services\Integrations;

use Illuminate\Support\Facades\Http;

class NeonApiService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.neon.base_url');
        $this->apiKey  = config('services.neon.api_key');
    }

    public function getTodaysParticipants(): array
    {
        $url = "{$this->baseUrl}/data/persons";

        $fields = [
            // Core identity
            'persons_id',
            'fullName',

            // Other dates
            'enteredDate',
            'updatedDate',
        ];

        $response = Http::get($url, [
            'fields' => json_encode($fields),
            'key'    => $this->apiKey,
        ]);

        $response->throw(); // will raise exception if not 200

        $temp = $response->json() ?? [];

        print_r($this->apiKey);
        print_r($temp);

        return $temp;
    }

    public function getParticipant(int $id): array
    {
        $fields = [
            // Core identity
            'persons_id',
            'firstName',
            'middleName',
            'lastName',
            'fullName',

            // Contact info
            'homeCellPhone',
            'otherNumber',
            'workPhone',
            'email',

            // Address
            'address1',
            'address2',
            'fullAddress',
            'city',
            'state',
            'zip',
            'regions_id',

            // Demographics
            'ethnicity',
            'maritalStatus',
            'tShirtSize',
            'birthday',

            // Employment
            'employer',

            // Case Worker
            'probationParoleCaseWorkerName',
            'probationParoleCaseWorkerPhone',

            // Application Info
            'applicationStatus',
            'applicationDate',

            // Child Support / Financial
            'monthlyChildSupportPayment',
            'monthlyIncome',
            'householdSize',
            'povertyPercentage',

            // Other dates
            'enteredDate',
            'updatedDate',
        ];

        $url = "{$this->baseUrl}/data/persons/{$id}";

        $response = Http::get($url, [
            'fields' => json_encode($fields),
            'key'    => $this->apiKey,
        ]);

        $response->throw(); // will raise exception if not 200

        return $response->json();
    }
}
