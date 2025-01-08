<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiaChi;
use PHPUnit\TextUI\XmlConfiguration\UpdateSchemaLocation;

class DiaChiController extends Controller
{
    function getListByUser(Request $request){
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
}
