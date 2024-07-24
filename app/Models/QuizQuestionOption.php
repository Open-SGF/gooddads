<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizQuestionOption extends Model
{
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
     * @return BelongsTo<QuizQuestion, QuizQuestionOption>
     */
    public function quizQuestion(): BelongsTo
    {
        return $this->belongsTo(QuizQuestion::class);
    }
}
