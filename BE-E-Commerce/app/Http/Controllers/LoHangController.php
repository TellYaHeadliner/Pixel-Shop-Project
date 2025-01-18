<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoHang;
use App\Models\ChiTietLoHang;
use App\Models\SanPham;

use Illuminate\Support\Facades\DB;
class LoHangController extends Controller
{
    function getList(){
			try{
				$result = LoHang::select('lohang.*')
									->withSum(['chiTietLoHang as tongNhap' => function ($query) {
											$query->select(DB::raw('SUM(soLuong * giaNhap)'));
									}], 'tongNhap')
									->get();
				return response()->json([
					'success' => true,
					'message' => 'Lấy lô hàng thành công',
					'data' => $result
				],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => false,
					'message' => 'Lấy lô hàng không thành công',
				],500);
			}
		}

		function add(Request $request){
			$data = $request->all();
			try{
				$lh = LoHang::create([
					'idNhaCungCap' => $data['idNhaCungCap'],
					'date' => now()
				]);
				foreach($data['idSanPham'] as $idSanPham){
					ChiTietLoHang::create([
						'idLoHang' => $lh->idLoHang,
						'idSanPham' => $idSanPham,
						'soLuong' => $data['s'.$idSanPham],
						'giaNhap' => $data['g'.$idSanPham]
					]);
					$sp = SanPham::where('idSanPham', $idSanPham)->first();
					$sp->update(['trangThai'=> 1,'soLuong'=> $sp->soLuong +  $data['s'.$idSanPham]]);
				}
				return response()->json([
					'success' => false,
					'message' => 'Thêm lô hàng thành công!',
				],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => false,
					'message' => 'Đã sảy ra lỗi: '.$e->getMessage(),
				],500);
			}
		}
}
