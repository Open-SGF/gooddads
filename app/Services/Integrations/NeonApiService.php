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
        $this->apiKey = config('services.neon.api_key');
    }

    private function fetch(string $endpoint, array $fields = [], ?int $personId = null, bool $useWhereClause = true): array
    {
        $url = "{$this->baseUrl}/data/{$endpoint}";

        $params = [
            'key' => $this->apiKey,
        ];

        if (! empty($fields)) {
            $params['fields'] = json_encode($fields);
        }

        // Add WHERE clause only if requested
        if ($personId !== null && $useWhereClause) {
            $params['where'] = json_encode([
                'whereType' => 'AND',
                'clauses' => [
                    [
                        'fieldName' => 'persons_id',
                        'operator' => '=',
                        'operand' => $personId,
                        'type' => 'id',
                    ],
                ],
            ]);
        }

        $response = Http::get($url, $params);
        $response->throw();

        return $response->json() ?? [];
    }

    public function getTodaysParticipants(): array
    {
        $url = "{$this->baseUrl}/data/persons";

        $fields = [
            // Contact info
            'fullName',
            'firstName',
            'middleName',
            'lastName',
            'homeCellPhone',
            'fullAddress',
            'city',
            'state',
            'zip',
            'email',
            'regions_id',
            'enteredDate',
            'updatedDate',

        ];

        $response = Http::get($url, [
            'fields' => json_encode($fields),
            'key' => $this->apiKey,
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
            'key' => $this->apiKey,
        ]);

        $response->throw(); // will raise exception if not 200

        return $response->json();
    }

    public function fetchPersonContactInfo(int $personId): array
    {
        return $this->fetch("persons/{$personId}", [
            'regions_id',
            'firstName',
            'middleName',
            'lastName',
            'applicationDate',
            'address1',
            'address2',
            'city',
            'state',
            'zip',
            'employer',
            'tShirtSize',
            'homeCellPhone',
            'workPhone',
            'otherNumber',
            'email',
            'probationParoleCaseWorkerName',
            'probationParoleCaseWorkerPhone',
            'contactWithChildren',
            'contactType',
            'monthlyChildSupportPayment',
            'maritalStatus',
            'ethnicity',
            'enteredDate',
            'updatedDate',
        ]);
    }

    public function fetchPersonChildren(int $personId): array
    {
        return $this->fetch('persons_applications_children', [
            'firstName',
            'lastName',
            // Age to be calculated from dateOfBirth
            'dateOfBirth',
            'enteredDate',
            'updatedDate',
        ], $personId);
    }

    public function fetchPersonDisclosure(int $personId): array
    {
        return $this->fetch('persons_applications', [
            'enteredDate',
            'updatedDate',
        ], $personId);
    }

    public function fetchPersonAssessment(int $personId): array
    {
        return $this->fetch('persons_assessment_worksheet', [
            'enteredDate',
            'updatedDate',
        ], $personId);
    }

    public function fetchPersonSurvey(int $personId): array
    {
        return $this->fetch('persons_introductory_survey', [
            'enteredDate',
            'updatedDate',
        ], $personId);
    }

    public function fetchPersonServicePlan(int $personId): array
    {
        return $this->fetch('persons_service_plan', [
            'enteredDate',
            'updatedDate',
        ]);
    }

    public function buildFullParticipantRecord(int $personId): array
    {
        return [
            'contactInfo' => $this->fetchPersonContactInfo($personId, false),
            'children' => $this->fetchPersonChildren($personId, true),
            'disclosure' => $this->fetchPersonDisclosure($personId, true),
            'assessment' => $this->fetchPersonAssessment($personId, true),
            'survey' => $this->fetchPersonSurvey($personId, true),
            'servicePlan' => $this->fetchPersonServicePlan($personId, true),
        ];
    }
}
