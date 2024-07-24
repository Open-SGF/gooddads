<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'description',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function quizQuestions(): HasMany
    {
        return $this->hasMany(QuizQuestion::class);
    }
}
