<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
//Route::get('/dataReservation', [ReservationController::class, 'index']);
//Route::resource('dataReservation', ReservationController::class);
Route::get('/dataReservation', [ReservationController::class, 'index']);
Route::post('/dataReservation', [ReservationController::class, 'store']);
Route::get('/dataReservation/{id}', [ReservationController::class, 'show']);
Route::patch('/dataReservation/{id}', [ReservationController::class, 'update']);
Route::put('/dataReservation/{id}', [ReservationController::class, 'update']);
Route::delete('/dataReservation/{id}', [ReservationController::class, 'destroy']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
