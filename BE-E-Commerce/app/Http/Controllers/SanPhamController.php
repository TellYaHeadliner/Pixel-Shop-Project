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
    function getAllProducts(){
        try {
            $listSanPham = SanPham::all()->take(3);
            return response()->json([
               'success' => true,
               'message' => "Danh sách sản phẩm",
               'data' => $listSanPham,
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
               'success' => false,
               'message' => "lỗi server",
               'data' => []
            ], 500);
        }
    }

    function getProduct($slug){
        try {
            $sanPham = SanPham::where('slug', $slug)->first();
            $thongSoSanPham = DB::table('thongsosanpham')->where('idSanPham', $sanPham->idSanPham)->first();
            $danhGia = DB::table('danhgia')
                ->join('nguoidung', 'nguoidung.idNguoiDung', '=', 'danhgia.idNguoiDung')
                ->where('danhgia.idNguoiDung', 1)
                ->select('danhgia.*', 'nguoidung.tenDangNhap')
                ->get();
            $sanPhamLienQuan = SanPham::where('idDanhMuc', $sanPham->idDanhMuc)->take(3)->get();
            $khuyenmai=SanPham::select('khuyenmai.phanTram','khuyenmai.ngayBatDau','khuyenmai.ngayKetThuc')
                ->join('khuyenmai','khuyenmai.idKhuyenMai','=','sanpham.idKhuyenMai')
                ->where('slug',$slug)
                ->where('khuyenmai.ngayBatDau','<=',now())
                ->where('khuyenmai.ngayKetThuc','>=',now())
                ->first();
            if($sanPham){
                return response()->json([
                   'success' => true,
                   'message' => "Thông tin sản phẩm",
                   'data' => [
                    'thongSoSanPham' => $thongSoSanPham,
                    'sanPham' => $sanPham,
                    'danhGia' => $danhGia,
                    'sanPhamLienQuan' => $sanPhamLienQuan,
                    'khuyenmai'=> (!$khuyenmai) ? 0 : $khuyenmai->phanTram,
                   ]
                ], 200);
            }else{
                return response()->json([
                   'success' => false,
                   'message' => "Không tìm thấy sản phẩm",
                   'data' => null,
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
               'message' => "Lỗi server" .$th,
               'data' => null
            ], 500);
        }
    }
    
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
            $listSanPham = SanPham::where('loai','=','1')->orderBy("ngayThem", 'desc')->take(3)->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm mới",
                'data' => $listSanPham
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
