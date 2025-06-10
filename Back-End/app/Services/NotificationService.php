<?php

namespace App\Services;

use App\Mail\ReservationNotification;
use App\Models\Notification;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    /**
     * Send a notification about a reservation.
     *
     * @param Reservation $reservation
     * @param string $type confirm|cancel|reminder
     * @return void
     */
    public function sendReservationNotification(Reservation $reservation, string $type): void
    {
        $user = $reservation->user;
        
        if (!$user) {
            return;
        }
        
        // Create title and message based on notification type
        $title = $this->getNotificationTitle($type);
        $message = $this->getNotificationMessage($reservation, $type);
        
        // Store notification in database
        $this->createDatabaseNotification($user->id, $title, $message);
        
        // Send email notification
        $this->sendEmailNotification($user->email, $reservation, $type);
    }
    
    /**
     * Create a notification record in the database.
     *
     * @param int $userId
     * @param string $title
     * @param string $message
     * @return Notification
     */
    public function createDatabaseNotification(int $userId, string $title, string $message): Notification
    {
        return Notification::create([
            'Title' => $title,
            'Massage' => $message,
            'UID' => $userId
        ]);
    }
    
    /**
     * Send an email notification.
     *
     * @param string $email
     * @param Reservation $reservation
     * @param string $type
     * @return void
     */
    public function sendEmailNotification(string $email, Reservation $reservation, string $type): void
    {
        Mail::to($email)->queue(new ReservationNotification($reservation, $type));
    }
    
    /**
     * Get notification title based on type.
     *
     * @param string $type
     * @return string
     */
    private function getNotificationTitle(string $type): string
    {
        return match ($type) {
            'confirm' => 'Reservation Confirmed',
            'cancel' => 'Reservation Cancelled',
            'reminder' => 'Upcoming Reservation Reminder',
            default => 'Reservation Notification',
        };
    }
    
    /**
     * Get notification message based on type and reservation details.
     *
     * @param Reservation $reservation
     * @param string $type
     * @return string
     */
    private function getNotificationMessage(Reservation $reservation, string $type): string
    {
        $dateTime = date('F j, Y \a\t g:i A', strtotime($reservation->Date . ' ' . $reservation->Time));
        
        return match ($type) {
            'confirm' => "Your reservation for {$dateTime} has been confirmed.",
            'cancel' => "Your reservation for {$dateTime} has been cancelled.",
            'reminder' => "This is a reminder about your upcoming reservation on {$dateTime}.",
            default => "Your reservation status has been updated. Please check your reservation details.",
        };
    }
} 