<?php

namespace App\Data\Forms;

use App\Rules\ValidSocialSecurityNumber;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\Validation\Before;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Sometimes;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantFatherhoodAssessmentForm extends Data
{
    public function __construct(
        #[Sometimes, StringType, Max(191)]
        public ?string $vendorName = null,

        #[Required, StringType, Max(191)]
        public ?string $participantName = null,

        #[Required, Date, Before('today')]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $dateOfBirth = null,

        #[Required, StringType, Max(191)]
        // Custom validation rule needs to be applied in the rules method
        public ?string $socialSecurityNumber = null,

        #[Required, BooleanType]
        public ?bool $isMissouriResident = null,

        #[Required, BooleanType]
        public ?bool $childIsUnder18 = null,

        #[Required, BooleanType]
        public ?bool $isFinanciallyEligible = null,

        #[Required, BooleanType]
        public ?bool $driversLicenseProvided = null,

        #[Required, BooleanType]
        public ?bool $utilityBillProvided = null,

        #[Required, BooleanType]
        public ?bool $payStubProvided = null,

        #[Required, BooleanType]
        public ?bool $writtenEmployerStatementProvided = null,

        #[Required, BooleanType]
        public ?bool $socialSecurityBenefitsProvided = null,

        #[Required, BooleanType]
        public ?bool $selfAttestationProvided = null,

        #[Required, BooleanType]
        public ?bool $unemploymentCompensationProvided = null,

        #[Required, BooleanType]
        public ?bool $otherProvided = null,

        #[Nullable, StringType, Max(191)]
        public ?string $otherProvidedName = null,

        #[Required, Numeric, Min(0)]
        public ?float $grossMonthlyHouseholdIncome = null,

        #[Required, IntegerType, Min(1)]
        public ?int $numberOfFamilyMembers = null,

        #[Required, Numeric, Min(0)]
        public ?float $percentageOfFpl = null,

        #[Nullable, BooleanType]
        public ?bool $approvedForServices = null,

        #[Nullable, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $stateAgencyReviewDate = null,
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

    public function rules(): array
    {
        return [
            // Add the custom validator for SSN
            'socialSecurityNumber' => ['required', 'string', 'max:191', new ValidSocialSecurityNumber()],
            'percentageOfFpl' => ['required', 'numeric', 'min:0', 'max:99.99'],
        ];
    }
}
