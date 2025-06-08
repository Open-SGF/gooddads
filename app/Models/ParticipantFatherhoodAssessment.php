<?php

namespace App\Models;

use Database\Factories\ParticipantFatherhoodAssessmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantFatherhoodAssessment extends Model
{
    /** @use HasFactory<ParticipantFatherhoodAssessmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $table = 'participant_fatherhood_assessments';

    protected $fillable = [
        'participant_id',
        'vendor_name',
        'participant_name',
        'date_of_birth',
        'social_security_number',
        'is_missouri_resident',
        'child_is_under_18',
        'is_financially_eligible',
        'drivers_license_provided',
        'utility_bill_provided',
        'pay_stub_provided',
        'written_employer_statement_provided',
        'social_security_benefits_provided',
        'self_attestation_provided',
        'unemployment_compensation_provided',
        'other_provided',
        'other_provided_name',
        'gross_monthly_household_income',
        'number_of_family_members',
        'percentage_of_fpl',
        'approved_for_services',
        'state_agency_review_date',
        'date_completed',
    ];

    protected $casts = [
        'is_missouri_resident' => 'boolean',
        'child_is_under_18' => 'boolean',
        'is_financially_eligible' => 'boolean',
        'drivers_license_provided' => 'boolean',
        'utility_bill_provided' => 'boolean',
        'pay_stub_provided' => 'boolean',
        'written_employer_statement_provided' => 'boolean',
        'social_security_number' => 'encrypted',
        'social_security_benefits_provided' => 'boolean',
        'self_attestation_provided' => 'boolean',
        'unemployment_compensation_provided' => 'boolean',
        'other_provided' => 'boolean',
        'approved_for_services' => 'boolean',
        'date_of_birth' => 'date',
        'state_agency_review_date' => 'date',
        'date_completed' => 'date',
    ];

    /**
     * @return BelongsTo<Participant, $this>
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
