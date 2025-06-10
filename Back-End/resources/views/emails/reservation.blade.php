<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reservation Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #f6f6f6;
            padding: 15px;
            text-align: center;
            border-bottom: 2px solid #ddd;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #eee;
        }
        .reservation-details {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #4caf50;
        }
        .action-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4caf50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ config('app.name', 'Restaurant Reservation System') }}</h1>
    </div>
    
    <div class="content">
        <h2>Hello {{ $userName }},</h2>

        @if ($type == 'confirm')
            <p>Your reservation has been <strong>confirmed</strong>.</p>
        @elseif ($type == 'cancel')
            <p>Your reservation has been <strong>cancelled</strong>.</p>
        @elseif ($type == 'reminder')
            <p>This is a friendly <strong>reminder</strong> about your upcoming reservation.</p>
        @endif

        <div class="reservation-details">
            <p><strong>Reservation Date & Time:</strong> {{ $reservationTime->format('l, F j, Y \a\t g:i A') }}</p>
            <p><strong>Reservation Status:</strong> {{ ucfirst($status) }}</p>
            @if($restaurant)
                <p><strong>Restaurant:</strong> {{ $restaurant->name }}</p>
            @endif
            @if($table)
                <p><strong>Table Number:</strong> {{ $table->number }}</p>
            @endif
            <p><strong>Name:</strong> {{ $userName }}</p>
            <p><strong>Email:</strong> {{ $userEmail }}</p>
        </div>

        @if ($type == 'confirm')
            <p>We're looking forward to serving you. If you need to make any changes to your reservation, please contact us as soon as possible.</p>
            <a href="{{ config('app.url') }}/reservations/{{ $reservation->Date }}/{{ $reservation->Time }}/{{ $reservation->reservation_id }}" class="action-button">View Reservation</a>
        @elseif ($type == 'cancel')
            <p>Your reservation has been cancelled. We hope to see you another time.</p>
        @elseif ($type == 'reminder')
            <p>We're looking forward to seeing you soon. If you need to make any changes, please contact us before your reservation time.</p>
            <a href="{{ config('app.url') }}/reservations/{{ $reservation->Date }}/{{ $reservation->Time }}/{{ $reservation->reservation_id }}" class="action-button">View Reservation</a>
        @endif
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} {{ config('app.name', 'Restaurant Reservation System') }}. All rights reserved.</p>
        <p>If you have any questions, please contact our support team.</p>
    </div>
</body>
</html>
