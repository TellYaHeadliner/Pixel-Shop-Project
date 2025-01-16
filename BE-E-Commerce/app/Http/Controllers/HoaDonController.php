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

    function thongKeDoanhThuTheoTatCaNguoiDung()
    {
        try {
            $data =  DB::table('hoadon')
                ->join('chitiethoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->select(
                    'nguoidung.tenDangNhap AS TenNguoiDung',
                    DB::raw('SUM(hoadon.tongSoTien) AS TongTien'),
                    DB::raw('SUM(chitiethoadon.soLuong) AS SoLuong')
                )
                ->groupBy('nguoidung.tenDangNhap')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Doanh thu cua tất cả người dùng:',
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

    function thongKeDoanhThuSanPhamTheoNgay()
    {
        try {
            $data =  DB::table('chitiethoadon')
                ->join('sanpham', 'chitiethoadon.idSanPham', '=', 'sanpham.idSanPham')
                ->join('hoadon', 'chitiethoadon.idHoaDon', '=', 'hoadon.idHoaDon')
                ->select(
                    'sanpham.tenSanPham AS TenSanPham',
                    DB::raw('hoadon.ngayXacNhan AS Ngay'),
                    DB::raw('SUM(chitiethoadon.soLuong) AS TongSoLuong'),
                    DB::raw('SUM(chitiethoadon.tongTien) AS TongTien')
                )
                ->groupBy('sanpham.tenSanPham', 'hoadon.ngayXacNhan')
                ->orderBy('hoadon.ngayXacNhan')
                ->orderBy('sanpham.tenSanPham')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Doanh thu cua sản phẩm theo ngày',
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

    function thongKeDonHangTheoNgay()
    {
        try {
            $data =  HoaDon::join('chitiethoadon AS c', 'c.idHoaDon', '=', 'hoadon.idHoaDon')
                ->select(
                    DB::raw('DATE(hoadon.ngayXacNhan) AS Ngay'),
                    DB::raw('COUNT(hoadon.idHoaDon) AS SoDonHang'),
                    DB::raw('SUM(c.tongTien) AS DoanhThu')
                )
                ->where('hoadon.trangThai', 2) // Giả sử trạng thái 2 là đã xác nhận
                ->groupBy(DB::raw('DATE(hoadon.ngayXacNhan)'))
                ->orderBy('Ngay')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Thống kê đơn hàng theo ngày',
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
}
