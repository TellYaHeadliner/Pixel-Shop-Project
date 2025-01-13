<?php
namespace App\Http\Controllers;

use App\Models\DanhMuc;
use Illuminate\Http\Request;

class DanhMucController extends Controller
{
	//Lấy danh sách danh mục
  function getList(){
		$dm = new DanhMuc();
		try{
			$data = $dm->getList();
			if($data)
				return response()->json([
					'success'=> true,
					'message'=> 'Lấy danh mục thành công!',
					'data'=> $data,
				],200);
			return response()->json([
				'success'=> true,
				'message'=> 'Không có danh mục nào trong hệ thống!',
				'data'=> [],
			],200);
		}catch(\Exception $e){
			return response()->json([
				'success'=> true,
				'message'=> 'Lỗi không xác định'.$e->getMessage(),
				'data'=> [],

			],500);
		}
	}

	function add(Request $request){
		$data = $request->all();
		try{
			DanhMuc::create([
				"tenDanhMuc"=>$data["tenDanhMuc"],
				"idDanhMucCha "=>$data["idDanhMucCha "] ?? null,
			]);
			return response()->json([
				'success'=> true,
				'message'=> 'Thêm danh mục thành công!',
				'data'=> [],
			],200);
		}catch(\Exception $e){
			return response()->json([
			'success'=> false,
			'message'=> 'Đã xảy ra lỗi!',
			'data'=> $data,

		],500);
		}
	}
}
