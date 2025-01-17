<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\YeuThich;
class YeuThichController extends Controller
{

    function checkYeuThich($idNguoiDung,$idSanPham){
        $data= DB::table('yeuthich')
                ->where('idNguoiDung',$idNguoiDung)
                ->where('idSanPham',$idSanPham)
                ->first();
        if($data){
            return response()->json([
				'success'=>true,
				'message'=>'sản phẩm đã được người dùng yêu thích',
				'data'=>true
			],200);
        }else{
            return response()->json([
				'success'=>true,
				'message'=>'sản phẩm chưa được người dùng yêu thích',
				'data'=>false
			],200);
        }
    }
    function addYeuThich(Request $request){
        
		try{
            DB::table('yeuthich')
                ->insert([
                    'idNguoiDung' => $request['idNguoiDung'],
                    'idSanPham' =>$request['idSanPham']
                ]);
			return response()->json([
				'success'=>true,
				'message'=>' thêm yêu thích thành công',
				'data'=>[]
			],200);
		}catch(\Exception $err){
			return response()->json([
				"success"=>false,
				"message"=>$err->getMessage(),
				"data"=>[],
			],500);
		}
    }

    function deleteYeuThich(Request $request){
        
		try{
            DB::table('yeuthich')
                ->where('idNguoiDung',$request['idNguoiDung'])
                ->where('idSanPham',$request['idSanPham'])
                ->delete();
			return response()->json([
				'success'=>true,
				'message'=>' xóa yêu thích thành công',
				'data'=>[]
			],200);
		}catch(\Exception $err){
			return response()->json([
				"success"=>false,
				"message"=>$err->getMessage(),
				"data"=>[],
			],500);
		}
    }

    function getSoLuongYeuThichByIdSanPham($idSanPham){
        try{
            $data = DB::table('yeuthich')
                    ->where('idSanPham',$idSanPham)
                    ->select(DB::raw('COUNT(idNguoiDung) as soluongyeuthich'),'idSanPham')
                    ->groupBy('idSanPham')
                    ->get();
			return response()->json([
				'success'=>true,
				'message'=>' lấy số lượng yêu thích thành công',
				'data'=>$data
			],200);
		}catch(\Exception $err){
			return response()->json([
				"success"=>false,
				"message"=>$err->getMessage(),
				"data"=>[],
			],500);
		}
    }
	function getListByIdUser(Request $request){
		$data = $request->all();
		try{
			$list = YeuThich::where('yeuthich.idNguoiDung','=',$data['idNguoiDung'])
			->join('sanpham','sanpham.idSanPham','=','yeuthich.idSanPham')
			->get();
			return response()->json([
				'success'=>true,
				'message'=>'Lấy danh sách yêu thích thành công!',
				'data'=>$list
			],200);
		}catch(\Exception $e){
			return response()->json([
				'success'=>false,
				'message'=>'Có lỗi xảy ra: '.$e->getMessage(),
				'data'=>[]
			],500);
		}
	}
}
