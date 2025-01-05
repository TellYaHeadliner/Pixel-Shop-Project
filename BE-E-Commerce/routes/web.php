<?php

use App\Http\Middleware\Jwt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckEmailSignUp;

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index')->middleware(Jwt::class . ':1');

Route::controller(UserController::class)->group(function(){
    Route::post('/api/login',[UserController::class, 'login']);
    Route::post('/api/VerificationEmail',[UserController::class, 'sendVerificationEmail']);
    Route::post('/api/signup',[UserController::class, 'signup'])->middleware(CheckEmailSignUp::class);
});











