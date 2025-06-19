<?php

namespace App\Data\Intake;

use App\Rules\ValidSocialSecurityNumber;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Before;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Sometimes;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateFatherhoodAssessmentData extends Data
{
    public function __construct(
        #[Sometimes, Max(191)]
        public ?string $vendorName,
        #[Max(191)]
        public ?string $participantName,
        #[Before('today')]
        public ?CarbonImmutable $dateOfBirth,
        #[Max(191), ValidSocialSecurityNumber]
        public ?string $socialSecurityNumber,
        public ?bool $isMissouriResident,
        public ?bool $childIsUnder18,
        public ?bool $isFinanciallyEligible,
        public ?bool $driversLicenseProvided,
        public ?bool $utilityBillProvided,
        public ?bool $payStubProvided,
        public ?bool $writtenEmployerStatementProvided,
        public ?bool $socialSecurityBenefitsProvided,
        public ?bool $selfAttestationProvided,
        public ?bool $unemploymentCompensationProvided,
        public ?bool $otherProvided,
        #[Max(191)]
        public ?string $otherProvidedName,
        #[Min(0)]
        public ?float $grossMonthlyHouseholdIncome,
        #[Min(1)]
        public ?int $numberOfFamilyMembers,
        #[Min(0), Max(99.99)]
        public ?float $percentageOfFpl,
        public ?bool $approvedForServices,
        public ?CarbonImmutable $stateAgencyReviewDate,
    ) {
    }
}
