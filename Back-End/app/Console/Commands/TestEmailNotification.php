<?php

namespace App\Console\Commands;

use App\Mail\ReservationNotification;
use App\Models\Reservation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-notification 
                            {type=confirm : The notification type (confirm, cancel, reminder)} 
                            {email? : The email address to send to}
                            {--queue : Whether to queue the email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test sending a reservation notification email';

   
    public function handle()
    {
        $type = $this->argument('type');
        $email = $this->argument('email') ?? 'test@example.com';
        
        $reservation = new Reservation([
            'name' => 'Test User',
            'email' => $email,
            'reservation_time' => now()->addDay()->setHour(19)->setMinute(0),
            'status' => $type === 'cancel' ? 'cancelled' : 'confirmed',
        ]);
        
        if ($this->option('queue')) {
            Mail::to($email)->queue(new ReservationNotification($reservation, $type));
            $this->info("Notification queued for sending to {$email}.");
        } else {
            Mail::to($email)->send(new ReservationNotification($reservation, $type));
            $this->info("Notification sent to {$email}.");
        }
    }
} 