<?php
namespace App\Http\Controllers;

use App\Models\DanhMuc;
use Illuminate\Http\Request;

class DanhMucController extends Controller
{
	//Lấy danh sách danh mục
  function getList(){
		$dm = new DanhMuc();
		$data = $dm->getList();
		return response()->json([
			'success'=> true,
			'message'=> 'Lấy danh mục thành công!',
			'data'=> $data,

		],200);
	}
}
