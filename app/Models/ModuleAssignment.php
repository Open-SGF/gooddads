<?php

namespace App\Models;

use Database\Factories\ModuleAssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ModuleAssignment extends Model
{
    /** @use HasFactory<ModuleAssignmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'description',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    protected $casts = [
        'event_date' => 'immutable_datetime',
    ];

    /**
     * @return BelongsTo<Module, $this>
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }
}
