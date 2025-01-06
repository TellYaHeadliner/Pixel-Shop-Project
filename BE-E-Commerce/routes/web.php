<?php

use App\Http\Middleware\Jwt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DanhMucController;
use App\Http\Controllers\ThongTinController;
use App\Http\Middleware\CheckEmailSignUp;
Route::controller(UserController::class)->group(function(){
    Route::post('/api/login',[UserController::class, 'login']);
    Route::post('/api/VerificationEmail',[UserController::class, 'sendVerificationEmail']);
    Route::post('/api/signup',[UserController::class, 'signup'])->middleware(CheckEmailSignUp::class);
});

Route::controller(DanhMucController::class)->group(function(){
	Route::get('/api/listDanhMuc',[DanhMucController::class, 'getList']);
});

Route::controller(ThongTinController::class)->group(function(){
	Route::get('/api/getThongTin',[ThongTinController::class, 'get']);
});








