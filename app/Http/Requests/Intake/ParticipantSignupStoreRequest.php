<?php

namespace App\Http\Requests\Intake;

use App\Enums\Ethnicity;
use App\Enums\MaritalStatus;
use App\Rules\UsPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ParticipantSignupStoreRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'address' => ['required', 'string', 'max:191'],
            'employer' => ['nullable', 'string', 'max:191'],
            't_shirt_size' => ['nullable', 'string', 'max:191'],
            'home_cell_phone' => ['required', 'string', 'max:20', new UsPhoneNumber()],
            'work_phone' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'other_number' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'probation_parole_case_worker_name' => ['nullable', 'string', 'max:191'],
            'probation_parole_case_worker_phone' => ['nullable', 'string', 'max:20', new UsPhoneNumber()],
            'marital_status' => ['required', Rule::in(MaritalStatus::values())],
            'ethnicity' => ['required', Rule::in(Ethnicity::values())],
            'monthly_child_support_payment' => ['nullable', 'numeric'],
            'region_id' => ['required', 'exists:regions,id'],

            // Children information
            'children_info' => ['nullable', 'array'],
            'children_info.*.first_name' => ['required_with:children_info', 'string'],
            'children_info.*.last_name' => ['required_with:children_info', 'string'],
            'children_info.*.date_of_birth' => ['required_with:children_info', 'date'],
            'children_info.*.contact' => ['required_with:children_info', 'string'],
            'children_info.*.custody' => ['required_with:children_info', 'boolean'],
            'children_info.*.visitation' => ['required_with:children_info', 'boolean'],
            'children_info.*.phone_contact' => ['required_with:children_info', 'boolean'],
            'children_info.*.child_support' => ['required_with:children_info', 'numeric'],

            // These may be unnecessary if we use children specific values above
            //            'contact_with_children' => ['nullable', 'boolean'],
            //            'custody' => ['nullable', 'boolean'],
            //            'visitation' => ['nullable', 'boolean'],
            //            'phone_contact' => ['nullable', 'boolean'],

        ];
    }
}
