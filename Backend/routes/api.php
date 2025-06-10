<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestMyTableAPIController;


// Route::apiResource('rest-my-table', RestMyTableController::class);

Route::get('/rest-my-table', [RestMyTableAPIController::class, 'index']);
Route::post('/rest-my-table', [RestMyTableAPIController::class, 'store']);
Route::get('/rest-my-table/{id}', [RestMyTableAPIController::class, 'show']);
Route::patch('/rest-my-table/{id}', [RestMyTableAPIController::class, 'update']);
Route::put('/rest-my-table/{id}', [RestMyTableAPIController::class, 'update']);
Route::delete('/rest-my-table/{id}', [RestMyTableAPIController::class, 'destroy']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
