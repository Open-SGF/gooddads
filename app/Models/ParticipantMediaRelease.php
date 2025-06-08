<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\ParticipantMediaReleaseFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * @property string $id
 * @property string $participant_id
 * @property string $printed_name
 * @property string $signature
 * @property ?CarbonImmutable $signature_date
 * @property string $phone_number
 * @property string $email
 * @property ?CarbonImmutable $date_completed
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class ParticipantMediaRelease extends Model
{
    /** @use HasFactory<ParticipantMediaReleaseFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'participant_id',
        'printed_name',
        'signature',
        'signature_date',
        'phone_number',
        'email',
        'date_completed',
    ];

    protected $casts = [
        'signature_date' => 'date',
        'date_completed' => 'date',
    ];


    /**
     * @return BelongsTo<Participant, $this>
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
