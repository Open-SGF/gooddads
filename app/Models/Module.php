<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable =
        [
            'description',
        ];

    protected $keyType = 'string';

    public $incrementing = false;

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function moduleAssignments(): HasMany
    {
        return $this->hasMany(ModuleAssignment::class);
    }

    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class);
    }
}
