<?php

namespace App\Models;

use Database\Factories\QuizAssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizAssignment extends Model
{
    /** @use HasFactory<QuizAssignmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'response',
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

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
