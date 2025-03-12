<?php
namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\DataTransferObject\DataTransferObject;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/**
 * @mixin User
 */
#[TypeScript]
class UserResource extends DataTransferObject implements Arrayable
{
    public int $id;

    public string $first_name = '';

    public string $last_name = '';

    public string $email = '';

    /** @var string[] $roles */
    public array $roles = [];

    /** @var string[] $permissions */
    public array $permissions = [];

    public string $created_at = '';

    public string $updated_at = '';

    public string $email_verified_at = '';

    public static function make(User $user): self
    {
        return new self([
          'id' => (int)$user->id,
          'first_name' => $user->first_name,
          'last_name' => $user->last_name,
          'email' => $user->email,
          'roles' => $user->getRoleNames(),
          'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
          'created_at' => $user->created_at,
          'updated_at' => $user->updated_at,
          'email_verified_at' => $user->email_verified_at
        ]);
    }
}
