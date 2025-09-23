<?php

namespace App\Services;

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

    public function getParticipant(int $id): array
    {
        $fields = [
            'persons_id',
            'fullName',
            'homeCellPhone',
            'fullAddress',
            'city',
            'state',
            'zip',
            'email',
            'regions_id',
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
