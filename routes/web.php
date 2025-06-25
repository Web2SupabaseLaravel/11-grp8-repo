<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/restaurant/create', [RestaurantController::class, 'create'])->name('restaurant.create');
//Route::get('/restaurant/create', [RestaurantController::class, 'create']);
//Route::post('/restaurant/store', [RestaurantController::class, 'store']);

Route::post('/restaurant/store', [RestaurantController::class, 'store'])->name('restaurant.store');


require __DIR__.'/auth.php';
