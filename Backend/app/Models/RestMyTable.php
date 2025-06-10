<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RestMyTable extends Model
{
    use HasFactory;
    protected $table = 'RestMyTable';
    protected $primaryKey = 'Table_ID';
    public $timestamps = true;

    protected $fillable = [
        'Table_ID',
        'Status',
        'Restau_ID',
    ];
}
