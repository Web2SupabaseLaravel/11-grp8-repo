<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'Reservation';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The primary key for the model.
     *
     * @var array
     */
    protected $primaryKey = ['Date', 'Time', 'reservation_id'];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Date',
        'Time',
        'reservation_id',
        'Status',
        'IDTABLE',
        'IDRest',
        'IDUser'
    ];

    /**
     * Get the restaurant associated with the reservation.
     */
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'IDRest');
    }

    /**
     * Get the table associated with the reservation.
     */
    public function table()
    {
        return $this->belongsTo(Table::class, 'IDTABLE');
    }

    /**
     * Get the user who made the reservation.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'IDUser', 'id');
    }

    /**
     * Get a combined datetime attribute for the reservation.
     * 
     * @return \Carbon\Carbon
     */
    public function getReservationTimeAttribute()
    {
        return \Carbon\Carbon::parse($this->attributes['Date'] . ' ' . $this->attributes['Time']);
    }
}
