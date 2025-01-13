<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LienHe;

class LienHeController extends Controller
{
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
}
