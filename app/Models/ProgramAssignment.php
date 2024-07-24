<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramAssignment extends Model
{
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

    public function dadClass(): BelongsTo
    {
        return $this->belongsTo(DadClass::class);
    }
}
