<?php

namespace App\Http\Resources;

use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Participant
 */
class ParticipantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'user_id' => $this->user_id,
          'user' => UserResource::make($this->user),
          'name' => $this->user->first_name . ' ' . $this->user->last_name,
          'region_id' => $this->region_id,
          'region' => $this->whenLoaded('region', RegionResource::make($this->region)),
          'children' => $this->whenLoaded('children', ChildResource::collection($this->children)),
          'address_line_1' => $this->address_line_1,
          'address_line_2' => $this->address_line_2,
          'city' => $this->city,
          'state' => $this->state,
          'zipcode' => $this->zipcode,
          'employer' => $this->employer,
          'cell_phone_number' => $this->cell_phone_number,
          'home_phone_number' => $this->home_phone_number,
          'work_phone_number' => $this->work_phone_number,
          'at_contact_number' => $this->at_contact_number,
          'marital_status' => $this->marital_status?->value,
          'ethnicity' => $this->ethnicity?->value,
          'monthly_child_support' => $this->monthly_child_support,
          'intake_date' => $this->intake_date,
        ];
    }
}
