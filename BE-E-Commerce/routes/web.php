<?php

use App\Http\Controllers\SanPhamController;
use App\Http\Middleware\Jwt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DanhMucController;
use App\Http\Controllers\ThongTinController;
use App\Http\Controllers\NhaCungCapController;
use App\Http\Controllers\DiaChiController;
use App\Http\Controllers\LienHeController;
use App\Http\Controllers\GioHangController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\BaiVietController;

use App\Http\Middleware\CheckEmailSignUp;
Route::controller(UserController::class)->group(function () {
	Route::post('/api/login', [UserController::class, 'login']);
	Route::post('/api/VerificationEmail', [UserController::class, 'sendVerificationEmail']);
	Route::post('/api/signup', [UserController::class, 'signup'])->middleware(CheckEmailSignUp::class);
	Route::post('/api/getProfile', [UserController::class, 'getById']);
	Route::post('/api/updateById', [UserController::class, 'updateById']);
	Route::post('/api/changeEmail','updateById')->middleware(CheckEmailSignUp::class);
	Route::post('/api/updateAnhDaiDien','updateAnhDaiDien');
	Route::post('/api/checkToken','checkToken');

});

Route::controller(DanhMucController::class)->group(function () {
	Route::get('/api/listDanhMuc', [DanhMucController::class, 'getList']);
	Route::post('/api/addDanhMuc','add');
});

Route::controller(ThongTinController::class)->group(function () {
	Route::get('/api/getThongTin', [ThongTinController::class, 'get']);
});

Route::controller(NhaCungCapController::class)->group(function () {
	Route::post('/api/addNhaCungCap', [NhaCungCapController::class, 'add']);
	Route::get('/api/listNhaCungCap', [NhaCungCapController::class, 'getList']);
});

Route::controller(DiaChiController::class)->group(function () {
	Route::post('/api/getDiaChiUser', 'getListByUser');
	Route::post('/api/updateDefaultLocation', 'updateDefaultUser');
});

Route::controller(LienHeController::class)->group(function () {
	Route::post('/api/addLienHe','addLienHe');
});

Route::controller(SanPhamController::class)->group(function(){
    Route::get('/api/getListNewProducts',[SanPhamController::class,'getListNewProducts']);
    Route::get('/api/getListBestSellingProducts',[SanPhamController::class,'getListBestSellingProducts']);
    Route::get('/api/getListProductsKhuyenMai',[SanPhamController::class,'getListProductsKhuyenMai']);
	Route::get('api/product/{slug}', [SanPhamController::class, 'getProduct']);
    Route::get('/api/getChiTietSanPham', [SanPhamController::class, 'getChiTiet']);
	Route::get('/api/listLaptop', [SanPhamController::class, 'getListProductsLaptop']);
	Route::post('/api/addSanPham','addSanPham');
});

Route::controller(GioHangController::class)->group(function(){
    Route::get('/api/getListSanPhamGioHang',[GioHangController::class,'getListSanPhamGioHang']);
    Route::put('/api/updateSoLuongSanPhamGioHang',[GioHangController::class,'updateSoLuongSanPhamGioHang']);
    Route::delete('/api/deleteSanPhamId',[GioHangController::class,'deleteSanPhamId']);
    Route::delete('/api/deleteSanPhamAll',[GioHangController::class,'deleteSanPhamAll']);
    Route::post('/api/addProductInGioHang',[GioHangController::class,'createGioHang']); // done 
    Route::post('/api/addProductInGioHang',[GioHangController::class,'addProductInGioHang']); // done 
});





