<?php

namespace App\Console\Commands;

use App\Models\Reservation;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendReservationReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-reservation-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminder emails for upcoming reservations';

    /**
     * The notification service.
     *
     * @var NotificationService
     */
    protected $notificationService;

    /**
     * Create a new command instance.
     *
     * @param NotificationService $notificationService
     * @return void
     */
    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Find reservations for tomorrow
        $tomorrow = Carbon::tomorrow()->toDateString();
        
        $upcomingReservations = Reservation::where('Status', 'confirmed')
            ->where('Date', $tomorrow)
            ->with('user')
            ->get();

        $count = 0;
        foreach ($upcomingReservations as $reservation) {
            // Only send if there's a user associated
            if ($reservation->user) {
                $this->notificationService->sendReservationNotification($reservation, 'reminder');
                $count++;
            }
        }

        $this->info("Sent {$count} reservation reminders for {$tomorrow}.");
    }
}
