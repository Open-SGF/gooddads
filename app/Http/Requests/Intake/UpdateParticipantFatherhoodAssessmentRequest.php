<?php

namespace App\Http\Requests\Intake;

use App\Rules\ValidSocialSecurityNumber;
use Illuminate\Foundation\Http\FormRequest;

class UpdateParticipantFatherhoodAssessmentRequest extends FormRequest
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
            'vendor_name' => 'sometimes|string|max:191',
            'participant_name' => 'required|string|max:191',
            'date_of_birth' => 'required|date|before:today',
            'social_security_number' => ['required','string','max:191', new ValidSocialSecurityNumber()],
            'is_missouri_resident' => 'required|boolean',
            'child_is_under_18' => 'required|boolean',
            'is_financially_eligible' => 'required|boolean',
            'drivers_license_provided' => 'required|boolean',
            'utility_bill_provided' => 'required|boolean',
            'pay_stub_provided' => 'required|boolean',
            'written_employer_statement_provided' => 'required|boolean',
            'social_security_benefits_provided' => 'required|boolean',
            'self_attestation_provided' => 'required|boolean',
            'unemployment_compensation_provided' => 'required|boolean',
            'other_provided' => 'required|boolean',
            'other_provided_name' => 'nullable|string|max:191|required_if:other_provided,true',
            'gross_monthly_household_income' => 'required|numeric|min:0',
            'number_of_family_members' => 'required|integer|min:1',
            'percentage_of_fpl' => 'required|numeric|min:0|max:99.99',
            'approved_for_services' => 'nullable|boolean',
            'state_agency_review_date' => 'nullable|date',

        ];
    }
}
