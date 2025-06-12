<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\API\UserApiController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\API\PasswordResetController;

// تسجيل المستخدم وتسجيل الدخول بدون حماية
Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

// الراوتات المحمية بالتوكن
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('user', [JWTAuthController::class, 'getUser']);    // بيانات المستخدم المسجل
    Route::post('logout', [JWTAuthController::class, 'logout']); // تسجيل خروج المستخدم

    // جميع راوتات CRUD للمستخدمين محمية بالتوكن
    Route::apiResource('users', UserApiController::class);

});
