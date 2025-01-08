<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\GioHang;
use App\Models\SanPham;


class GioHangController extends Controller
{
    function getListSanPhamGioHang(){

        try {
            $listSanPham = GioHang::select('giohang.idSanPham','giohang.soLuong','sanpham.tenSanPham','sanpham.gia')
            ->join('sanpham','sanpham.idSanPham','=','giohang.idSanPham')
            ->where('idNguoiDung','=','1')->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm giỏ hàng người dùng id:",
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

    function updateSoLuongSanPhamGioHang(Request $request){
        $idSP=$request->input('idSanPham');
        $idNguoiDung=1;
        $soLuong=$request->input('soLuong');

        try{
            $Item=GioHang::where('idSP','=',$idSP)
                ->where('idNguoiDung','=',$idNguoiDung)
                ->first();

            $soluongSP=SanPham::select('soLuong')->where('idSanPham','=',$idSP)->first();







            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm mới",
                'data' => [
                    'listSanPham' => '',
                ]
            ], 200);
        }catch(\Exception $err){
            return response()->json([
                'success' => false,
                'message' => "lỗi server",
                'data' => []
            ], 500);
        }
    }
}
