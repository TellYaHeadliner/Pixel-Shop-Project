<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaiViet;

class BaiVietController extends Controller
{
	function getList(Request $request)
	{
		$data =  $request->all();
		$data['search'] = $data['search'] ?? "";
		$data['page'] = $data['page'] ?? 1;
		try {
			$list = BaiViet::where(function ($query) use ($data) {
				$query->where("tieuDe", "like", "%" . $data['search'] . "%")
					->orWhere("noiDung", "like", "%" . $data['search'] . "%");
			})
				->where("slug", "!=", "about")
				->offset(($data['page'] - 1) * 10)
				->limit(10)
				->get();
			return response()->json([
				"success" => true,
				"message" => "Lấy danh sách bài viết thành công!",
				"data" => $list
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				"success" => true,
				"message" => "Lấy danh sách bài viết không thành công!" . $e->getMessage(),
				"data" => []
			], 500);
		}
	}

	function getListKhuyenMai()
	{
		try {
			$list = BaiViet::where('slug', 'like', '%khuyen-mai%')
				->where('trangThai', 1)
				->orderBy('ngayDang', 'desc')
				->get();
			return response()->json([
				"success" => true,
				"message" => "Lấy danh sách bài viết thành công!",
				"data" => $list
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				"success" => false,
				"message" => "Lấy bài viết không thành công! " . $e->getMessage(),
				"data" => []
			], 500);
		}
	}

	function getListQuangCao()
	{
		try {
			$list = BaiViet::where('slug', 'like', '%quang-cao%')
				->where('trangThai', 1)
				->orderBy('ngayDang', 'desc')
				->get();
			return response()->json([
				"success" => true,
				"message" => "Lấy danh sách bài viết thành công!",
				"data" => $list
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				"success" => false,
				"message" => "Lấy bài viết không thành công! " . $e->getMessage(),
				"data" => []
			], 500);
		}
	}


	function get(Request $request)
	{
		$data =  $request->all();
		try {
			$bv = BaiViet::where("slug", "=", $data['slug'])->first();
			return response()->json([
				"success" => true,
				"message" => "Lấy bài viết thành công!",
				"data" => $bv
			], 200);
		} catch (\Exception $e) {
			return response()->json([
				"success" => true,
				"message" => "Lấy bài viết không thành công!" . $e->getMessage(),
				"data" => []
			], 500);
		}
	}
}
