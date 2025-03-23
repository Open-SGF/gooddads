<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantFatherhoodSurvey extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'participant_id',
        'date_of_birth',
        'fatherhood_program',
        'reason_become_responsible_father',
        'reason_referred',
        'reason_court_ordered',
        'reason_address_child_support_concerns',
        'reason_other',
        'reason_other_description',
        'referred_by_word_of_mouth',
        'referred_by_past_participant',
        'referred_by_family_support_division',
        'referred_by_prosecuting_attorney',
        'referred_by_marketing',
        'referred_by_organization_itself',
        'referred_by_other',
        'referred_by_other_source',
        'employment_opportunities_expected',
        'assistance_with_alcohol_abuse_expected',
        'increased_emphasis_on_parenting_skills_expected',
        'access_to_mentors_resources_outside_program_expected',
        'resume_building_skills_expected',
        'free_legal_services_expected',
        'assistance_with_criminal_history_expected',
        'assistance_with_credit_repair_expected',
        'assistance_with_overcoming_homelessness_expected',
        'assistance_with_visitation_custody_expected',
        'increased_understanding_of_child_support_issues_expected',
        'maintaining_hope_for_the_future_expected',
        'help_obtaining_information_about_health_wellness_expected',
        'other_expected',
        'other_expectations_description',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'reason_become_responsible_father' => 'boolean',
        'reason_referred' => 'boolean',
        'reason_court_ordered' => 'boolean',
        'reason_address_child_support_concerns' => 'boolean',
        'reason_other' => 'boolean',
        'referred_by_word_of_mouth' => 'boolean',
        'referred_by_past_participant' => 'boolean',
        'referred_by_family_support_division' => 'boolean',
        'referred_by_prosecuting_attorney' => 'boolean',
        'referred_by_marketing' => 'boolean',
        'referred_by_organization_itself' => 'boolean',
        'referred_by_other' => 'boolean',
        'employment_opportunities_expected' => 'boolean',
        'assistance_with_alcohol_abuse_expected' => 'boolean',
        'increased_emphasis_on_parenting_skills_expected' => 'boolean',
        'access_to_mentors_resources_outside_program_expected' => 'boolean',
        'resume_building_skills_expected' => 'boolean',
        'free_legal_services_expected' => 'boolean',
        'assistance_with_criminal_history_expected' => 'boolean',
        'assistance_with_credit_repair_expected' => 'boolean',
        'assistance_with_overcoming_homelessness_expected' => 'boolean',
        'assistance_with_visitation_custody_expected' => 'boolean',
        'increased_understanding_of_child_support_issues_expected' => 'boolean',
        'maintaining_hope_for_the_future_expected' => 'boolean',
        'help_obtaining_information_about_health_wellness_expected' => 'boolean',
        'other_expected' => 'boolean',
    ];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
