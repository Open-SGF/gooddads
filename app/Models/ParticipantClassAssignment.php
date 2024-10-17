<?php

namespace App\Models;

use Database\Factories\ParticipantClassAssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantClassAssignment extends Model
{
    /** @use HasFactory<ParticipantClassAssignmentFactory> */
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
     * Define the relationship to the ParticipantClass model.
     *
     * @return BelongsTo<ParticipantClass, self>
     */
    public function participantClass(): BelongsTo
    {
        return $this->belongsTo(ParticipantClass::class);
    }
}
