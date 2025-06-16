<?php

namespace App\Models;

use App\Enums\Roles;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property string $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property bool $active
 * @property string $phone_number
 * @property Collection<string> $role_names
 * @property Collection<string> $permission_names
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    use HasPermissions;
    use HasRoles;
    use HasUuids;
    use Notifiable;

    /**
     * The relationships that should be eager loaded.
     *
     * @var array<int, string>
     */
    protected $with = ['roles', 'permissions'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = ['role_names', 'permission_names'];

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'immutable_datetime',
            'password' => 'hashed',
            'active' => 'boolean',
        ];
    }

    /**
     * Get only the names of the roles.
     *
     * @return array<string>
     */
    public function getRoleNamesAttribute(): array
    {
        return $this->roles->pluck('name')->toArray();
    }

    /**
     * Get only the names of the permissions.
     *
     * @return array<string>
     */
    public function getPermissionNamesAttribute(): array
    {
        // get all permissions belonging to the User's roles
        return $this->permissions->pluck('name')->toArray();
    }

    protected static function booted(): void
    {
        static::creating(function (User $user) {
            if ($user['role']) {
                $user->assignRole($user['role']);
            }
            unset($user['role']);
            $user->assignRole(Roles::Participant);
        });
    }

    /** @return HasOne<Participant, $this> */
    public function participant(): HasOne
    {
        return $this->hasOne(Participant::class, 'user_id');
    }
}
