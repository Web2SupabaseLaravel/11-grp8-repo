<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $table = 'Reservation';
    protected $primaryKey = 'ID';
    public $timestamps = true;

    protected $fillable = [
        'ID',
        'Action',
        'Date',
        'Costumer_Name',
        'TID',
        'UID',
        'RID'
    ];

}
