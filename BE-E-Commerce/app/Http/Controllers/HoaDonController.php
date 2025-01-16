<?php

namespace App\Http\Controllers;

use App\Models\HoaDon;
use App\Models\LoHang;
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
		function loiNhuanHienTai(){
			try{
				$ban = HoaDon::join('chitiethoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
											->select('chitiethoadon.idSanPham', 
												DB::raw('SUM(chitiethoadon.soLuong) as soLuongBan'), 
												DB::raw('SUM(chitiethoadon.tongGia) as doanhThu'))
											->whereIn('hoadon.trangThai',[1,2])
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
												$tienTonKho += ($n->soLuong - $soBan)*$n->giaNhap;
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
				],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => false,
					'message' => $e->getMessage(),
				],500);
			}
		}

		function thongKeSanPhamDaBanTheoThang(){
			try{
				$data = DB::table('chitiethoadon')
					->join('hoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
					->selectRaw('
							YEAR(hoadon.ngayDat) as nam,
							MONTH(hoadon.ngayDat) as thang,
							chitiethoadon.idSanPham,
							SUM(chitiethoadon.soLuong) as tongSoLuong
					')
					->whereIn('hoadon.trangThai', [1,2])
					->groupBy(DB::raw('YEAR(hoadon.ngayDat), MONTH(hoadon.ngayDat), chitiethoadon.idSanPham'))
					->orderBy('nam')
					->orderBy('thang')
					->get();
				return response()->json([
					'success' => false,
					'message' => 'Lấy danh sách thành công!',
					'data' => $data,
				],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => false,
					'message' => $e->getMessage(),
				],500);
			};
		}
}
