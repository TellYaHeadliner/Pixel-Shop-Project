<?php

use App\Http\Middleware\Jwt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DanhMucController;


Route::controller(UserController::class)->group(function(){
    Route::post('/api/login',[UserController::class, 'login']);
});

Route::controller(DanhMucController::class)->group(function(){
	Route::get('/api/listDanhMuc',[DanhMucController::class, 'getList']);
});









