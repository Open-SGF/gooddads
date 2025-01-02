<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property string $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @method getRoleNames()
 * @method getAllPermissions()
 */
class UserResource extends JsonResource
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
          'first_name' => $this->first_name,
          'last_name' => $this->last_name,
          'email' => $this->email,
          'roles' => $this->getRoleNames(),
          // add permission name to array
          'permissions' => $this->getAllPermissions()->pluck('name')->toArray(),
        ];
    }
}
