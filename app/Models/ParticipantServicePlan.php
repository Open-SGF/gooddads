<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantServicePlan extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'participant_name',
        'client_number',
        'review_date',
        'parenting_skill_development_is_service_area',
        'effective_co_parenting_is_service_area',
        'employment_and_education_is_service_area',
        'child_support_is_service_area',
        'domestic_violence_is_service_area',
        'service_identified_by_participant',
        'goal',
        'custody_visitation_strategy',
        'custody_visitation_person_responsible',
        'custody_visitation_timeline',
        'custody_visitation_measure_of_success',
        'education_employment_strategy',
        'education_employment_person_responsible',
        'education_employment_timeline',
        'education_employment_measure_of_success',
        'housing_transportation_strategy',
        'housing_transportation_person_responsible',
        'housing_transportation_timeline',
        'housing_transportation_measure_of_success',
        'participant_signature',
        'participant_signature_date',
        'case_manager_signature',
        'case_manager_signature_date',
        'date_completed',
    ];

    protected $casts = [
        'review_date' => 'date',
        'parenting_skill_development_is_service_area' => 'boolean',
        'effective_co_parenting_is_service_area' => 'boolean',
        'employment_and_education_is_service_area' => 'boolean',
        'child_support_is_service_area' => 'boolean',
        'domestic_violence_is_service_area' => 'boolean',
        'participant_signature_date' => 'date',
        'case_manager_signature_date' => 'date',
        'date_completed' => 'date',
    ];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'participant_id');
    }

}
