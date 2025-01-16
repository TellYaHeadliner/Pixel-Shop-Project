<?php
namespace App\Http\Controllers;

use App\Models\DanhMuc;
use Illuminate\Http\Request;

class DanhMucController extends Controller
{
    // Lấy danh sách danh mục
    function getList(){
        $dm = new DanhMuc();
        try {
            $data = $dm->getList();
            if ($data) {
                return response()->json([
                    'success' => true,
                    'message' => 'Lấy danh mục thành công!',
                    'data' => $data,
                ], 200);
            }
            return response()->json([
                'success' => true,
                'message' => 'Không có danh mục nào trong hệ thống!',
                'data' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi không xác định: ' . $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

	function add(Request $request) {
		$data = $request->all();
		try {
			$newCategory = DanhMuc::create([
				"tenDanhMuc" => $data["tenDanhMuc"],
				"idDanhMucCha" => $data["idDanhMucCha"] ?? null,
			]);
			return response()->json([
				'success' => true,
				'message' => 'Thêm danh mục thành công!',
				'data' => $newCategory, // Trả về danh mục vừa thêm
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				'success' => false,
				'message' => 'Đã xảy ra lỗi!',
				'data' => $data,
			], 500);
		}
	}

   // Sửa danh mục
function update(Request $request, $id) {
    $data = $request->all();
    try {
        $danhMuc = DanhMuc::findOrFail($id);

        // Nếu danh mục có idDanhMucCha là null, chỉ cập nhật tên
        if ($danhMuc->idDanhMucCha === null) {
            // Chỉ cập nhật tên danh mục
            $danhMuc->update([
                "tenDanhMuc" => $data["tenDanhMuc"],
            ]);
        } else {
            // Nếu là danh mục con, giữ nguyên idDanhMucCha
            $danhMuc->update([
                "tenDanhMuc" => $data["tenDanhMuc"],
                // Không cập nhật idDanhMucCha
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật danh mục thành công!',
            'data' => $danhMuc,
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Đã xảy ra lỗi: ' . $e->getMessage(),
            'data' => [],
        ], 500);
    }
}

    // Xóa danh mục
    function delete($id) {
        try {
            $danhMuc = DanhMuc::findOrFail($id);
            $danhMuc->delete();
            return response()->json([
                'success' => true,
                'message' => 'Xóa danh mục thành công!',
                'data' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi!',
                'data' => [],
            ], 500);
        }
    }
}