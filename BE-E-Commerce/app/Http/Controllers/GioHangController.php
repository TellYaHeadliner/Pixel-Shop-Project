<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\GioHang;
use App\Models\SanPham;


class GioHangController extends Controller
{
    function getListSanPhamGioHang()
    {

        try {
            $listSanPham = DB::table('giohang')
                ->select('giohang.idSanPham', 'giohang.soLuong', 'sanpham.tenSanPham', 'sanpham.gia')
                ->join('sanpham', 'sanpham.idSanPham', '=', 'giohang.idSanPham')
                ->where('giohang.idNguoiDung', '=', 1)
                ->get();
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

    function updateSoLuongSanPhamGioHang(Request $request)
    {
        $idSanPham = $request->input('idSanPham');
        $idNguoiDung = 1;
        $soLuong = $request->input('soLuong');

        if($soLuong<=0){
            return response()->json([
                'success' => false,
                'message' => "Số lượng sản phẩm không nhỏ hơn 0",
                'data' => []
            ], 403);
        }

        try {

            $soLuongDB = SanPham::select('soLuong')->where('idSanPham', '=', $idSanPham)->first();
            if ($soLuong > $soLuongDB['soLuong']) {
                return response()->json([
                    'success' => false,
                    'message' => "số lượng sản phẩm vượt quá tồn kho",
                    'data' => []
                ], 403);
            }
            DB::table('giohang')
                ->where('idSanPham', $idSanPham)
                ->where('idNguoiDung', $idNguoiDung)
                ->update(['soLuong' => $soLuong]);

            return response()->json([
                'success' => true,
                'message' => "Thành công",
                'data' => []
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "lỗi server" . $err,
                'data' => []
            ], 500);
        }
    }
}
