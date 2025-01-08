<?php
namespace App\Http\Controllers;

use App\Models\ThongTin;
use Illuminate\Http\Request;

class ThongTinController extends Controller{
	function get(){
		return response()->json(ThongTin::Get());
	}
}