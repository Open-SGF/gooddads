<?php

namespace App\Models;

use Database\Factories\RegionFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $description
 */
class Region extends Model
{
    /** @use HasFactory<RegionFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'description',
    ];

    protected $keyType = 'string';

    public $incrementing = false;
}
