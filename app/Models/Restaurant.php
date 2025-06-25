<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $table = 'restaurants';
    protected $primaryKey = 'restaurant_id';
    protected $fillable = ['name', 'address', 'phone', 'open_time', 'close_time'];
    public $timestamps = false;
}
