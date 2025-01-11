<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\GioHang;
use App\Models\SanPham;
use App\Models\ThongSoSanPham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\VarDumper\VarDumper;

class SanPhamController extends Controller
{
    function getAllProducts(){
        try {
            $listSanPham = SanPham::all()->take(3);
            return response()->json([
               'success' => true,
               'message' => "Danh sách sản phẩm",
               'data' => $listSanPham,
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
               'success' => false,
               'message' => "lỗi server",
               'data' => []
            ], 500);
        }
    }

    function getProduct($slug){
        try {
            $sanPham = SanPham::where('slug', $slug)->first();
            $thongSoSanPham = DB::table('thongsosanpham')->where('idSanPham', $sanPham->idSanPham)->first();
            $danhGia = DB::table('danhgia')
                ->join('nguoidung', 'nguoidung.idNguoiDung', '=', 'danhgia.idNguoiDung')
                ->where('danhgia.idSanPham', $sanPham->idSanPham)
                ->select('danhgia.*', 'nguoidung.tenDangNhap')
                ->get();
            $sanPhamLienQuan = SanPham::where('idDanhMuc', $sanPham->idDanhMuc)->take(3)->get();
            if($sanPham){
                return response()->json([
                   'success' => true,
                   'message' => "Thông tin sản phẩm",
                   'data' => [
                    'thongSoSanPham' => $thongSoSanPham,
                    'sanPham' => $sanPham,
                    'danhGia' => $danhGia,
                    'sanPhamLienQuan' => $sanPhamLienQuan,
                   ]
                ], 200);
            }else{
                return response()->json([
                   'success' => false,
                   'message' => "Không tìm thấy sản phẩm",
                   'data' => null,
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
               'message' => "Lỗi server",
               'data' => null
            ], 500);
        }
    }
    
    function getListNewProducts()
    {
        try {
            $listSanPham = SanPham::orderBy("ngayThem", 'desc')->take(10)->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm mới",
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
    // sản phẩm bán chạy hehehehehehhêhhêh
    function getListBestSellingProducts()
    {
        try {
            $tempSanPham = SanPham::getListBestSellingProducts();

            $listSanPham=SanPham::select('idSanPham','tenSanPham','hang','img')
                                ->whereIn('idSanPham',$tempSanPham)
                                ->orderByRaw("FIELD(idSanPham, " . implode(',', $tempSanPham) . ")")
                                ->get();

            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm bán chạy",
                'data' => [
                    'listSanPham' => $listSanPham
                ]
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'lỗi server '.$err,
                'data' => []
            ], 500);
        }
    }
    function getListProductsKhuyenMai()
    {
        try {
            $listSanPham = SanPham::select('sanpham.*','khuyenmai.*')
            ->join('khuyenmai','sanpham.idKhuyenMai','=','khuyenmai.idKhuyenMai')
            ->where('khuyenmai.ngayBatDau','<=',now())
            ->where('khuyenmai.ngayKetThuc','>=',now())
            ->orderByDesc('khuyenmai.ngayBatDau')
            ->take(10)
            ->get();

            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm khuyến mãi",
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
    function getListProductsLaptop(){
        try {
            $listSanPham = SanPham::where('loai','=','1')->orderBy("ngayThem", 'desc')->take(3)->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm mới",
                'data' => $listSanPham
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "lỗi server",
                'data' => []
            ], 500);
        }
    }

		function addSanPham(Request $request){
			
			$data=$request->all();
			if(SanPham::whereRaw("BINARY tenSanPham = ?",[$data['tenSanPham']])->first()){
				return response()->json([
					'success' => false,
					'message' => "Tên sản phẩm đã tồn tại!",
					'data' => []
				],422);
			}

			if(strlen($data['moTa'])==0){
				return response()->json([
					'success' => false,
					'message' => "Chưa nhập mô tả sản phẩm!",
					'data' => []
				],422);
			}
			if(!$request->hasFile('img')){
				return response()->json([
					'success' => false,
					'message' => "Chưa chọn hình ảnh cho sản phẩm!",
					'data' => []
				],422);
			}

			$slug = Str::slug($data['tenSanPham']);
			$originalSlug = $slug;
			$counter = 1;

			while (SanPham::where('slug', $slug)->exists()) {
				$slug = $originalSlug . '-' . $counter;
				$counter++;
			}
			$newFileName = "";
			$file = null;
			try{
				$file = $request->file('img');
				$newFileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
			}
			catch(\Exception $e){
				return response()->json([
					'success' => false,
					'message' => "Đã sảy ra lỗi khi lưu hình ảnh!",
					'data' => []
				],500);
			}
			try{
				$sanPham = SanPham::create([
					'tenSanPham'=>$data['tenSanPham'],
					'moTa'=>$data['moTa'],
					'gia'=>$data['gia'],
					'soLuong'=> 0,
					'ngayThem'=>now(),
					'img'=>$newFileName,
					'soLuotXem'=>0,
					'loai'=>$data['loai'],
					'hang'=>$data['hang'],
					'noiBat'=>0,
					'trangThai'=>0,
					'slug'=>$slug,
					'idDanhMuc'=>$data['idDanhMuc'],
					'idKhuyenMai'=>$data['idKhuyenMai']??null,
				]);
				ThongSoSanPham::create([
					'idSanPham'=>$sanPham['idSanPham'],
					'heDieuHanh'=>$data['heDieuHanh'],
					'CPU'=>$data['CPU'],
					'RAM'=>$data['RAM'],
					'RAMToiDa'=>$data['RAMToiDa'] ?? null,
					'loaiRAM'=>$data['loaiRAM'] ?? null,
					'busRAM'=>$data['busRAM'] ?? null,
					'soLuongKheRAM'=>$data['soLuongKheRAM'] ?? null,
					'dungLuongROM'=>$data['dungLuongROM'],
					'loaiROM'=>$data['loaiROM'] ?? null,
					'soKheROM'=>$data['soKheROM'] ?? null,
					'GPU'=>$data['GPU'] ?? null,
					'cameraTruoc'=>$data['cameraTruoc'],
					'cameraSau'=>$data['cameraSau'] ?? null,
					'pin'=>$data['pin'],
					'sac'=>$data['sac'],
					'loa'=>$data['loa'],
					'SIM'=>$data['SIM'] ?? null,
					'manHinh'=>$data['manHinh'],
					'kichThuoc'=>$data['kichThuoc'],
					'trongLuong'=>$data['trongLuong'],
					'mauSac'=>$data['mauSac'] ?? null,
					'congKetNoi'=>$data['congKetNoi'] ?? null,

				]);
				$file->move(public_path('imgs'), $newFileName);
				return response()->json([
						'success' => true,
						'message' => "Thêm sản phẩm thành công!",
						'data' => []
					],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => false,
					'message' => "Lỗi không xác định".$e->getMessage(),
					'data' => []
				],500);
			}
		}
}
