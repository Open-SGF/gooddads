<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DadClass extends Model
{
    use HasFactory;
    use HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * Define the relationship to the Region model.
     *
     * @return BelongsTo<Region, self>
     */
    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }
}
