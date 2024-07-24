<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'description',
        'length',
    ];

    protected $keyType = 'string';

    public $incrementing = false;
}
