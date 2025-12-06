<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NeonHash extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'neon_participant_hashes'; 

    protected $fillable = ['id'];
}
