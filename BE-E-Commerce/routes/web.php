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
use App\Http\Controllers\DanhGiaController;
use App\Http\Controllers\HoaDonController;
use App\Http\Controllers\YeuThichController;

use App\Http\Middleware\CheckEmailSignUp;


Route::controller(UserController::class)->group(function () {
	Route::post('/api/login', [UserController::class, 'login']);
	Route::post('/api/VerificationEmail', [UserController::class, 'sendVerificationEmail']);
	Route::post('/api/signup', [UserController::class, 'signup'])->middleware(CheckEmailSignUp::class);
	Route::post('/api/getProfile', 'getById')->middleware(JWT::class.':3');
	Route::post('/api/updateById', [UserController::class, 'updateById'])->middleware(JWT::class.':3');
	Route::post('/api/changeEmail','updateById')->middleware(CheckEmailSignUp::class);
	Route::post('/api/updateAnhDaiDien','updateAnhDaiDien')->middleware(JWT::class.':3');
	Route::post('/api/checkToken','checkToken');
	Route::get('/api/thongKeDoTuoi','thongKeDoTuoi');

});

Route::controller(DanhMucController::class)->group(function () {
    Route::get('/api/listDanhMuc', [DanhMucController::class, 'getList']); 
    Route::post('/api/addDanhMuc', 'add'); 
    Route::put('/api/updateDanhMuc/{id}', 'update'); 
    Route::delete('/api/deleteDanhMuc/{id}', 'delete'); 
});

Route::controller(DanhGiaController::class)->group(function () {
	Route::get('/api/getDanhGiaByIdSanPham/{id}','getDanhGiaByIdSanPham');
	Route::get('/api/checkDanhGia/{idNguoiDung}/{idSanPham}','checkDanhGia'); 
	Route::get('/api/getDanhGiaById/{idNguoiDung}/{idSanPham}','getDanhGiaById'); 
	Route::get('/api/getListDanhGia', 'getListDanhGia');
	Route::post('/api/addDanhGia','addDanhGia');
	Route::delete('/api/deleteDanhGia','deleteDanhGia');
	
});

Route::controller(ThongTinController::class)->group(function () {
	Route::get('/api/getThongTin', [ThongTinController::class, 'get']);
	Route::post('/api/updateThongTin', [ThongTinController::class, 'update']);
});

Route::controller(NhaCungCapController::class)->group(function () {
	Route::post('/api/addNhaCungCap', [NhaCungCapController::class, 'add']);
	Route::get('/api/listNhaCungCap', [NhaCungCapController::class, 'getList']);
});

Route::controller(DiaChiController::class)->group(function () {
	Route::post('/api/getDiaChiUser', 'getListByUser')->middleware(JWT::class.':3');
	Route::post('/api/updateDefaultLocation', 'updateDefaultUser')->middleware(JWT::class.':3');
	Route::post('/api/deleteLocation','delete')->middleware(JWT::class.':3');
	Route::post('/api/updateLocation','update')->middleware(JWT::class.':3');
	Route::post('/api/addLocation','add')->middleware(JWT::class.':3');
});

Route::controller(LienHeController::class)->group(function () {
	Route::get('/api/getListLienHe','getList');
	Route::get('/api/getByIdLienHe/{id}','getById');
	Route::post('/api/addLienHe','addLienHe');
	Route::put('/api/updateStatusLienHe','updateStatusLienHe'); // request: idLienHe , trangThai (0,1)
	Route::delete('/api/deleteLienHe','deleteLienHe'); // request:idLienHe
});

Route::controller(SanPhamController::class)->group(function(){
    Route::get('/api/getListNewProducts',[SanPhamController::class,'getListNewProducts']);
    Route::get('/api/getListBestSellingProducts',[SanPhamController::class,'getListBestSellingProducts']);
    Route::get('/api/getListProductsKhuyenMai',[SanPhamController::class,'getListProductsKhuyenMai']);
	Route::get('api/product/{slug}', [SanPhamController::class, 'getProduct']);
    Route::get('/api/getChiTietSanPham', [SanPhamController::class, 'getChiTiet']);
	Route::get('/api/listLaptop', [SanPhamController::class, 'getListProductsLaptop']);
	Route::get('/api/getListSanPhamNoiBat', [SanPhamController::class, 'getListProductNoiBat']);
	Route::post('/api/addSanPham','addSanPham');
	Route::post('/api/getListSanPham','search');
	Route::post('/api/getProductBySlug','getProductBySlug');
});

Route::controller(GioHangController::class)->group(function(){
    Route::post('/api/getListSanPhamGioHang',[GioHangController::class,'getListSanPhamGioHang'])->middleware(Jwt::class . ':3');
    Route::put('/api/updateSoLuongSanPhamGioHang',[GioHangController::class,'updateSoLuongSanPhamGioHang']);
    Route::delete('/api/deleteSanPhamId',[GioHangController::class,'deleteSanPhamId']);
    Route::delete('/api/deleteSanPhamAll',[GioHangController::class,'deleteSanPhamAll']);
    Route::post('/api/addProductInGioHang',[GioHangController::class,'createGioHang']); // done 
    Route::post('/api/addProductInGioHang',[GioHangController::class,'addProductInGioHang']); // done 
});

Route::controller(BaiVietController::class)->group(function(){
	Route::post('/api/getBaiViet','get');
	Route::post('/api/getListBaiViet','getList');
    Route::get('/api/getDetailBaiViet/{id}',[BaiVietController::class,'get']);
	Route::get('/api/getListBaiVietKhuyenMai', [BaiVietController::class, 'getListKhuyenMai']);
	Route::get('/api/getListQuangCao', [BaiVietController::class, 'getListQuangCao']);
});

Route::controller(HoaDonController::class)->group(function(){
	Route::get('/api/checkHoaDonById/{idNguoiDung}/{idSanPham}','checkHoaDonById');
	Route::post('/api/getListOrder','getListOrder');
	Route::get('/api/thongKeDoanhThuTheoThangVaNam/{thang}/{nam}','thongKeDoanhThuTheoNgay');
	Route::get('/api/thongKeDoanhThuTheoNguoiDung/{idNguoiDung}','thongKeDoanhThuTheoNguoDung');
	Route::get('/api/thongKeSanPhamTheoThangVaNam/{thang}/{nam}','thongKeSanPhamTheoNgay');
	Route::get('/api/loiNhuanHienTai','loiNhuanHienTai');
	Route::get('/api/sanPhamDaBanTheoThang','thongKeSanPhamDaBanTheoThang');
	Route::get('/api/getListHoaDon','getListHoaDon');
	Route::get('/api/getListHoaDonHidden','getListHoaDonHidden');
	Route::get('/api/getHoaDonById/{idHoaDon}','getHoaDonById');
	Route::post('/api/getListHoaDonBySdt','getListHoaDonBySdt');
	Route::get('/api/getListHoaDonByStatusAndDay/{status}/{day}','getListHoaDonByStatusAndDay');
	Route::post('/api/getListHoaDonByStatus','getListHoaDonByStatus')->middleware(JWT::class.':3');
	Route::put('/api/updateStatusHoaDon','updateStatusHoaDon');
	Route::put('/api/updateHiddenHoaDon','updateHiddenHoaDon');
	Route::get('/api/thongKeDoanhThuTheoTatCaNguoiDung', 'thongKeDoanhThuTheoTatCaNguoiDung');
	Route::get('/api/thongKeDoanhThuSanPhamTheoNgay','thongKeDoanhThuSanPhamTheoNgay');
	Route::get('/api/thongKeDonHangTheoNgay', 'thongKeDonHangTheoNgay');
});

Route::controller(YeuThichController::class)->group(function(){
	Route::get('/api/checkYeuThich/{idNguoiDung}/{idSanPham}','checkYeuThich');
	Route::get('/api/getSoLuongYeuThichByIdSanPham/{idSanPham}','getSoLuongYeuThichByIdSanPham');
	Route::post('/api/addYeuThich','addYeuThich');
	Route::delete('/api/deleteYeuThich','deleteYeuThich')->middleware(JWT::class.':3');
	Route::post('/api/getListYeuThich','getListByIdUser')->middleware(JWT::class.':3');


});



