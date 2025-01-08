<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\SanPham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SanPhamController extends Controller
{
    function getListNewProducts()
    {
        try {
            $listSanPham = SanPham::orderBy("ngayThem", 'desc')->take(10)->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm mới",
                'data' => [
                    'listSanPham' => $listSanPham
                ]
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "lỗi server",
                'data' => []
            ], 500);
        }
    }
    // sản phẩm bán chạy hehehehehehhêhhêh
    function getListBestSellingProducts()
    {
        try {
            $listSanPham = ChiTietHoaDon::select(
                'chitiethoadon.idHoaDon',
                'chitiethoadon.idSanPham',
                DB::raw('SUM(soLuong) as totalSoLuong'),
                'tongTien',
                'hoadon.trangThai'
            )
                ->join('hoadon','hoadon.idHoaDon','=','chitiethoadon.idHoaDon')
                ->where('hoadon.trangThai','=','1')
                ->groupBy('chitiethoadon.idSanPham','hoadon.trangThai')
                ->orderByDesc('totalSoLuong')
                ->take(10)
                ->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm bán chạy",
                'data' => [
                    'listSanPham' => $listSanPham
                ]
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "lỗi server",
                'data' => []
            ], 500);
        }
    }
    function getListProductsKhuyenMai()
    {
        try {
            $listSanPham = SanPham::select('sanpham.*','khuyenmai.*')
            ->join('khuyenmai','sanpham.idKhuyenMai','=','khuyenmai.idKhuyenMai')
            ->where('khuyenmai.ngayBatDau','<=',now())
            ->where('khuyenmai.ngayKetThuc','>=',now())
            ->orderByDesc('khuyenmai.ngayBatDau')
            ->take(10)
            ->get();

            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm khuyến mãi",
                'data' => [
                    'listSanPham' => $listSanPham
                ]
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "lỗi server",
                'data' => []
            ], 500);
        }
    }
    function getListProductsLaptop(){
        try {
            $listSanPham = SanPham::where('loai','=','1')->orderBy("ngayThem", 'desc')->take(10)->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm mới",
                'data' => [
                    'listSanPham' => $listSanPham
                ]
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "lỗi server",
                'data' => []
            ], 500);
        }
    }

    


}
