<?php

namespace App\Http\Controllers;

use App\Models\HoaDon;
use App\Models\LoHang;
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
                ->where('hoadon.trangThai', 2)
                ->whereDate('hoadon.NgayXacNhan')
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
    function loiNhuanHienTai()
    {
        try {
            $ban = HoaDon::join('chitiethoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
                ->select(
                    'chitiethoadon.idSanPham',
                    DB::raw('SUM(chitiethoadon.soLuong) as soLuongBan'),
                    DB::raw('SUM(chitiethoadon.tongGia) as doanhThu')
                )
                ->whereIn('hoadon.trangThai', [1, 2])
                ->groupBy('chitiethoadon.idSanPham')
                ->get();
            $nhap = LoHang::join('chitietlohang', 'lohang.idLoHang', '=', 'chitietlohang.idLoHang')
                ->select('chitietlohang.idSanPham', 'chitietlohang.giaNhap', 'chitietlohang.soLuong')
                ->orderBy('lohang.date', 'asc')
                ->get();

            $thongKe = [];
            foreach ($ban as $b) {
                $soBan = $b->soLuongBan;
                $tongNhap = 0;
                $sanPhamTonKho = 0;
                $tienTonKho = 0;

                foreach ($nhap as $n) {
                    if ($b->idSanPham == $n->idSanPham) {
                        if ($soBan > $n->soLuong) {
                            $tongNhap += $n->soLuong * $n->giaNhap;
                            $soBan -= $n->soLuong;
                        } else {
                            $tongNhap += $soBan * $n->giaNhap;
                            $sanPhamTonKho += $n->soLuong - $soBan;
                            $tienTonKho += ($n->soLuong - $soBan) * $n->giaNhap;
                            $soBan = 0;
                        }
                    }
                }

                $thongKe[] = [
                    'idSanPham' => $b->idSanPham,
                    'doanhThu' => $b->doanhThu,
                    'chiPhiNhap' => $tongNhap,
                    'loiNhuan' => $b->doanhThu - $tongNhap,
                    'sanPhamTonKho' => $sanPhamTonKho,
                    'tienTonKho' => $tienTonKho
                ];
            }
            return response()->json([
                'success' => true,
                'message' => 'Lấy thống kê thành công!',
                'data' => $thongKe,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    function thongKeSanPhamDaBanTheoThang()
    {
        try {
            $data = DB::table('chitiethoadon')
                ->join('hoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
                ->selectRaw('
							YEAR(hoadon.ngayDat) as nam,
							MONTH(hoadon.ngayDat) as thang,
							chitiethoadon.idSanPham,
							SUM(chitiethoadon.soLuong) as tongSoLuong
					')
                ->whereIn('hoadon.trangThai', [1, 2])
                ->groupBy(DB::raw('YEAR(hoadon.ngayDat), MONTH(hoadon.ngayDat), chitiethoadon.idSanPham'))
                ->orderBy('nam')
                ->orderBy('thang')
                ->get();
            return response()->json([
                'success' => false,
                'message' => 'Lấy danh sách thành công!',
                'data' => $data,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        };
    }
    function getListHoaDon()
    {
        try {
            $data = DB::table('hoadon')
                ->join('diachi', 'hoadon.idDiaChi', '=', 'diachi.idDiaChi')
                ->select('hoadon.idHoaDon', 'hoadon.tongSoTien', 'diachi.sdt', 'diachi.diaChi', 'hoadon.phuongThucThanhToan')
                ->whereNull('hoadon.thoiGianKhoa')
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
    ->join('chitiethoadon', 'chitiethoadon.idHoaDon', '=', 'hoadon.idHoaDon')
    ->join('sanpham', 'chitiethoadon.idSanPham', '=', 'sanpham.idSanPham')
    ->select(
        'nguoidung.hoVaTen', 
        'hoadon.idHoaDon', 
        'hoadon.trangThai', 
        'hoadon.phuongThucThanhToan', 
        'hoadon.ngayXacNhan', 
        'diachi.sdt',
        'chitiethoadon.*', 
        'sanpham.img', 
        'sanpham.tenSanPham', 
        'sanpham.gia'
    )
    ->where('hoadon.idHoaDon', $idHoaDon)
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
    function getListHoaDonBySdt(Request $request)
    {
        try {
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->select('hoadon.*', 'nguoidung.hoVaTen', 'diachi.diaChi', 'diachi.sdt', 'diachi.note')
                ->where('diachi.sdt', $request['sdt'])
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
    function getListHoaDonByStatusAndDay($status, $day)
    {
        try {

            $day = DateTime::createFromFormat('d-m-Y', $day)->format('Y-m-d');
            var_dump($status);
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->select('hoadon.*', 'nguoidung.hoVaTen', 'diachi.diaChi', 'diachi.sdt', 'diachi.note')
                ->where('hoadon.trangThai', $status)
                ->whereRaw('Date(hoadon.ngayDat)=?', [$day])
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
    function getListHoaDonByStatus(Request $request)
    {
        try {
            $data = DB::table('hoadon')
                ->join('nguoidung', 'hoadon.idNguoiDung', '=', 'nguoidung.idNguoiDung')
                ->join('diachi', 'diachi.idDiaChi', '=', 'hoadon.idDiaChi')
                ->select('hoadon.*', 'nguoidung.*', 'diachi.*')
                ->where('hoadon.trangThai', $request['trangThai'])
                ->Where('hoadon.idNguoiDung', $request['idNguoiDung'])
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
            ($request['trangThai'] == 1) ?
                $hoadon->update([
                    'trangThai' => $request['trangThai'],
                    'nhanVienXacNhan' => $request['idNguoiDung'],
                    'ngayXacNhan' => now()
                ]) : $hoadon->update([
                    'trangThai' => $request['trangThai'],

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

    function create_payment(Request $request){
        try { 
            // check thanh toan tien mat
            if(!$request['phuongThucThanhToan']){
                DB::table('hoadon')
                    ->insert([
                        'idNguoiDung'=>$request['idNguoiDung'],
                        'idDiaChi'=>$request['idDiaChi'],
                        'tongSoTien'=>$request['tongSoTien'],
                        'trangThai'=>0,
                        'phuongThucThanhToan'=>0,
                        'ngayDat'=> now(),
                    ]);
                    
                
                return response()->json([
                    'success'=>true,
                    'message'=>'Đặt hàng thành công',
                    'data'=>[]
                ]);






            }
            



        } catch (\Exception $err) {
            return response()->json([
                "success" => false,
                "message" => $err->getMessage(),
                "data" => [],
            ], 500);
        }









    }



}
