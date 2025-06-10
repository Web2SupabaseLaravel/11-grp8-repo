<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AuthController;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::get('reservations', [ReservationController::class, 'index']);
Route::post('reservations', [ReservationController::class, 'store']);
Route::get('reservations/{date}/{time}/{id}', [ReservationController::class, 'show']);
Route::put('reservations/{date}/{time}/{id}', [ReservationController::class, 'update']);
Route::delete('reservations/{date}/{time}/{id}', [ReservationController::class, 'destroy']);

Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->middleware('auth:api');
    Route::get('/{id}', [NotificationController::class, 'show'])->middleware('auth:api');
    Route::delete('/{id}', [NotificationController::class, 'destroy'])->middleware('auth:api');
    Route::post('/test', [NotificationController::class, 'sendTest']);
});