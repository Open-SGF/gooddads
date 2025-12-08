<?php

namespace App\Services\Integrations;

use Illuminate\Support\Facades\Http;

use Exception;

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

        $responseJson = $response->json() ?? [];
        
        if (isset($responseJson['status']) && $responseJson['status'] === 'error') {
            throw new Exception(
                $responseJson['errorMessage'] ?? 'Unknown error',
                $responseJson['errorCode'] ?? 0
            );
        }

        return $responseJson;
    }

    public function getTodaysParticipants(): array
    {
        $url = "{$this->baseUrl}/data/persons";

        $fields = [
            // Contact info
            'fullName',
            'enteredDate',
            'updatedDate',
        ];

        $response = Http::get($url, [
            'fields' => json_encode($fields),
            'key' => $this->apiKey,
        ]);

        $response->throw(); // will raise exception if not 200

        $data = $response->json() ?? [];

        return $data['records'] ?? [];
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

    public function fetchPersonContactInfo(int $personId, bool $useWhereClause): array
    {
        return $this->fetch("persons/{$personId}", [
            "regions_id",
            "enteredDate",
            "address1",
            "address2",
            "city",
            "state",
            "zip",
            "employer",
            "tShirtSize",
            "homeCellPhone",
            "workPhone",
            "otherNumber",
            "email",
            "probationParoleCaseWorkerName",
            "probationParoleCaseWorkerPhone",
            "contactWithChildren",
            "contactType",
            "monthlyChildSupportPayment",
            "maritalStatus",
            "ethnicity"
        ], $useWhereClause);
    }

    public function fetchPersonChildren(int $personId, bool $useWhereClause): array
    {
        return $this->fetch('persons_applications_children', [
            'firstName',
            'lastName',
            // Age to be calculated from dateOfBirth
            'dateOfBirth',
        ], $personId, $useWhereClause);
    }

    public function fetchPersonDisclosure(int $personId, bool $useWhereClause): array
    {
        return $this->fetch('persons_applications', [
            "persons_id",
            "division",
            "divisionOther",
            "homeCellPhone",
            "dateOfBirth",
            "fullAddress",
            "city",
            "state",
            "email",
            "releaseTo",
            "releaseToOther",
            "releaseToOtherAddress",
            "purposeOfDisclosure",
            "programName",
            "purposeOfDisclosureOther",
            "informationToBeDisclosed",
            "informationToBeDisclosedOther",
            "acceptsTextMessage"
        ], $personId, 
        $useWhereClause);
    }

    public function fetchPersonAssessment(int $personId, bool $useWhereClause): array
    {
        return $this->fetch('persons_assessment_worksheet', [
            "persons_id",
            "fullName",
            "dateOfBirth",
            "missouriResident",
            "childUnder18",
            "financiallyEligible",
            "dL",
            "utilityBill",
            "payStub",
            "writtenEmployerStatement",
            "socialSecurityBenefitsStatement",
            "selfAttestationOfNoEmploymentOrIncome",
            "unemploymentCompensation",
            "other",
            "hoseholdIncome",
            "numberOfFamilyMembersInHousehold",
            "percentageOfFPL"
        ], $personId, $useWhereClause);
    }

    public function fetchPersonSurvey(int $personId, bool $useWhereClause): array
    {
        return $this->fetch('persons_introductory_survey', [
            "persons_id",
            "dateOfBirth",
            "programName",
            "reasons",
            "reasonsOther",
            "hearAboutUs",
            "hearAboutUsOther",
            "expectToGain",
            "expectToGainOther"
        ], $personId, $useWhereClause);
    }

    public function fetchPersonServicePlan(int $personId, bool $useWhereClause): array
    {
        return $this->fetch('persons_service_plan', [
            "persons_id",
            "programName",
            "clientNumber",
            "reviewDates",
            "serviceAreas",
            "serviceIdentifiedByTheParticipants",
            "goals_parentingSkills",
            "goals_parentingSkillsObj",
            "goals_parentingSkillsPersonRes",
            "goals_parentingSkillsTimeline",
            "goals_parentingSkillsMeasure",
            "goals_managingStress",
            "goals_managingStressObj",
            "goals_managingStressPersonRes",
            "goals_managingStressTimeline",
            "goals_managingStressMeasure",
            "goals_custodyVisitation",
            "goals_custodyVisitationObj",
            "goals_custodyVisitationPersonRes",
            "goals_custodyVisitationTimeline",
            "goals_custodyVisitationMeasure",
            "goals_educationEmployment",
            "goals_educationEmploymentObj",
            "goals_educationEmploymentPersonRes",
            "goals_educationEmploymentTimeline",
            "goals_educationEmploymentMeasure",
            "goals_housingTransportation",
            "goals_housingTransportationObj",
            "goals_housingTransportationPersonRes",
            "goals_housingTransportationTimeline",
            "goals_housingTransportationMeasure",
            "goals_childSupportAction",
            "goals_childSupportActionObj",
            "goals_childSupportActionPersonRes",
            "goals_childSupportActionTimeline",
            "goals_childSupportActionMeasure",
            "goals_childSupportAwareness",
            "goals_childSupportAwarenessObj",
            "goals_childSupportAwarenessPersonRes",
            "goals_childSupportAwarenessTimeline",
            "goals_childSupportAwarenessMeasure",
            "goals_effectiveCoParenting",
            "goals_effectiveCoParentingObj",
            "goals_effectiveCoParentingPersonRes",
            "goals_effectiveCoParentingTimeline",
            "goals_effectiveCoParentingMeasure",
            "goals_fatherToFatherMentoring",
            "goals_fatherToFatherMentoringObj",
            "goals_fatherToFatherMentoringPersonRes",
            "goals_fatherToFatherMentoringTimeline",
            "goals_fatherToFatherMentoringMeasure"
        ], $personId, $useWhereClause);
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
