<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\LienHe;

class LienHeController extends Controller
{
	function getList(){
		try{
			$data = LienHe::all();
			return response()->json([
				'success'=>true,
				'message'=>'Danh sách liên hệ',
				'data'=>$data
			],200);
		}catch(\Exception $err){
			return response()->json([
				'success'=>false,
				'message'=>'Lỗi server '.$err->getMessage(),
				'data'=>[]
			],500);
		}
	}
	
	function getById($id){
		try{
			$data = LienHe::where('idLienHe',$id)->first();
			if($data){
				return response()->json([
					'success'=>true,
					'message'=>'liên hệ id '.$id,
					'data'=>$data
				],200);
			}
			return response()->json([
				'success'=>false,
				'message'=>'Liên hệ không tồn tại ',
				'data'=>[]
			],400);
		}catch(\Exception $err){
			return response()->json([
				'success'=>false,
				'message'=>'Lỗi server '.$err->getMessage(),
				'data'=>[]
			],500);
		}
	}
    function addLienHe(Request $request){
			$data = $request->all();
			try{
				LienHe::create([
						"hoVaTen" => $data["hoVaTen"],
						"email" => $data["email"],
						"sdt" => $data["sdt"],
						"noiDung" => $data["noiDung"],
						"thoiGian" => now(),
						"trangThai" => 1,
					]);
				return response()->json([
					"success"=>true,
					"message"=>"Cảm ơn đã liên hệ với chúng tôi! Nhân viên bên chúng tôi sẽ sớm liên hệ lại với quý khách!",
					"data"=>[],
				],200);
			}catch(\Exception $e){
				return response()->json([
					"success"=>false,
					"message"=>$e->getMessage(),
					"data"=>[],
				],500);
			}
		}

	function updateStatusLienHe(Request $request){
		$data= [
			'status'=>$request['trangThai'],
			'idLienHe'=>$request['idLienHe']
		];
		try{
			$LienHe=LienHe::where('idLienHe',$data['idLienHe'])->first();
			if($LienHe){
				$LienHe->update([
					'trangThai'=>$request['trangThai']
				]);
			}else{
				return response()->json([
					"success"=>false,
					"message"=>"Liên Hệ không tồn tại",
					"data"=>[],
				],400);
			}
			return response()->json([
				"success"=>true,
				"message"=>"Cập nhập trạng thái thành công",
				"data"=>[],
			],200);
		}catch(\Exception $err){
			return response()->json([
				"success"=>false,
				"message"=>$err->getMessage(),
				"data"=>[],
			],500);
		}
	}

	function deleteLienHe(Request $request){
		$data = $request->input('idLienHe');
		try{
			DB::table('LienHe')->where('idLienHe',$data)->delete();
			return response()->json([
				'success'=>true,
				'message'=>' xóa thành công',
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

}
