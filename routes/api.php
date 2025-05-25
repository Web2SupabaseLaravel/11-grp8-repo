<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserApiController;

// ✅ API CRUD للمستخدمين بدون تسجيل دخول أو توكن
Route::apiResource('users', UserApiController::class);
