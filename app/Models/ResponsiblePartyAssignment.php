<?php

namespace App\Models;

use Database\Factories\ResponsiblePartyAssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResponsiblePartyAssignment extends Model
{
    /** @use HasFactory<ResponsiblePartyAssignmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * Define the relationship to the User model.
     *
     * @return BelongsTo<User, self>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define the relationship to the Dad model.
     *
     * @return BelongsTo<Dad, self>
     */
    public function dad(): BelongsTo
    {
        return $this->belongsTo(Dad::class);
    }
}
