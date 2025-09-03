<?php

namespace App\Models;

use Database\Factories\ProgramAssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramAssignment extends Model
{
    /** @use HasFactory<ProgramAssignmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'start_date',
        'completed',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'start_date' => 'immutable_datetime',
        'completed' => 'boolean',
    ];

    /**
     * @return BelongsTo<ParticipantClass, $this>
     */
    public function participantClass(): BelongsTo
    {
        return $this->belongsTo(ParticipantClass::class);
    }

    /**
     * @return BelongsTo<Program, $this>
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}
