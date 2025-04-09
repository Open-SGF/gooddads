<?php

namespace App\Http\Requests\Intake;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Rules\UsPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreParticipantSignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return request()->user()->hasRole('participant');
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'address_line_1' => ['required', 'string', 'max:191'],
            'address_line_2' => ['nullable', 'string', 'max:191'],
            'city' => ['required', 'string', 'max:191'],
            'state' => ['required', 'string', 'max:191'],
            'zipcode' => ['required', 'string', 'max:191'],

            'employer' => ['nullable', 'string', 'max:191'],
            't_shirt_size' => ['nullable', 'string', 'max:191'],
            'home_phone_number' => ['required', 'string', 'max:20', new UsPhoneNumber()],
            'work_phone_number' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'cell_phone_number' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'alt_contact_number' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'probation_parole_case_worker_name' => ['nullable', 'string', 'max:191'],
            'probation_parole_case_worker_phone' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'marital_status' => ['required', Rule::in(MaritalStatus::values())],
            'ethnicity' => ['required', Rule::in(Ethnicity::values())],
            'monthly_child_support' => ['nullable', 'numeric'],
            'region_id' => ['required', 'exists:regions,id'],

            // Children information
            'children_info' => ['nullable', 'array'],
            'children_info.*.first_name' => ['required_with:children_info', 'string'],
            'children_info.*.last_name' => ['required_with:children_info', 'string'],
            'children_info.*.date_of_birth' => ['required_with:children_info', 'date'],
            'children_info.*.custody' => ['required_with:children_info', 'boolean'],
            'children_info.*.visitation' => ['required_with:children_info', 'boolean'],
            'children_info.*.phone_contact' => ['required_with:children_info', 'boolean'],
            'children_info.*.child_support' => ['required_with:children_info', 'numeric'],


        ];
    }
}
