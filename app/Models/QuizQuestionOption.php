<?php

namespace App\Models;

use Database\Factories\QuizQuestionOptionFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizQuestionOption extends Model
{
    /** @use HasFactory<QuizQuestionOptionFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'answer',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * @return BelongsTo<QuizQuestion, $this>
     */
    public function quizQuestion(): BelongsTo
    {
        return $this->belongsTo(QuizQuestion::class);
    }
}
