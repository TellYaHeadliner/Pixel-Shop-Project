<?php

namespace App\Http\Controllers;

use App\Models\HoaDon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HoaDonController extends Controller
{
    function checkHoaDonById($idNguoiDung, $idSanPham)
    {
        try {
            $data = DB::table('hoadon')
                ->join('chitiethoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
                ->where('hoadon.idNguoiDung', $idNguoiDung)
                ->where('chitiethoadon.idSanPham', $idSanPham)
                ->select('hoadon.*', 'chitiethoadon.*')
                ->first();
            if ($data) {
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

    function thongKeDoanhThuTheoNgay($thang = null, $nam = null)
    {
        $thang = $thang ?: now()->month;
        $nam = $nam ?: now()->year;
        try{
            $data = DB::table('hoadon')
            ->where('trangThai', 2)
            ->whereMonth('ngayXacNhan', $thang)
            ->whereYear('ngayXacNhan', $nam)
            ->orderBy('ngayXacNhan', 'desc')
            ->get();
        
        return response()->json([
            'success'=>true,
            'message'=>'Doanh thu theo thang '.$thang.' nam '.$nam,
            'data'=> $data
        ],200);
        }catch(\Exception $err){
            return response()->json([
                'success'=>false,
                'message'=>'lỗi server '.$err->getMessage(),
                'data'=> []
            ],500); 
        }
    }

    function thongKeDoanhThuTheoNguoDung($idNguoiDung)
    {  
        try{
            $data = DB::table('hoadon')
            ->where('trangThai', 2)
            ->where('idNguoiDung',$idNguoiDung)
            ->orderBy('ngayXacNhan', 'desc')
            ->get();
        
        return response()->json([
            'success'=>true,
            'message'=>'Doanh thu cua nguoi dung id:'.$idNguoiDung,
            'data'=> $data
        ],200);
        }catch(\Exception $err){
            return response()->json([
                'success'=>false,
                'message'=>'lỗi server '.$err->getMessage(),
                'data'=> []
            ],500); 
        }
    }

    function thongKeSanPhamTheoNgay($idSanPham,$thang = null, $nam = null)
    {
        $thang = $thang ?: now()->month;
        $nam = $nam ?: now()->year;
        try{
            $data = DB::table('hoadon')
            ->join('chitiethoadon', 'chitiethoadon.idHoaDon', '=', 'hoadon.idHoaDon')
            ->where('hoadon.trangThai', 2)
            ->where('chitiethoadon.idSanPham', $idSanPham)
            ->whereMonth('hoadon.ngayXacNhan', $thang)
            ->whereYear('hoadon.ngayXacNhan', $nam)
            ->orderBy('hoadon.ngayXacNhan', 'desc')
            ->select('chitiethoadon.idSanPham', 'hoadon.*')
            ->get();
        
        return response()->json([
            'success'=>true,
            'message'=>'Doanh thu của san pham '. $idSanPham .' theo '.$thang.' nam '.$nam,
            'data'=> $data
        ],200);
        }catch(\Exception $err){
            return response()->json([
                'success'=>false,
                'message'=>'lỗi server '.$err->getMessage(),
                'data'=> []
            ],500); 
        }
    }
}
