<?php
namespace App\Http\Controllers;

use App\Models\ThongTin;
use Illuminate\Http\Request;

class ThongTinController extends Controller{
	function get(){
		return response()->json(ThongTin::Get());
	}
	function update(Request $request){
		$data = $request->all();
		try{
			$thongTin = ThongTin::first();
			if($thongTin)
				$thongTin->update([
					'dichVu' => $data['dichVu'],
					'facebook' => $data['facebook'],
					'instagram' => $data['instagram'],
					'youtube' => $data['youtube'],
					'tiktok' => $data['tiktok'],
				]);
			else
				ThongTin::create([
					'dichVu' => $data['dichVu'],
					'facebook' => $data['facebook'],
					'instagram' => $data['instagram'],
					'youtube' => $data['youtube'],
					'tiktok' => $data['tiktok'],
				]);
			return response()->json([
				'success'=>true,
				'message'=>'Cập nhật thông tin công ty thành công!',
				'data'=>[]
			],200);
		}catch(\Exception $e){
				return response()->json([
					'success'=>false,
					'message'=>'Có lỗi xảy ra! '.$e->getMessage(),
					'data'=>[]
				],500);
		}
	}
}