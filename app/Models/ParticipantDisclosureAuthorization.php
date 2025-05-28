<?php

namespace App\Models;

use App\Enums\DisclosureContentType;
use App\Enums\DisclosurePurposeType;
use Carbon\Carbon;
use Database\Factories\ParticipantDisclosureAuthorizationFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $participant_id
 * @property Participant $participant
 * @property bool $is_dss_authorized
 * @property bool $is_dys_authorized
 * @property bool $is_mhd_authorized
 * @property bool $is_dfas_authorized
 * @property bool $is_mmac_authorized
 * @property bool $is_fsd_authorized
 * @property bool $is_cd_authorized
 * @property bool $is_dls_authorized
 * @property bool $is_other_authorized
 * @property string $other_authorized_entity
 * @property string $subject_name
 * @property string $subject_phone
 * @property ?Carbon $subject_dob
 * @property string $subject_ssn
 * @property string $subject_address
 * @property string $subject_email
 * @property bool $disclose_to_attorney
 * @property string $attorney_name
 * @property bool $disclose_to_employer
 * @property string $employer_name
 * @property bool $disclose_to_legislator
 * @property string $legislator_name
 * @property bool $disclose_to_governors_staff
 * @property string $governors_staff_details
 * @property bool $disclose_to_other_recipient
 * @property string $other_recipient_details
 * @property array<DisclosurePurposeType> $purposes
 * @property array<DisclosureContentType> $content_types
 * @property string $other_purpose_details
 * @property string $other_disclosure_details
 * @property bool $accept_text_messages
 * @property string $consumer_signature
 * @property ?Carbon $signature_date
 * @property string $witness_signature
 * @property ?Carbon $witness_signature_date
 * @property string $guardian_signature
 * @property ?Carbon $guardian_signature_date
 * @property bool $survey_by_email
 * @property bool $survey_by_mail
 * @property bool $survey_by_online
 * @property ?Carbon $date_completed
 */
class ParticipantDisclosureAuthorization extends Model
{
    /** @use HasFactory<ParticipantDisclosureAuthorizationFactory> */
    use HasFactory;

    use HasUuids;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'participant_disclosure_authorization';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'participant_id',
        'is_dss_authorized',
        'is_dys_authorized',
        'is_mhd_authorized',
        'is_dfas_authorized',
        'is_mmac_authorized',
        'is_fsd_authorized',
        'is_cd_authorized',
        'is_dls_authorized',
        'is_other_authorized',
        'other_authorized_entity',
        'disclose_to_attorney',
        'attorney_name',
        'disclose_to_employer',
        'employer_name',
        'disclose_to_legislator',
        'legislator_name',
        'disclose_to_governors_staff',
        'governors_staff_details',
        'disclose_to_other_recipient',
        'other_recipient_details',
        'purposes',
        'content_types',
        'other_purpose_details',
        'other_disclosure_details',
        'accept_text_messages',
        'consumer_signature',
        'signature_date',
        'witness_signature',
        'witness_signature_date',
        'guardian_signature',
        'guardian_signature_date',
        'survey_by_email',
        'survey_by_mail',
        'survey_by_online',
        'date_completed',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'subject_dob' => 'date',
        'signature_date' => 'date',
        'witness_signature_date' => 'date',
        'guardian_signature_date' => 'date',
        'date_completed' => 'date',
        'is_dss_authorized' => 'boolean',
        'is_dys_authorized' => 'boolean',
        'is_mhd_authorized' => 'boolean',
        'is_dfas_authorized' => 'boolean',
        'is_mmac_authorized' => 'boolean',
        'is_fsd_authorized' => 'boolean',
        'is_cd_authorized' => 'boolean',
        'is_dls_authorized' => 'boolean',
        'disclose_to_attorney' => 'boolean',
        'disclose_to_employer' => 'boolean',
        'disclose_to_legislator' => 'boolean',
        'disclose_to_governors_staff' => 'boolean',
        'disclose_to_other_recipient' => 'boolean',
        'accept_text_messages' => 'boolean',
        'survey_by_email' => 'boolean',
        'survey_by_mail' => 'boolean',
        'survey_by_online' => 'boolean',
        'purposes' => 'json',
        'content_types' => 'json',
    ];

    /**
     * Get the participant that owns the authorization disclosure.
     *
     * @return BelongsTo<Participant, $this>
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Get the purposes as an array of enum instances
     *
     * @return array<DisclosurePurposeType>
     */
    public function getPurposeEnums(): array
    {
        $values = $this->purposes ?? [];
        $enums = [];

        foreach ($values as $value) {
            $enums[] = DisclosurePurposeType::from($value);
        }

        return $enums;
    }

    /**
     * Check if a specific purpose is selected
     */
    public function hasPurpose(DisclosurePurposeType $purpose): bool
    {
        return in_array($purpose->value, $this->purposes ?? []);
    }

    /**
     * Get the content types as an array of enum instances
     *
     * @return array<DisclosureContentType>
     */
    public function getContentTypeEnums(): array
    {
        $values = $this->content_types ?? [];
        $enums = [];

        foreach ($values as $value) {
            $enums[] = DisclosureContentType::from($value);
        }

        return $enums;
    }

    /**
     * Check if a specific content type is selected
     */
    public function hasContentType(DisclosureContentType $type): bool
    {
        return in_array($type->value, $this->content_types ?? []);
    }

    /**
     * Add a purpose to the set
     */
    public function addPurpose(DisclosurePurposeType $purpose): void
    {
        $purposes = $this->purposes ?? [];

        if (! in_array($purpose->value, $purposes)) {
            $purposes[] = $purpose->value;
            $this->purposes = $purposes;
        }
    }

    /**
     * Remove a purpose from the set
     */
    public function removePurpose(DisclosurePurposeType $purpose): void
    {
        $purposes = $this->purposes ?? [];

        $key = array_search($purpose->value, $purposes);
        if ($key !== false) {
            unset($purposes[$key]);
            $this->purposes = array_values($purposes); // Reindex array
        }
    }

    /**
     * Add a content type to the set
     */
    public function addContentType(DisclosureContentType $type): void
    {
        $types = $this->content_types ?? [];

        if (! in_array($type->value, $types)) {
            $types[] = $type->value;
            $this->content_types = $types;
        }
    }

    /**
     * Remove a content type from the set
     */
    public function removeContentType(DisclosureContentType $type): void
    {
        $types = $this->content_types ?? [];

        $key = array_search($type->value, $types);
        if ($key !== false) {
            unset($types[$key]);
            $this->content_types = array_values($types); // Reindex array
        }
    }
}
