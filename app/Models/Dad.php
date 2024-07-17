<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $user_id
 * @property string $region_id
 * @property string $street_address
 * @property string $city
 * @property string $zip_code
 * @property string $employer
 * @property string $cell_phone_number
 * @property string $home_phone_number
 * @property string $work_phone_number
 * @property string $at_contact_number
 * @property string $marital_status
 * @property string $ethnicity
 * @property float $monthly_child_support
 * @property \App\Models\User $user
 * @property \App\Models\Region $region
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\Child[] $children
 */

class Dad extends Model {
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'user_id',
        'region_id',
        'street_address',
        'city',
        'zip_code',
        'employer',
        'cell_phone_number',
        'home_phone_number',
        'work_phone_number',
        'at_contact_number',
        'marital_status',
        'ethnicity',
        'monthly_child_support',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'monthly_child_support' => 'decimal:2',
    ];

    /**
     * Define the relationship to the User model.
     *
     * @return BelongsTo<User, self>
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * Define the relationship to the Region model.
     *
     * @return BelongsTo<Region, self>
     */
    public function region(): BelongsTo {
        return $this->belongsTo(Region::class);
    }

    /**
     * Define the relationship to the Child model.
     *
     * @return HasMany<Child>
     */
    public function children(): HasMany {
        return $this->hasMany(Child::class);
    }
}
