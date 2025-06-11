<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestMyTableAPIController;
use App\Http\Controllers\RestController;

Route::apiResource('rest-my-tables', RestMyTableAPIController::class);

Route::get('/', function () {
    return view('welcome');
});
