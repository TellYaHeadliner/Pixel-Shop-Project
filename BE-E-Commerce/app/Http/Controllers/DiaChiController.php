<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiaChi;
use PhpParser\Node\Stmt\TryCatch;
use PHPUnit\TextUI\XmlConfiguration\UpdateSchemaLocation;

class DiaChiController extends Controller
{
    function getListByUser(Request $request){
			$data = $request->all();
			try {
        $list = DiaChi::where('idNguoiDung', "=", $data['idNguoiDung'])->orderBy('macDinh','DESC')->get();

        if ($list->isEmpty()) {
            return response()->json([
                "success" => false,
                "message" => "Không tìm thấy địa chỉ nào cho người dùng này!",
                "data" => []
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Lấy danh sách địa chỉ thành công!",
            "data" => $list
        ], 200);
			} catch (\Exception $e) {
					return response()->json([
							"success" => false,
							"message" => "Đã xảy ra lỗi: " . $e->getMessage(),
							"data" => []
					], 500);
			}
		}
		function updateDefaultUser(Request $request){
			$data = $request->all();
			try {
				$list = DiaChi::where('idNguoiDung', "=", $data['idNguoiDung'])->get();

				if ($list->isEmpty()) {
						return response()->json([
								"success" => false,
								"message" => "Không tìm thấy địa chỉ nào cho người dùng này!",
								"data" => []
						], 404);
				}

				foreach ($list as $l) {
						if ($l->idDiaChi == $data['idDiaChi']) {
								$l->update(["macDinh" => "1"]);
						} else {
								$l->update(["macDinh" => "0"]);
						}
				}

				return response()->json([
						"success" => true,
						"message" => "Cập nhật địa chỉ mặc định thành công!",
						"data" => []
				], 200);
			} catch (\Exception $e) {
					return response()->json([
							"success" => false,
							"message" => "Đã xảy ra lỗi: " . $e->getMessage(),
							"data" => []
					], 500);
			}
		}
		function add(Request $request){
			$data = $request->all();
			try{
				$count = DiaChi::where('idNguoiDung','=',$data['idNguoiDung'])->count();
				DiaChi::create([
					'idNguoiDung'=> $data['idNguoiDung'],
					'hoVaTen'=> $data['hoVaTen'],
					'diaChi'=> $data['diaChi'],
					'sdt'=> $data['sdt'],
					'note'=> $data['note']??null,
					'loaiDiaChi'=> $data['loaiDiaChi'],
					'macDinh'=> $count==0?1:0,
				]);
				return response()->json([
					'success' => true,
					'message' => 'Thêm địa chỉ thành công',
					'data' => []
				],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => true,
					'message' => 'Thêm địa chỉ thất bại! ' . $e->getMessage(),
					'data' => []
				],500);
			};
		}
		function delete(Request $request){
			$data = $request->all();
			try{
				$diachi=DiaChi::where('idDiaChi','=',$data['idDiaChi'])
											->where('idNguoiDung','=',$data['idNguoiDung'])
											->first();
				if($diachi['macDinh']==1)
					return response()->json([
						'success' => false,
						'message' => 'Không thẻ xóa địa chỉ mặc định!',
						'data' => []
					],500);
				$diachi->delete();
				return response()->json([
					'success' => true,
					'message' => 'Xóa địa chỉ thành công',
					'data' => []
				],200);
			}catch(\Exception $e){
				return response()->json([
					'success' => true,
					'message' => 'Có lỗi xảy ra! ' . $e->getMessage(),
					'data' => []
				],500);
			}
		}
		function update(Request $request){
			$data = $request->all();
			try {
				$diaChi = DiaChi::where('idDiaChi','=',$data['idDiaChi'])
											->where('idNguoiDung','=',$data['idNguoiDung'])
											->first();
				if(!$diaChi)
					return response()->json([
					'success' => false,
					'message' => 'Không tìm được địa chỉ cần cập nhật',
					'data' => []
					],404);
				$diaChi->update([
					'diaChi'=>$data['diaChi'],
					'hoVaTen'=> $data['hoVaTen'],
					'sdt'=>$data['sdt'],
					'note'=>$data['note']??null,
					'loaiDiaChi'=>$data['loaiDiaChi'],
				]);
				return response()->json([
					'success' => true,
					'message' => 'Cập nhật địa chỉ thành công!',
					'data' => []
				],200);
			} catch (\Exception $e) {
				return response()->json([
					'success' => true,
					'message' => 'Có lỗi xảy ra! ' . $e->getMessage(),
					'data' => []
				],500);
			}
		}
}
