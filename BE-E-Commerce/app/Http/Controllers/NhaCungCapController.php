<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Models\NhaCungCap;

class NhaCungCapController extends Controller
{
    function add(Request $request){
			$data = $request->all();
			$old = NhaCungCap::where("tenNhaCungCap","=",$data['tenNhaCungCap'])->first();
			if($old){
				return response()->json([
					'success' => false,
					'message' => "Tên nhà cung cấp đã tồn tại!",
					'data' => [],
				],409);
			}
			try {
				NhaCungCap::create(
					[
						'tenNhaCungCap' => $data['tenNhaCungCap'],
						'tenLienHe'=> $data['tenLienHe'],
						'diaChi'=> $data['diaChi'],
						'soDienThoai' => $data['soDienThoai'],
						'email' => $data['email']
					]
				);
			}catch(\Exception $e){
				return response()->json([
                'success' => false,
                'message' => 'Thêm nhà cung cấp thất bại, vui lòng thử lại sau!',
                'data' => []
            ],500);
			}
			return response()->json([
				'success' => true,
				'message' => 'Thêm nhà cung cấp thành công!',
				'data' => []
			],200);
		}

		function getList(){
			$data = NhaCungCap::all();
			// if ($data->isEmpty()) {
			// 	return response()->json([
			// 		'success' => false,
			// 		'message' => 'Chưa có nhà cung cấp nào được thêm vào!',
			// 		],404);
			// }
			return response()->json([
				'success' => true,
				'message' => 'Lấy dữ liệu thành công!',
				'data'=> $data
			],200);
		}
}
