<?php

namespace App\Http\Controllers;

use App\Models\HoaDon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HoaDonController extends Controller
{
    function checkHoaDonById($idNguoiDung,$idSanPham){
        try {
            $data = DB::table('hoadon')
                        ->join('chitiethoadon','hoadon.idHoaDon','=','chitiethoadon.idHoaDon')
                        ->where('hoadon.idNguoiDung',$idNguoiDung)
                        ->where('chitiethoadon.idSanPham',$idSanPham)
                        ->select('hoadon.*','chitiethoadon.*')
                        ->first();
            if($data){
                return response()->json([
                    'success' => true,
                    'message' => ' Người dùng đã từng mua sản phẩm này',
                    'data' => $data
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => ' Người dùng chưa từng mua sản phẩm này',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                "success" => false,
                "message" => $err->getMessage(),
                "data" => [],
            ], 500);
        }
    }
}
