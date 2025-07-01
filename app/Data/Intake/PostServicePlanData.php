<?php

namespace App\Data\Intake;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PostServicePlanData extends Data
{
    public function __construct(
        #[Max(255)]
        public ?string $participantName,
        #[Max(255)]
        public ?string $clientNumber = null,
        public ?bool $parentingSkillDevelopmentIsServiceArea = null,
        public ?bool $effectiveCoParentingIsServiceArea = null,
        public ?bool $employmentAndEducationIsServiceArea = null,
        public ?bool $childSupportIsServiceArea = null,
        public ?bool $domesticViolenceIsServiceArea = null,
        #[Max(255)]
        public ?string $serviceIdentifiedByParticipant = null,
        #[Max(255)]
        public ?string $goal = null,
        #[Max(255)]
        public ?string $custodyVisitationStrategy = null,
        #[Max(255)]
        public ?string $custodyVisitationPersonResponsible = null,
        #[Max(255)]
        public ?string $custodyVisitationTimeline = null,
        #[Max(255)]
        public ?string $custodyVisitationMeasureOfSuccess = null,
        #[Max(255)]
        public ?string $educationEmploymentStrategy = null,
        #[Max(255)]
        public ?string $educationEmploymentPersonResponsible = null,
        #[Max(255)]
        public ?string $educationEmploymentTimeline = null,
        #[Max(255)]
        public ?string $educationEmploymentMeasureOfSuccess = null,
        #[Max(255)]
        public ?string $housingTransportationStrategy = null,
        #[Max(255)]
        public ?string $housingTransportationPersonResponsible = null,
        #[Max(255)]
        public ?string $housingTransportationTimeline = null,
        #[Max(255)]
        public ?string $housingTransportationMeasureOfSuccess = null,
        #[Max(255)]
        public ?string $participantSignature = null,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public ?CarbonImmutable $participantSignatureDate = null,
        #[Max(255)]
        public ?string $caseManagerSignature = null,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public ?CarbonImmutable $caseManagerSignatureDate = null,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public ?CarbonImmutable $dateCompleted = null,
    ) {
    }
}
