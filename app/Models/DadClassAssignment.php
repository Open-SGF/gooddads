<?php

namespace App\Models;

use Database\Factories\DadClassAssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DadClassAssignment extends Model
{
    /** @use HasFactory<DadClassAssignmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * Define the relationship to the User model.
     *
     * @return BelongsTo<User, self>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define the relationship to the DadClass model.
     *
     * @return BelongsTo<DadClass, self>
     */
    public function dadClass(): BelongsTo
    {
        return $this->belongsTo(DadClass::class);
    }
}
