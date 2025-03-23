<?php

namespace App\Http\Requests\Intake;

use Illuminate\Foundation\Http\FormRequest;

class UpdateParticipantFatherhoodSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'date_of_birth' => ['nullable', 'date'],
            'fatherhood_program' => ['required', 'string', 'max:191'],

            // Reason fields (boolean)
            'reason_become_responsible_father' => ['required', 'boolean'],
            'reason_referred' => ['required', 'boolean'],
            'reason_court_ordered' => ['required', 'boolean'],
            'reason_address_child_support_concerns' => ['required', 'boolean'],
            'reason_other' => ['required', 'boolean'],
            'reason_other_description' => ['nullable', 'string', 'max:191', 'required_if:reason_other,true'],

            // Referred by fields (boolean)
            'referred_by_word_of_mouth' => ['required', 'boolean'],
            'referred_by_past_participant' => ['required', 'boolean'],
            'referred_by_family_support_division' => ['required', 'boolean'],
            'referred_by_prosecuting_attorney' => ['required', 'boolean'],
            'referred_by_marketing' => ['required', 'boolean'],
            'referred_by_organization_itself' => ['required', 'boolean'],
            'referred_by_other' => ['required', 'boolean'],
            'referred_by_other_source' => ['nullable', 'string', 'max:191', 'required_if:referred_by_other,true'],

            // Expectations fields (boolean)
            'employment_opportunities_expected' => ['required', 'boolean'],
            'assistance_with_alcohol_abuse_expected' => ['required', 'boolean'],
            'increased_emphasis_on_parenting_skills_expected' => ['required', 'boolean'],
            'access_to_mentors_resources_outside_program_expected' => ['required', 'boolean'],
            'resume_building_skills_expected' => ['required', 'boolean'],
            'free_legal_services_expected' => ['required', 'boolean'],
            'assistance_with_criminal_history_expected' => ['required', 'boolean'],
            'assistance_with_credit_repair_expected' => ['required', 'boolean'],
            'assistance_with_overcoming_homelessness_expected' => ['required', 'boolean'],
            'assistance_with_visitation_custody_expected' => ['required', 'boolean'],
            'increased_understanding_of_child_support_issues_expected' => ['required', 'boolean'],
            'maintaining_hope_for_the_future_expected' => ['required', 'boolean'],
            'help_obtaining_information_about_health_wellness_expected' => ['required', 'boolean'],
            'other_expected' => ['required', 'boolean'],
            'other_expectations_description' => ['nullable', 'string', 'max:191', 'required_if:other_expected,true'],
        ];
    }
}
