<?php

namespace App\Data\Intake;

use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Attributes\Validation\RequiredWith;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PostDisclosureAuthorizationData extends Data
{
    public function __construct(
        #[Uuid]
        public string $participantId,
        public bool $isDssAuthorized,
        public bool $isDysAuthorized,
        public bool $isMhdAuthorized,
        public bool $isDfasAuthorized,
        public bool $isMmacAuthorized,
        public bool $isFsdAuthorized,
        public bool $isCdAuthorized,
        public bool $isDlsAuthorized,
        public bool $isOtherAuthorized,
        #[RequiredIf('isOtherAuthorized', true), Max(255)]
        public ?string $otherAuthorizedEntity,
        public bool $discloseToAttorney,
        #[RequiredIf('discloseToAttorney', true), Max(255)]
        public ?string $attorneyName,
        public bool $discloseToEmployer,
        #[RequiredIf('discloseToEmployer', true), Max(255)]
        public ?string $employerName,
        public bool $discloseToLegislator,
        #[RequiredIf('discloseToLegislator', true), Max(255)]
        public ?string $legislatorName,
        public bool $discloseToGovernorsStaff,
        #[RequiredIf('discloseToGovernorsStaff', true), Max(255)]
        public ?string $governorsStaffDetails,
        public bool $discloseToOtherRecipient,
        #[RequiredIf('discloseToOtherRecipient', true), Max(255)]
        public ?string $otherRecipientDetails,
        public DisclosurePurposeType $purposes,
        #[RequiredIf('purposes', DisclosurePurposeType::OTHER->value), Max(255)]
        public ?string $otherPurposeDetails,
        public DisclosureContentType $contentTypes,
        #[RequiredIf('contentTypes', DisclosureContentType::OTHER->value), Max(255)]
        public ?string $otherDisclosureDetails,
        public bool $acceptTextMessages,
        #[Max(255)]
        public string $consumerSignature,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public CarbonImmutable $signatureDate,
        #[Max(255)]
        public ?string $witnessSignature,
        #[RequiredWith('witnessSignature'), WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public ?CarbonImmutable $witnessSignatureDate,
        #[Max(255)]
        public ?string $guardianSignature,
        #[RequiredWith('guardianSignature'), WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public ?CarbonImmutable $guardianSignatureDate,
        public ?bool $surveyByEmail,
        public ?bool $surveyByMail,
        public ?bool $surveyByOnline,
        #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
        public CarbonImmutable $dateCompleted,
    ) {
    }
}
