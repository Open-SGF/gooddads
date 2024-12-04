<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\ChildFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $participant_id
 * @property string $first_name
 * @property string $last_name
 * @property CarbonImmutable $date_of_birth
 * @property string $contact
 * @property float $child_support
 * @property \App\Models\Participant $participant
 */
class Child extends Model
{
    /** @use HasFactory<ChildFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'participant_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'contact',
        'child_support',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'date_of_birth' => 'immutable_date',
        'child_support' => 'decimal:2',
    ];

    /**
     * Define the relationship to the Participant model.
     *
     * @return BelongsTo<Participant, self>
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
