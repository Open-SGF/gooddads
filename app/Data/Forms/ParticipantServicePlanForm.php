<?php

namespace App\Data\Forms;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Sometimes;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantServicePlanForm extends Data
{
    public function __construct(
        #[Required, StringType, Max(191)]
        public ?string $participantName = null,

        #[Required, StringType, Max(191)]
        public ?string $clientNumber = null,

        #[Required, BooleanType]
        public ?bool $parentingSkillDevelopmentIsServiceArea = null,

        #[Required, BooleanType]
        public ?bool $effectiveCoParentingIsServiceArea = null,

        #[Required, BooleanType]
        public ?bool $employmentAndEducationIsServiceArea = null,

        #[Required, BooleanType]
        public ?bool $childSupportIsServiceArea = null,

        #[Required, BooleanType]
        public ?bool $domesticViolenceIsServiceArea = null,

        #[Nullable, StringType, Max(191)]
        public ?string $serviceIdentifiedByParticipant = null,

        #[Required, StringType]
        public ?string $goal = null,

        #[Required, Nullable, StringType]
        public ?string $custodyVisitationStrategy = null,

        #[Required, Nullable, StringType, Max(191)]
        public ?string $custodyVisitationPersonResponsible = null,

        #[Required, Nullable, StringType, Max(191)]
        public ?string $custodyVisitationTimeline = null,

        #[Required, Nullable, StringType]
        public ?string $custodyVisitationMeasureOfSuccess = null,

        #[Required, Nullable, StringType]
        public ?string $educationEmploymentStrategy = null,

        #[Required, Nullable, StringType, Max(191)]
        public ?string $educationEmploymentPersonResponsible = null,

        #[Required, Nullable, StringType, Max(191)]
        public ?string $educationEmploymentTimeline = null,

        #[Required, Nullable, StringType]
        public ?string $educationEmploymentMeasureOfSuccess = null,

        #[Required, Nullable, StringType]
        public ?string $housingTransportationStrategy = null,

        #[Required, Nullable, StringType, Max(191)]
        public ?string $housingTransportationPersonResponsible = null,

        #[Required, Nullable, StringType, Max(191)]
        public ?string $housingTransportationTimeline = null,

        #[Required, Nullable, StringType]
        public ?string $housingTransportationMeasureOfSuccess = null,

        #[Sometimes, StringType, Max(191)]
        public ?string $participantSignature = null,

        #[Sometimes, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $participantSignatureDate = null,

        #[Sometimes, StringType, Max(191)]
        public ?string $caseManagerSignature = null,

        #[Sometimes, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $caseManagerSignatureDate = null,

        #[Nullable, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $dateCompleted = null,
    ) {
    }

    public static function fromArray(array $data): self
    {
        // Convert snake_case keys to camelCase
        $camelCaseData = collect($data)->mapWithKeys(function ($value, $key) {
            return [Str::camel($key) => $value];
        })->all();

        return parent::from($camelCaseData);
    }
}
