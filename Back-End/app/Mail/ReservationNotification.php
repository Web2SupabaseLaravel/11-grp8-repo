<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class ReservationNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $type;
    public $userName;
    public $reservationTime;
    public $status;
    public $userEmail;
    public $restaurant;
    public $table;

    public function __construct(Reservation $reservation, string $type)
    {
        $this->reservation = $reservation;
        $this->type = $type;
        
        // Load relationships for complete data
        if (!$reservation->relationLoaded('user')) {
            $reservation->load('user');
        }
        
        if (!$reservation->relationLoaded('restaurant')) {
            $reservation->load('restaurant');
        }
        
        if (!$reservation->relationLoaded('table')) {
            $reservation->load('table');
        }
        
        // Set properties for the email template
        $this->userName = $reservation->user ? $reservation->user->name : 'Customer';
        $this->reservationTime = Carbon::parse($reservation->Date . ' ' . $reservation->Time);
        $this->status = $reservation->Status;
        $this->userEmail = $reservation->user ? $reservation->user->email : '';
        $this->restaurant = $reservation->restaurant;
        $this->table = $reservation->table;
    }

    public function build()
    {
        $subject = match ($this->type) {
            'confirm' => 'Reservation Confirmed',
            'cancel' => 'Reservation Cancelled',
            'reminder' => 'Reservation Reminder',
            default => 'Reservation Notification'
        };

        return $this->subject($subject)
                    ->view('emails.reservation');
    }
}
