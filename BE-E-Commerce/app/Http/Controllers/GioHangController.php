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

        if ($soLuong <= 0) {
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

    function deleteSanPhamId(Request $request)
    {
        $idSanPham = $request['idSanPham'];
        $idNguoiDung = 1;

        try {

            DB::table('giohang')
                ->where('idSanPham', $idSanPham)
                ->where('idNguoiDung', $idNguoiDung)
                ->delete();

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


    function deleteSanPhamAll(Request $request)
    {
        $ListIdSanPham = $request['listIdSanPham'];
        $idNguoiDung = 1;
        try {

            DB::table('giohang')
                ->whereIn('idSanPham', $ListIdSanPham)
                ->where('idNguoiDung', $idNguoiDung)
                ->delete();

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

    function createGioHang(Request $request)
    {
        try {
            $idSanPham=SanPham::select('idSanPham')->where('slug', $request['slug'])->first();
            $data = [
                'idSanPham' => $idSanPham['idSanPham'],
                'idNguoiDung' => 1,
                'soLuong' => $request['soLuong']
            ];

            // $temp = GioHang::select('soLuong')->where('idSanPham', $data['idSanPham'])
            //                 ->where('idNguoiDung', $data['idNguoiDung'])
            //                 ->first();

            $temp = DB::table('giohang')
            ->select( 'giohang.soLuong')
            ->join('sanpham', 'sanpham.idSanPham', '=', 'giohang.idSanPham')
            ->where('giohang.idSanPham',$data['idSanPham'] )
            ->where('giohang.idNguoiDung', $data['idNguoiDung'])
            ->first();
            
            var_dump($temp->soLuong);
            
            // if ($temp) {
            //     DB::table('giohang')
            //     ->where('idSanPham', $data['idSanPham'])
            //     ->where('idNguoiDung', $data['idNguoiDung'])
            //     ->update(['soLuong' => $data['soLuong']]);
            //     return response()->json([
            //         'success' => true,
            //         'message' => '',
            //         'data' => []
            //     ], 200);
            // } else {
            //     GioHang::created([
            //         'idSanPham' => $data['idSanPham'],
            //         'idNguoiDung' => $data['idNguoiDung'],
            //         'soLuong' => $data['soLuong']
            //     ]);
            //     return response()->json([
            //         'success' => true,
            //         'message' => '',
            //         'data' => []
            //     ], 200);
            // }
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi server: '.$err,
                'data' => []
            ], 500);
        }
    }
}
