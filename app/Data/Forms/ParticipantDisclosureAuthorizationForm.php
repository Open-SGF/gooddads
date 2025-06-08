<?php

namespace App\Data\Forms;

use App\Data\ParticipantData;
use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
use App\Models\ParticipantDisclosureAuthorization;
use Carbon\Carbon;
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
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ParticipantDisclosureAuthorizationForm extends Data
{
    public function __construct(
        #[StringType, Max(36)]
        public string $id,

        #[StringType, Max(36)]
        public string $participantId,

        public ParticipantData $participant,

        // Authorized entities
        #[Required, BooleanType]
        public bool $isDssAuthorized,

        #[Required, BooleanType]
        public ?bool $isDysAuthorized,

        #[Required, BooleanType]
        public ?bool $isMhdAuthorized,

        #[Required, BooleanType]
        public ?bool $isDfasAuthorized,

        #[Required, BooleanType]
        public ?bool $isMmacAuthorized,

        #[Required, BooleanType]
        public ?bool $isFsdAuthorized,

        #[Required, BooleanType]
        public ?bool $isCdAuthorized,

        #[Required, BooleanType]
        public ?bool $isDlsAuthorized,

        #[Required, BooleanType]
        public ?bool $isOtherAuthorized,

        #[RequiredIf('isOtherAuthorized', 'true'), StringType]
        public ?string $otherAuthorizedEntity,

        // Recipients
        #[Required, BooleanType]
        public ?bool $discloseToAttorney,

        #[Nullable, RequiredIf('discloseToAttorney', 'true'), StringType, Max(255)]
        public ?string $attorneyName,

        #[Required, BooleanType]
        public ?bool $discloseToEmployer,

        #[Nullable, RequiredIf('discloseToEmployer', 'true'), StringType, Max(255)]
        public ?string $employerName,

        #[Required, BooleanType]
        public ?bool $discloseToLegislator,

        #[Nullable, RequiredIf('discloseToLegislator', 'true'), StringType, Max(255)]
        public ?string $legislatorName,

        #[Required, BooleanType]
        public ?bool $discloseToGovernorsStaff,

        #[Nullable, RequiredIf('discloseToGovernorsStaff', 'true'), StringType, Max(255)]
        public ?string $governorsStaffDetails,

        #[Required, BooleanType]
        public ?bool $discloseToOtherRecipient,

        #[Nullable, RequiredIf('discloseToOtherRecipient', 'true'), StringType, Max(255)]
        public ?string $otherRecipientDetails,

        #[Required, ArrayType(DisclosurePurposeType::class)]
        public array $purposes,

        #[Nullable, RequiredIf('hasPurpose', DisclosurePurposeType::OTHER->value), StringType, Max(255)]
        public ?string $otherPurposeDetails,

        #[Required, ArrayType(DisclosureContentType::class)]
        public array $contentTypes,

        #[Nullable, RequiredIf('hasContentType', DisclosureContentType::OTHER->value), StringType, Max(255)]
        public ?string $otherDisclosureDetails,

        // Communication preferences
        #[Nullable, BooleanType]
        public ?bool $acceptTextMessages,

        // Signatures
        #[Required, StringType, Max(255)]
        public ?string $consumerSignature,

        #[Required, Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $signatureDate,

        #[Nullable, StringType, Max(255)]
        public ?string $witnessSignature,

        #[Nullable, RequiredWith('witnessSignature'), Date]
        #[WithCast(DateTimeInterfaceCast::class)]
        public ?Carbon $witnessSignatureDate,

        #[Nullable, StringType, Max(255)]
        public ?string $guardianSignature,

        #[Nullable, RequiredWith('guardianSignature'), Date]
        #[WithCast(DateTimeInterfaceCast::class)]
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

    public static function fromModel(ParticipantDisclosureAuthorization $participantDisclosureAuthorization): self
    {
        return new self(
            id: $participantDisclosureAuthorization->id,
            participantId: $participantDisclosureAuthorization->participant_id,
            participant: ParticipantData::from($participantDisclosureAuthorization->participant),
            isDssAuthorized: $participantDisclosureAuthorization->is_dss_authorized,
            isDysAuthorized: $participantDisclosureAuthorization->is_dys_authorized,
            isMhdAuthorized: $participantDisclosureAuthorization->is_mhd_authorized,
            isDfasAuthorized: $participantDisclosureAuthorization->is_dfas_authorized,
            isMmacAuthorized: $participantDisclosureAuthorization->is_mmac_authorized,
            isFsdAuthorized: $participantDisclosureAuthorization->is_fsd_authorized,
            isCdAuthorized: $participantDisclosureAuthorization->is_cd_authorized,
            isDlsAuthorized: $participantDisclosureAuthorization->is_dls_authorized,
            isOtherAuthorized: $participantDisclosureAuthorization->is_other_authorized,
            otherAuthorizedEntity: $participantDisclosureAuthorization->other_authorized_entity,
            discloseToAttorney: $participantDisclosureAuthorization->disclose_to_attorney,
            attorneyName: $participantDisclosureAuthorization->attorney_name,
            discloseToEmployer: $participantDisclosureAuthorization->disclose_to_employer,
            employerName: $participantDisclosureAuthorization->employer_name,
            discloseToLegislator: $participantDisclosureAuthorization->disclose_to_legislator,
            legislatorName: $participantDisclosureAuthorization->legislator_name,
            discloseToGovernorsStaff: $participantDisclosureAuthorization->disclose_to_governors_staff,
            governorsStaffDetails: $participantDisclosureAuthorization->governors_staff_details,
            discloseToOtherRecipient: $participantDisclosureAuthorization->disclose_to_other_recipient,
            otherRecipientDetails: $participantDisclosureAuthorization->other_recipient_details,
            purposes: $participantDisclosureAuthorization->purposes ?? [],
            otherPurposeDetails: $participantDisclosureAuthorization->other_purpose_details,
            contentTypes: $participantDisclosureAuthorization->content_types ?? [],
            otherDisclosureDetails: $participantDisclosureAuthorization->other_disclosure_details,
            acceptTextMessages: $participantDisclosureAuthorization->accept_text_messages,
            consumerSignature: $participantDisclosureAuthorization->consumer_signature,
            signatureDate: $participantDisclosureAuthorization->signature_date,
            witnessSignature: $participantDisclosureAuthorization->witness_signature,
            witnessSignatureDate: $participantDisclosureAuthorization->witness_signature_date,
            guardianSignature: $participantDisclosureAuthorization->guardian_signature,
            guardianSignatureDate: $participantDisclosureAuthorization->guardian_signature_date,
            surveyByEmail: $participantDisclosureAuthorization->survey_by_email,
            surveyByMail: $participantDisclosureAuthorization->survey_by_mail,
            surveyByOnline: $participantDisclosureAuthorization->survey_by_online,
            dateCompleted: $participantDisclosureAuthorization->date_completed ?? now(),
        );
    }
}
