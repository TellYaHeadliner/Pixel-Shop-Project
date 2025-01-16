<?php

namespace App\Http\Controllers;

use App\Models\HoaDon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DateTime;

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
        try {
            $data = DB::table('hoadon')
                ->where('trangThai', 2)
                ->whereMonth('ngayXacNhan', $thang)
                ->whereYear('ngayXacNhan', $nam)
                ->orderBy('ngayXacNhan', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Doanh thu theo thang ' . $thang . ' nam ' . $nam,
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }

    function thongKeDoanhThuTheoNguoDung($idNguoiDung)
    {
        try {
            $data = DB::table('hoadon')
                ->where('trangThai', 2)
                ->where('idNguoiDung', $idNguoiDung)
                ->orderBy('ngayXacNhan', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Doanh thu cua nguoi dung id:' . $idNguoiDung,
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }

    function thongKeSanPhamTheoNgay($idSanPham, $thang = null, $nam = null)
    {
        $thang = $thang ?: now()->month;
        $nam = $nam ?: now()->year;
        try {
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
                'success' => true,
                'message' => 'Doanh thu của san pham ' . $idSanPham . ' theo ' . $thang . ' nam ' . $nam,
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }

    function getListHoaDon()
    {
        try {
            $data = DB::table('hoadon')
                ->join('diachi', 'hoadon.idDiaChi', '=', 'diachi.idDiaChi')
                ->select('hoadon.idHoaDon', 'hoadon.tongSoTien', 'diachi.sdt', 'diachi.diaChi', 'hoadon.phuongThucThanhToan')
                ->whereNotNull('hoadon.thoiGianKhoa')
                ->orWhere('hoadon.thoiGianKhoa', '<', time())
                ->orderByRaw("
            CASE 
                WHEN trangThai = 0 THEN 1
                WHEN trangThai = 1 THEN 2
                WHEN trangThai = 2 THEN 3
                WHEN trangThai = 3 THEN 4
            END,
            ngayDat ASC
        ")
                ->get();
            return response()->json([
                'success' => true,
                'message' => 'Danh sách đơn hàng',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function getListHoaDonHidden()
    {
        try {
            $data = DB::table('hoadon')
                ->join('diachi', 'hoadon.idDiaChi', '=', 'diachi.idDiaChi')
                ->select('hoadon.idHoaDon', 'hoadon.tongSoTien', 'diachi.sdt', 'diachi.diaChi', 'hoadon.phuongThucThanhToan')
                ->Where('hoadon.thoiGianKhoa', '>', time())
                ->orderByRaw("
            CASE 
                WHEN trangThai = 0 THEN 1
                WHEN trangThai = 1 THEN 2
                WHEN trangThai = 2 THEN 3
                WHEN trangThai = 3 THEN 4
            END,
            ngayDat ASC
        ")
                ->get();
            return response()->json([
                'success' => true,
                'message' => 'Danh sách đơn hàng ẩn',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function getHoaDonById($idHoaDon)
    {
        try {
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->join('chitiethoadon','chitiethoadon.idHoaDon','=','hoadon.idHoaDon')
                ->select('hoadon.*','chitiethoadon.*', 'nguoidung.hoVaTen', 'diachi.diaChi', 'diachi.sdt', 'diachi.note')
                ->where('idHoaDon', $idHoaDon)
                ->first();

            return response()->json([
                'success' => true,
                'message' => '',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function getListHoaDonBySdt($sdt)
    {
        try {
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->select('hoadon.*', 'nguoidung.hoVaTen', 'diachi.diaChi', 'diachi.sdt', 'diachi.note')
                ->where('diachi.sdt', $sdt)
                ->get();

            return response()->json([
                'success' => true,
                'message' => '',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function getListHoaDonByStatusAndDay($status,$day){
        try {
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->select('hoadon.*', 'nguoidung.hoVaTen', 'diachi.diaChi', 'diachi.sdt', 'diachi.note')
                ->where('hoadon.trangThai', $status)
                ->Where('hoadon.ngayDat',DateTime::createFromFormat('d-m-Y',$day))
                ->get();

            return response()->json([
                'success' => true,
                'message' => '',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function getListHoaDonByStatus(Request $request){
        try {
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->select('hoadon.*', 'nguoidung.*', 'diachi.*')
                ->where('hoadon.trangThai', $request['trangThai'])
                ->Where('idNguoiDung',$request['idNguoiDung'])
                ->get();
            return response()->json([
                'success' => true,
                'message' => '',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function updateStatusHoaDon(Request $request)
    {
        try {
            $hoadon = HoaDon::where('idHoaDon', $request['idHoaDon'])->first();

            if (!$hoadon) {
                return response()->json([
                    'success' => false,
                    'message' => 'không tìm thấy hóa đơn',
                    'data' => []
                ], 401);
            }
            if ($hoadon['trangThai'] == 2 || $hoadon['trangThai'] == 3) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cập nhập trạng thái không thành công',
                    'data' => []
                ], 401);
            }
            $hoadon->update([
                'trangThai' => $request['trangThai']
            ]);
            return response()->json([
                'success' => true,
                'message' => 'cập nhập thành công trạng thái hóa đơn',
                'data' => []
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function updateHiddenHoaDon(Request $request)
    {
        try {
            $hoadon = HoaDon::where('idHoaDon', $request['idHoaDon'])->first();

            if (!$hoadon) {
                return response()->json([
                    'success' => false,
                    'message' => 'không tìm thấy hóa đơn',
                    'data' => []
                ], 401);
            }
            if ($hoadon['soLan'] + 1 == 3) {
                $hoadon->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Đã hủy hóa đơn do quá số lần liên lạc',
                    'data' => []
                ], 200);
            }
            $hoadon->update([
                'soLan' => $hoadon['soLan'] + 1,
                'thoiGianKhoa' => time() + 3600 * 2
            ]);
            return response()->json([
                'success' => true,
                'message' => 'cập nhập thành công trạng thái hóa đơn',
                'data' => []
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }



}
