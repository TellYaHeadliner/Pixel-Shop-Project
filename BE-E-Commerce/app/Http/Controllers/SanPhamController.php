<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\GioHang;
use App\Models\SanPham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\VarDumper\VarDumper;

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
            $tempSanPham = SanPham::getListBestSellingProducts();

            $listSanPham=SanPham::select('idSanPham','tenSanPham','hang','img')
                                ->whereIn('idSanPham',$tempSanPham)
                                ->orderByRaw("FIELD(idSanPham, " . implode(',', $tempSanPham) . ")")
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
                'message' => 'lỗi server '.$err,
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
