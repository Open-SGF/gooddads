<?php

namespace App\Http\Requests\Intake;

use Illuminate\Foundation\Http\FormRequest;

class UpdateParticipantMediaReleaseRequest extends FormRequest
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
            'printed_name' => 'required|string|max:191',
            'signature' => 'required|string|max:191',
            'signature_date' => 'nullable|date',
            'phone_number' => 'required|string|max:191',
            'email' => 'required|string|email|max:191',
        ];
    }
}
