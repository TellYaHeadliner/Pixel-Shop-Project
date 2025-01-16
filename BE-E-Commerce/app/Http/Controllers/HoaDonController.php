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
    function getListOrder(Request $request){
        $data = $request->all();
        try{
            $list = HoaDon::where('hoadon.idNguoiDung','=',$data['idNguoiDung'])
                            ->where('hoadon.trangThai','=',$data['trangThai'])
                            ->join('diachi','diachi.idDiaChi','=','hoadon.idDiaChi')
                            ->get();
            return response()->json([
                'success' => true,
                'message' => 'Lấy danh sách hóa đơn thành công!',
                'data' => $list,
            ],200);
        }
        catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra '. $e->getMessage(),
            ],500);
        }
    }
}
