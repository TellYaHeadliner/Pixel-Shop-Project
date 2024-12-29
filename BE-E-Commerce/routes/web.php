<?php

use App\Http\Middleware\Jwt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LoginController;

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index')->middleware(Jwt::class . ':1');
Route::get('/login',[LoginController::class,'CreateJwt'])->name('Create.Jwt');  