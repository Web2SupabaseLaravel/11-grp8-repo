<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservationController extends Controller
{
    /**
     * The notification service.
     *
     * @var NotificationService
     */
    protected $notificationService;

    /**
     * Create a new controller instance.
     *
     * @param NotificationService $notificationService
     * @return void
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of the reservations.
     */
    public function index()
    {
        $reservations = Reservation::with(['user', 'restaurant', 'table'])->get();
        
        return response()->json($reservations);
    }

    /**
     * Store a newly created reservation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s',
            'user_id' => 'required|exists:users,id',
            'restaurant_id' => 'required|exists:restaurants,id',
            'table_id' => 'required|exists:tables,id'
        ]);

        $reservationId = Reservation::max('reservation_id') + 1;

        $reservation = Reservation::create([
            'Date' => $validated['date'],
            'Time' => $validated['time'],
            'reservation_id' => $reservationId,
            'Status' => 'confirmed',
            'IDTABLE' => $validated['table_id'],
            'IDRest' => $validated['restaurant_id'],
            'IDUser' => $validated['user_id']
        ]);

        $this->notificationService->sendReservationNotification($reservation, 'confirm');

        return response()->json([
            'message' => 'Reservation created and confirmation notification sent.',
            'data' => $reservation
        ], 201);
    }

   
    public function show($date, $time, $id)
    {
        $reservation = Reservation::where('Date', $date)
            ->where('Time', $time)
            ->where('reservation_id', $id)
            ->with(['user', 'restaurant', 'table'])
            ->first();

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        return response()->json($reservation);
    }

 
    public function update(Request $request, $date, $time, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $reservation = Reservation::where('Date', $date)
            ->where('Time', $time)
            ->where('reservation_id', $id)
            ->first();

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $reservation->update([
            'Status' => $validated['status']
        ]);

        $notificationType = $validated['status'] === 'cancelled' ? 'cancel' : 'confirm';
        $this->notificationService->sendReservationNotification($reservation, $notificationType);

        return response()->json([
            'message' => 'Reservation updated and notification sent.',
            'data' => $reservation
        ]);
    }

 
    public function destroy($date, $time, $id)
    {
        $reservation = Reservation::where('Date', $date)
            ->where('Time', $time)
            ->where('reservation_id', $id)
            ->first();

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $this->notificationService->sendReservationNotification($reservation, 'cancel');
        
        $reservation->delete();

        return response()->json([
            'message' => 'Reservation deleted and cancellation notification sent.'
        ]);
    }
}
