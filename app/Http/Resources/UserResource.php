<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
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
          'permissions' => $this->getAllPermissions()->pluck('name')->toArray(),
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
          'email_verified_at' => $this->email_verified_at
        ];
    }
}
