<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $dad_id
 * @property string $name
 * @property \DateTime $date_of_birth
 * @property string $contact
 * @property float $child_support
 * @property \App\Models\Dad $dad
 */

class Child extends Model {
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'dad_id',
        'name',
        'date_of_birth',
        'contact',
        'child_support',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * Define the relationship to the Dad model.
     *
     * @return BelongsTo<Dad, self>
     */
    public function dad(): BelongsTo {
        return $this->belongsTo(Dad::class, 'dad_id', 'id');
    }
}
