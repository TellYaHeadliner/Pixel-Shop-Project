<?php

use App\Http\Middleware\Jwt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;

Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});


Route::get('/blog', [BlogController::class, 'index'])->name('blog.index')->middleware(Jwt::class . ':1');


//1 admin
Route::middleware(Jwt::class . ':1')->group(function(){
    
});
//2 khach hang
Route::middleware(Jwt::class . ':2')->group(function(){
    
});
//3 nhan vien tu van
Route::middleware(Jwt::class . ':3')->group(function(){
    
});
// khong can kiem tra role
Route::controller(UserController::class)->group(function(){
    Route::post('/api/login',[UserController::class, 'login']);
});











