<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $phone_number
 * @property string $role
 */
class ResponsibleParty extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'phone_number',
        'role'
    ];

    protected $keyType = 'string';

    public $incrementing = false;
}
