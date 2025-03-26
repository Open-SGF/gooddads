<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantMediaRelease extends Model
{
    use HasUuids, HasFactory;

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

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
