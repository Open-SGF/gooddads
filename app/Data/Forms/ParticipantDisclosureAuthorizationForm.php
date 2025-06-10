<?php

namespace App\Data\Forms;

use App\Data\ParticipantData;
use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Attributes\Validation\RequiredWith;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapOutputName(SnakeCaseMapper::class)]
class ParticipantDisclosureAuthorizationForm extends Data
{
    public function __construct(
        #[Max(36)]
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

        #[RequiredIf('isOtherAuthorized', 'true'), StringType]
        public ?string $otherAuthorizedEntity,

        public bool $discloseToAttorney,

        #[Nullable, RequiredIf('discloseToAttorney', 'true'), StringType, Max(255)]
        public ?string $attorneyName,

        public bool $discloseToEmployer,

        #[Nullable, RequiredIf('discloseToEmployer', 'true'), StringType, Max(255)]
        public ?string $employerName,

        public bool $discloseToLegislator,

        #[Nullable, RequiredIf('discloseToLegislator', 'true'), StringType, Max(255)]
        public ?string $legislatorName,

        public bool $discloseToGovernorsStaff,

        #[Nullable, RequiredIf('discloseToGovernorsStaff', 'true'), StringType, Max(255)]
        public ?string $governorsStaffDetails,

        public bool $discloseToOtherRecipient,

        #[Nullable, RequiredIf('discloseToOtherRecipient', 'true'), StringType, Max(255)]
        public ?string $otherRecipientDetails,

        /** @var DisclosurePurposeType[] $purposes */
        public array $purposes,

        #[Nullable, RequiredIf('hasPurpose', DisclosurePurposeType::OTHER->value), StringType, Max(255)]
        public ?string $otherPurposeDetails,

        /** @var DisclosureContentType[] $contentTypes */
        public array $contentTypes,

        #[Nullable, RequiredIf('hasContentType', DisclosureContentType::OTHER->value), StringType, Max(255)]
        public ?string $otherDisclosureDetails,

        public bool $acceptTextMessages,

        #[Max(255)]
        public string $consumerSignature,

        #[Required, Date, WithCast(DateTimeInterfaceCast::class)]
        public Carbon $signatureDate,

        #[Nullable, StringType, Max(255)]
        public ?string $witnessSignature,

        #[Nullable, RequiredWith('witnessSignature'), Date, WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $witnessSignatureDate,

        #[Nullable, StringType, Max(255)]
        public ?string $guardianSignature,

        #[Nullable, RequiredWith('guardianSignature'), Date, WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $guardianSignatureDate,

        #[Required, BooleanType]
        public ?bool $surveyByEmail,

        #[Required, BooleanType]
        public ?bool $surveyByMail,

        #[Required, BooleanType]
        public ?bool $surveyByOnline,

        #[Date, WithCast(DateTimeInterfaceCast::class)]
        public Carbon $dateCompleted,
    ) {
    }
}
