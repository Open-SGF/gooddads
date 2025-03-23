<?php

namespace App\Http\Requests\Intake;

use Illuminate\Foundation\Http\FormRequest;

class StoreParticipantServicePlanRequest extends FormRequest
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
            'participant_name' => 'required|string|max:191',
            'client_number' => 'required|string|max:191',

            'parenting_skill_development_is_service_area' => 'required|boolean',
            'effective_co_parenting_is_service_area' => 'required|boolean',
            'employment_and_education_is_service_area' => 'required|boolean',
            'child_support_is_service_area' => 'required|boolean',
            'domestic_violence_is_service_area' => 'required|boolean',
            'service_identified_by_participant' => 'nullable|string|max:191',

            'goal' => 'required|string',
            'custody_visitation_strategy' => 'required|nullable|string',
            'custody_visitation_person_responsible' => 'required|nullable|string|max:191',
            'custody_visitation_timeline' => 'required|nullable|string|max:191',
            'custody_visitation_measure_of_success' => 'required|nullable|string',
            'education_employment_strategy' => 'required|nullable|string',
            'education_employment_person_responsible' => 'required|nullable|string|max:191',
            'education_employment_timeline' => 'required|nullable|string|max:191',
            'education_employment_measure_of_success' => 'required|nullable|string',
            'housing_transportation_strategy' => 'required|nullable|string',
            'housing_transportation_person_responsible' => 'required|nullable|string|max:191',
            'housing_transportation_timeline' => 'required|nullable|string|max:191',
            'housing_transportation_measure_of_success' => 'required|nullable|string',

            'participant_signature' => 'sometimes|string|max:191',
            'participant_signature_date' => 'sometimes|date',
            'case_manager_signature' => 'sometimes|string|max:191',
            'case_manager_signature_date' => 'sometimes|date',

            'date_completed' => 'nullable|date',
        ];
    }
}
