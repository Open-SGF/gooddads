<?php

namespace App\Data\Intake;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateFatherhoodSurveyData extends Data
{
    public function __construct(
        #[Nullable, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $dateOfBirth = null,

        #[Required, StringType, Max(191)]
        public ?string $fatherhoodProgram = null,

        // Reason fields (boolean)
        #[Required, BooleanType]
        public ?bool $reasonBecomeResponsibleFather = null,

        #[Required, BooleanType]
        public ?bool $reasonReferred = null,

        #[Required, BooleanType]
        public ?bool $reasonCourtOrdered = null,

        #[Required, BooleanType]
        public ?bool $reasonAddressChildSupportConcerns = null,

        #[Required, BooleanType]
        public ?bool $reasonOther = null,

        #[Nullable, StringType, Max(191), RequiredIf('reasonOther', 'true')]
        public ?string $reasonOtherDescription = null,

        // Referred by fields (boolean)
        #[Required, BooleanType]
        public ?bool $referredByWordOfMouth = null,

        #[Required, BooleanType]
        public ?bool $referredByPastParticipant = null,

        #[Required, BooleanType]
        public ?bool $referredByFamilySupportDivision = null,

        #[Required, BooleanType]
        public ?bool $referredByProsecutingAttorney = null,

        #[Required, BooleanType]
        public ?bool $referredByMarketing = null,

        #[Required, BooleanType]
        public ?bool $referredByOrganizationItself = null,

        #[Required, BooleanType]
        public ?bool $referredByOther = null,

        #[Nullable, StringType, Max(191), RequiredIf('referredByOther', 'true')]
        public ?string $referredByOtherSource = null,

        // Expectations fields (boolean)
        #[Required, BooleanType]
        public ?bool $employmentOpportunitiesExpected = null,

        #[Required, BooleanType]
        public ?bool $assistanceWithAlcoholAbuseExpected = null,

        #[Required, BooleanType]
        public ?bool $increasedEmphasisOnParentingSkillsExpected = null,

        #[Required, BooleanType]
        public ?bool $accessToMentorsResourcesOutsideProgramExpected = null,

        #[Required, BooleanType]
        public ?bool $resumeBuildingSkillsExpected = null,

        #[Required, BooleanType]
        public ?bool $freeLegalServicesExpected = null,

        #[Required, BooleanType]
        public ?bool $assistanceWithCriminalHistoryExpected = null,

        #[Required, BooleanType]
        public ?bool $assistanceWithCreditRepairExpected = null,

        #[Required, BooleanType]
        public ?bool $assistanceWithOvercomingHomelessnessExpected = null,

        #[Required, BooleanType]
        public ?bool $assistanceWithVisitationCustodyExpected = null,

        #[Required, BooleanType]
        public ?bool $increasedUnderstandingOfChildSupportIssuesExpected = null,

        #[Required, BooleanType]
        public ?bool $maintainingHopeForTheFutureExpected = null,

        #[Required, BooleanType]
        public ?bool $helpObtainingInformationAboutHealthWellnessExpected = null,

        #[Required, BooleanType]
        public ?bool $otherExpected = null,

        #[Nullable, StringType, Max(191), RequiredIf('otherExpected', 'true')]
        public ?string $otherExpectationsDescription = null,
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
