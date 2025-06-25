<?php

use App\Http\Controllers\Api\RestaurantApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('restaurants',[RestaurantApiController::class,'store']);

Route::put('restaurants/{restaurant_id}',[RestaurantApiController::class,'update']);

Route::get('restaurants',[RestaurantApiController::class,'index']); 

Route::get('restaurants/{restaurant_id}',[RestaurantApiController::class,'show']);

Route::delete('restaurants/{restaurant_id}',[RestaurantApiController::class,'destroy']);

#Route::get('/check-db', function () {
#    return \DB::select('SELECT current_database() as db');
#});


#Route::get('/preview-restaurants', function () {
#    return \App\Models\Restaurant::orderBy('restaurant_id', 'desc')->take(5)->get();
#});
