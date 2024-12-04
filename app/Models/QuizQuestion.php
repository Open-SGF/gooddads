<?php

namespace App\Models;

use App\Enums\QuizQuestionType;
use Database\Factories\QuizQuestionFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizQuestion extends Model
{
    /** @use HasFactory<QuizQuestionFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'question',
    ];

    protected $casts = [
        'type' => QuizQuestionType::class,
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * @return BelongsTo<Quiz, QuizQuestion>
     */
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * @return HasMany<QuizQuestionOption>
     */
    public function quizQuestionOptions(): HasMany
    {
        return $this->hasMany(QuizQuestionOption::class);
    }
}
