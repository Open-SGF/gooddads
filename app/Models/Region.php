<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

/**
 * @property string $id
 * @property string $description
 */

class Region extends Model {
    use HasFactory, HasUuids;
    
    protected $fillable = [
        'description',
    ];
    
    protected $keyType = 'string';
    public $incrementing = false;
}
