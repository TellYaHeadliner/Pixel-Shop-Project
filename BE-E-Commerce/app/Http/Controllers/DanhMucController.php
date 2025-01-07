<?php
namespace App\Http\Controllers;

use App\Models\DanhMuc;
use Illuminate\Http\Request;

class DanhMucController extends Controller
{
	//Lấy danh sách danh mục
  function getList(){
		$dm = new DanhMuc();
		return response()->json($dm->getList());
	}
}
