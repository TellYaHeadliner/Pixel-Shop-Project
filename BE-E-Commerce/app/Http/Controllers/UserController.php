<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NguoiDung;
use GuzzleHttp\Psr7\Response;
use Firebase\JWT\JWT as FirebaseJWT ;

class UserController extends Controller
{
    function login(Request $request){
        $data=$request->all();
        $User=NguoiDung::where('tenDangNhap','=',$data['tendangnhap'])
                        ->orWhere('email','=',$data['tendangnhap'])
                        ->first();
                       
        if(!isset($User) || $User['matKhau']!=$data['matkhau']){
            return Response()->json(['err'=>"sai tên đăng nhập hoặc mật khẩu"],403);
        }

        $payload=[
          'hoVaTen'=>$User['hoVaTen'],
          'anhDaiDien'=>$User['anhDaiDien'],
          'role'=>$User['vaiTro'],
          'iat'=>time(),
          'exp'=>time() + 60*60, 
        ];

        $token=FirebaseJWT::encode($payload,env('JWT_SECRET'),'HS256');
        return response()->json([
            'success'=>'true',
            'message'=>'Đăng nhập thành công',
            'data'=>[
                'hoVaTen'=>$User['hoVaTen'],
                'anhDaiDien'=>$User['anhDaiDien'],
                'token'=>$token
            ],           
        ],200);
    }
}
