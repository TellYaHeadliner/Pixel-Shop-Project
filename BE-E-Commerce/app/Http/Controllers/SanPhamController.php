<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\GioHang;
use App\Models\SanPham;
use App\Models\KhuyenMai;
use App\Models\ThongSoSanPham;
use App\Models\DanhMuc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\VarDumper\VarDumper;
use Illuminate\Support\Collection;

class SanPhamController extends Controller
{



	function getProduct($slug)
	{
		try {
			$sanPham = SanPham::where('slug', $slug)->first();
			$sanPham->soLuotXem = $sanPham->soLuotXem + 1;
			$sanPham->save();
			$thongSoSanPham = DB::table('thongsosanpham')->where('idSanPham', $sanPham->idSanPham)->first();
			$danhGia = DB::table('danhgia')
				->join('nguoidung', 'nguoidung.idNguoiDung', '=', 'danhgia.idNguoiDung')
				->where('danhgia.idSanPham', $sanPham->idSanPham)
				->select('danhgia.*', 'nguoidung.tenDangNhap')
				->get();
			$sanPhamLienQuan = SanPham::where('loai', $sanPham->loai)->take(3)->get();
			$khuyenmai = SanPham::select('khuyenmai.phanTram', 'khuyenmai.ngayBatDau', 'khuyenmai.ngayKetThuc')
				->join('khuyenmai', 'khuyenmai.idKhuyenMai', '=', 'sanpham.idKhuyenMai')
				->where('slug', $slug)
				->where('khuyenmai.ngayBatDau', '<=', now())
				->where('khuyenmai.ngayKetThuc', '>=', now())
				->first();
			if ($sanPham) {
				return response()->json([
					'success' => true,
					'message' => "Thông tin sản phẩm",
					'data' => [
						'thongSoSanPham' => $thongSoSanPham,
						'sanPham' => $sanPham,
						'danhGia' => $danhGia,
						'sanPhamLienQuan' => $sanPhamLienQuan,
						'khuyenmai' => (!$khuyenmai) ? 0 : $khuyenmai->phanTram,
					]
				], 200);
			} else {
				return response()->json([
					'success' => false,
					'message' => "Không tìm thấy sản phẩm",
					'data' => null,
				], 404);
			}
		} catch (\Throwable $th) {
			return response()->json([
				'success' => false,
				'message' => "Lỗi server" . $th,
				'data' => null
			], 500);
		}
	}

	function getListProductNoiBat(){
		try {
			$listSanPham = SanPham::where('noiBat', 1)->get();
            return response()->json([
                'success' => true,
                'message' => "Danh sách sản phẩm nổi bật",
                'data' => $listSanPham
            ], 200);
		} catch (\Throwable $th) {
			return response()->json([
				'success' => false,
				'message' => "Lỗi server" . $th,
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

			$listSanPham = SanPham::whereIn('idSanPham', $tempSanPham)
				->orderByRaw("FIELD(idSanPham, " . implode(',', $tempSanPham) . ")")
				->get();

			return response()->json([
				'success' => true,
				'message' => "Danh sách sản phẩm bán chạy",
				'data' => $listSanPham
			], 200);
			
		} catch (\Exception $err) {
			return response()->json([
				'success' => false,
				'message' => 'lỗi server ' . $err,
				'data' => []
			], 500);
		}
	}
	function getListProductsKhuyenMai()
	{
		try {
			$listSanPham = SanPham::select('sanpham.*', 'khuyenmai.*')
				->join('khuyenmai', 'sanpham.idKhuyenMai', '=', 'khuyenmai.idKhuyenMai')
				->where('khuyenmai.ngayBatDau', '<=', now())
				->where('khuyenmai.ngayKetThuc', '>=', now())
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
	function getListProductsLaptop()
	{
		try {
			$listSanPham = SanPham::where('loai', '=', '1')->orderBy("ngayThem", 'desc')->take(3)->get();
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

	function addSanPham(Request $request)
	{

		$data = $request->all();
		if (SanPham::whereRaw("BINARY tenSanPham = ?", [$data['tenSanPham']])->first()) {
			return response()->json([
				'success' => false,
				'message' => "Tên sản phẩm đã tồn tại!",
				'data' => []
			], 422);
		}
		$dm = new DanhMuc();
		$listChildren = collect($dm->getChildrenList($data['loai']+1));
		if(!$listChildren->contains($data['idDanhMuc'])){
			return response()->json([
				'success' => false,
				'message' => "Danh mục không hợp lệ với loại sản phẩm!"
			],402);
		}
		if (strlen($data['moTa']) == 0) {
			return response()->json([
				'success' => false,
				'message' => "Chưa nhập mô tả sản phẩm!",
				'data' => []
			], 422);
		}
		if (!$request->hasFile('img')) {
			return response()->json([
				'success' => false,
				'message' => "Chưa chọn hình ảnh cho sản phẩm!",
				'data' => []
			], 422);
		}

		$slug = Str::slug($data['tenSanPham']);
		$originalSlug = $slug;
		$counter = 1;

		while (SanPham::where('slug', $slug)->exists()) {
			$slug = $originalSlug . '-' . $counter;
			$counter++;
		}
		$newFileName = null;
		$file = null;
		try {
			$file = $request->file('img');
			$newFileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
		} catch (\Exception $e) {
			return response()->json([
				'success' => false,
				'message' => "Đã sảy ra lỗi khi lưu hình ảnh!",
				'data' => []
			], 500);
		}
		try {
			$sanPham = SanPham::create([
				'tenSanPham' => $data['tenSanPham'],
				'moTa' => $data['moTa'],
				'gia' => $data['gia'],
				'soLuong' => 0,
				'ngayThem' => now(),
				'img' => $newFileName,
				'soLuotXem' => 0,
				'loai' => $data['loai'],
				'hang' => $data['hang'],
				'noiBat' => 0,
				'trangThai' => 0,
				'slug' => $slug,
				'idDanhMuc' => $data['idDanhMuc'],
				'idKhuyenMai' => $data['idKhuyenMai'] ?? null,
			]);
			ThongSoSanPham::create([
				'idSanPham' => $sanPham['idSanPham'],
				'heDieuHanh' => $data['heDieuHanh'],
				'CPU' => $data['CPU'],
				'RAM' => $data['RAM'],
				'RAMToiDa' => $data['RAMToiDa'] ?? null,
				'loaiRAM' => $data['loaiRAM'] ?? null,
				'busRAM' => $data['busRAM'] ?? null,
				'soLuongKheRAM' => $data['soLuongKheRAM'] ?? null,
				'dungLuongROM' => $data['dungLuongROM'],
				'loaiROM' => $data['loaiROM'] ?? null,
				'soKheROM' => $data['soKheROM'] ?? null,
				'GPU' => $data['GPU'] ?? null,
				'cameraTruoc' => $data['cameraTruoc'],
				'cameraSau' => $data['cameraSau'] ?? null,
				'pin' => $data['pin'],
				'sac' => $data['sac'],
				'loa' => $data['loa'],
				'SIM' => $data['SIM'] ?? null,
				'manHinh' => $data['manHinh'],
				'kichThuoc' => $data['kichThuoc'],
				'trongLuong' => $data['trongLuong'],
				'mauSac' => $data['mauSac'] ?? null,
				'congKetNoi' => $data['congKetNoi'] ?? null,

			]);
			$file->move(public_path('imgs'), $newFileName);
			return response()->json([
				'success' => true,
				'message' => "Thêm sản phẩm thành công!",
				'data' => []
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				'success' => false,
				'message' => "Lỗi không xác định" . $e->getMessage(),
				'data' => []
			], 500);
		}
	}

	function update(Request $request){
		$data = $request->all();
		try{
			$oData = SanPham::where('idSanPham','=',$data['idSanPham'])->first();
			$newFileName = "";
			$file = null;
			$slug = null;
			if($data['tenSanPham'] != $oData->tenSanPham){
					if(SanPham::where('tenSanPham','=',$data['tenSanPham'])->where('idSanPham','!=',$data['idSanPham'])->exists())
						return response()->json([
							'success' => false,
							'message' => 'Đã có sản phẩm sở hữu tên này!'
						],402);
					$slug = Str::slug($data['tenSanPham']);
					$originalSlug = $slug;
					$counter = 1;

					while (SanPham::where('slug', $slug)->exists()) {
						$slug = $originalSlug . '-' . $counter;
						$counter++;
					}
			}
			if($request->hasFile('img')){
				$file = $request->file('img');
				$newFileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
			}
			if (strlen($data['moTa']) == 0) {
				return response()->json([
					'success' => false,
					'message' => "Mô tả sản phẩm không được để trống!",
					'data' => []
				], 422);
			}
			if($data['idDanhMuc'] != $oData->idDanhMuc){
				$dm = new DanhMuc();
				$listChildren = collect($dm->getChildrenList($data['loai']+1));
				if(!$listChildren->contains($data['idDanhMuc'])){
					return response()->json([
						'success' => false,
						'message' => "Danh mục không hợp lệ với loại sản phẩm!"
					],402);
				}
			}
			$oData->update([
				'tenSanPham' => $data['tenSanPham'],
				'moTa' => $data['moTa'],
				'gia' => $data['gia'],
				'img' => $newFileName?:$oData->img,
				'hang' => $data['hang'],
				'slug' => $slug??$oData->slug,
				'idDanhMuc' => $data['idDanhMuc'],
			]);
			$oChiTiet = ThongSoSanPham::where('idSanPham', '=', $data['idSanPham'])->first();
			$oChiTiet->update([
				'heDieuHanh' => $data['heDieuHanh'],
				'CPU' => $data['CPU'],
				'RAM' => $data['RAM'],
				'RAMToiDa' => $data['RAMToiDa'] ?? $oChiTiet->RAMToiDa,
				'loaiRAM' => $data['loaiRAM'] ?? $oChiTiet->loaiRAM,
				'busRAM' => $data['busRAM'] ?? $oChiTiet->busRAM,
				'soLuongKheRAM' => $data['soLuongKheRAM'] ?? $oChiTiet->soLuongKheRAM,
				'dungLuongROM' => $data['dungLuongROM'],
				'loaiROM' => $data['loaiROM'] ?? $oChiTiet->loaiROM,
				'soKheROM' => $data['soKheROM'] ?? $oChiTiet->soKheROM,
				'GPU' => $data['GPU'] ?? $oChiTiet->GPU,
				'cameraTruoc' => $data['cameraTruoc'],
				'cameraSau' => $data['cameraSau'] ?? $oChiTiet->cameraSau,
				'pin' => $data['pin'],
				'sac' => $data['sac'],
				'loa' => $data['loa'],
				'SIM' => $data['SIM'] ?? $oChiTiet->SIM,
				'manHinh' => $data['manHinh'],
				'kichThuoc' => $data['kichThuoc'],
				'trongLuong' => $data['trongLuong'],
				'mauSac' => $data['mauSac'] ?? $oChiTiet->mauSac,
				'congKetNoi' => $data['congKetNoi'] ?? $oChiTiet->congKetNoi,
			]);
			if($newFileName){
				$file->move(public_path('imgs'), $newFileName);
			}
			return response()->json([
				'success' => true,
				'message' => "Cập nhật sản phẩm thành công!"
			],200);
		}catch(\Exception $e){
			return response()->json([
						'success' => false,
						'message' => $e->getMessage(),
					],500);
		}
	}

	function search(Request $request)
	{
		$data = $request->all();

		//Tìm kiếm theo tên sản phẩm
		$data['text'] = $data['text'] ?? "";
		//Tìm kiếm theo danh mục, lấy cả những danh mục con
		$data['idDanhMuc'] = $data['idDanhMuc'] ?? null;
		//Phân trang mỗi trang 12 sản phẩm
		$data["page"] = $data["page"] ?? null;
		//trạng thái của sản phẩm 0(chưa bán),1(đang bán),2(ngưng bán)
		// $data["trangThai"] = $data["trangThai"] ?? null;
		$data["trangThai"] = isset($data["trangThai"]) 
    ? (is_array($data["trangThai"]) 
        ? $data["trangThai"] 
        : [$data["trangThai"]]) 
    : null;
		//Kiểu sắp xếp 1 giá tăng dần, 2 giá giảm dần, 3 mới nhất, 4 cũ nhất, 5 bán chạy nhất, 6 ít mua nhất.
		$data["condition"] = $data["condition"] ?? null;
		//Sản phẩm có giảm giá không: 0 những sản phẩm không giảm giá hoặc hết hạn giảm giá, 1 những sản phẩm đang giảm giá hoặc sẽ giảm giá
		$data["discount"] = $data["discount"] ?? null;
		$dm = new DanhMuc;
		try {
			$result = SanPham::where('tenSanPham', 'like', '%' . $data['text'] . '%')
				->when($data['idDanhMuc'], function ($query) use ($dm, $data) {
					return $query->whereIn('idDanhMuc', $dm->getChildrenList($data['idDanhMuc']));
				})
				->when($data['trangThai'] !== null, function ($query) use ($data) {
					return $query->whereIn('sanpham.trangThai', $data['trangThai']);
				})
				->when($data['discount'] !== null, function ($query) use ($data) {
					if ($data['discount'] == 1)
						return $query->whereIn('idKhuyenMai', KhuyenMai::getIDKhuyenMaiConHieuLuc());
					if ($data['discount'] == 0)
						return $query->whereNotIn('idKhuyenMai', KhuyenMai::getIDKhuyenMaiConHieuLuc())->orWhereNull('idKhuyenMai');
				})
				->when($data['condition'], function ($query) use ($data) {
					if ($data['condition'] == 3)
						return $query->orderBy('ngayThem', 'DESC');
					if ($data['condition'] == 4)
						return $query->orderBy('ngayThem', 'ASC');
					if ($data['condition'] == 5 || $data['condition'] == 6)
						return $query
							->select(
								'sanpham.idSanPham',
								'sanpham.tenSanPham',
								'sanpham.moTa',
								'sanpham.gia',
								'sanpham.soLuong',
								'sanpham.ngayThem',
								'sanpham.img',
								'sanpham.soLuotXem',
								'sanpham.loai',
								'sanpham.hang',
								'sanpham.noiBat',
								'sanpham.trangThai',
								'sanpham.slug',
								'sanpham.idDanhMuc',
								'sanpham.idKhuyenMai',
								DB::raw('COALESCE(SUM(chitiethoadon.soLuong), 0) as soDaBan')
							)
							->leftJoin('chitiethoadon', 'sanpham.idSanPham', '=', 'chitiethoadon.idSanPham')
							->leftJoin('hoadon', 'hoadon.idHoaDon', '=', 'chitiethoadon.idHoaDon')
							->where('sanpham.trangThai', 1)
							->where(function ($query) {
								$query->whereIn('hoadon.trangThai', [1,2])
									->orWhereNull('hoadon.idHoaDon');
							})
							->groupBy(
						'sanpham.idSanPham',
								'sanpham.tenSanPham',
								'sanpham.moTa',
								'sanpham.gia',
								'sanpham.soLuong',
								'sanpham.ngayThem',
								'sanpham.img',
								'sanpham.soLuotXem',
								'sanpham.loai',
								'sanpham.hang',
								'sanpham.noiBat',
								'sanpham.trangThai',
								'sanpham.slug',
								'sanpham.idDanhMuc',
								'sanpham.idKhuyenMai',
							)
							->when($data['condition'] == 5, function ($q) {
								$q->orderBy('soDaBan', 'DESC');
							})
							->when($data['condition'] == 6, function ($q) {
								$q->orderBy('soDaBan', 'ASC');
							});
					if ($data['condition'] == 1 || $data['condition'] == 2)
						return $query->leftJoin('khuyenmai', 'sanpham.idKhuyenMai', '=', 'khuyenmai.idKhuyenMai')
						->where(function ($query) {
							$query->where(function ($q) {
								$q->where('khuyenmai.ngayBatDau', '<=', now())
								->where('khuyenmai.ngayKetThuc', '>=', now());
							})
							->orWhereNull('sanpham.idKhuyenMai');
						})
						->when($data['condition'] == 1, function ($q) {
							return $q->orderByRaw('(sanpham.gia * (1 - COALESCE(khuyenmai.phantram, 0) / 100)) ASC');
						})
						->when($data['condition'] == 2, function ($q) {
							return $q->orderByRaw('(sanpham.gia * (1 - COALESCE(khuyenmai.phantram, 0) / 100)) DESC');
						});
				})->get();

			$count = $result->count();
			if ($data["page"])
				$result = $result->slice(($data["page"] - 1) * 12, 12)->values()->toArray();
			return response()->json([
				'success' => true,
				'message' => 'Lấy danh sách sản phẩm thành công',
				'count' => $count,
				'data' => $result,
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				'success' => true,
				'message' => 'Sảy ra lỗi: ' . $e->getMessage(),
				'data' => [],
			], 500);
		}
	}

	function getProductBySlug(Request $request){
		try{
			$data = SanPham::where('slug', '=', $request['slug'])->join('thongsosanpham','thongsosanpham.idSanPham','=','sanpham.idSanPham')->get();
			return response()->json([
				'success' => false,
				'message' => 'Lấy thông tin sản phẩm thành công!',
				'data' => $data
			],200);
		}catch (\Exception $e){
			return response()->json([
				'success' => false,
				'message' => 'Có lỗi xảy ra: '.$e->getMessage(),
			],500);
		}
	}

	function changeNoiBat(Request $request){
		$data = $request->all();
		try {
        $sp = SanPham::find($data['idSanPham']);
        if (!$sp) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm!',
            ], 404);
        }
        $sp->noiBat = !$sp->noiBat;
        $sp->save();
        return response()->json([
            'success' => true,
            'message' => 'Thay đổi trạng thái nổi bật thành công!',
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Lỗi hệ thống: ' . $e->getMessage(),
        ], 500);
    }
	}
	function delete(Request $request){
		try{
			$sp = SanPham::find($request->idSanPham);
			$sp->update(['trangThai'=>2]);
			return response()->json([
				'success' => true,
				'message' => 'Xóa sản phẩm thành công'
			],200);
		}catch(\Exception $e){
			return response()->json([
				'success' => false,
				'message' => $e->getMessage(),
			], 500);
		}
	}
}
