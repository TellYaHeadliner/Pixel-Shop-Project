<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NguoiDung;
use GuzzleHttp\Psr7\Response;
use Firebase\JWT\JWT as FirebaseJWT;
use Symfony\Component\VarDumper\VarDumper;

class UserController extends Controller
{
    function login(Request $request)
    {
        $data = $request->all();
        $soLanThuToiDa = 5;
        $timeBlock = time()+300; // giây

        $User = NguoiDung::where('tenDangNhap', '=', $data['tenDangNhap'])
            ->orWhere('email', '=', $data['tenDangNhap'])
            ->first();
        if (!$User) {
            return Response()->json([
                'success' => 'false',
                'err' => "Tài khoản không tồn tại",
            ], 403);
        }

        $soLanThu = session()->get("login_solanthu_{$User['idNguoiDung']}", 0);
        $thoiGianMoKhoa = session()->get("login_timeblock_{$User['idNguoiDung']}", null);
        if ($thoiGianMoKhoa && time()<=$thoiGianMoKhoa) {
            return response()->json([
                'success' => 'false',
                'message' => 'Tài khoản của bạn đang bị khóa do đăng nhập sai nhiều lần'
            ], 403);
        }
        if (session()->has("login_captcha_{$User['idNguoiDung']}")) {          
            if (!isset($data['captcha'])) {
                return response()->json([
                    'success' => 'false',
                    'message' => 'Chưa nhập mã captcha',
                    'data' => [
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),
                        'solanthu' => $soLanThu,
                    ]
                ],403);
            }
            else if($data['captcha'] != session("login_captcha_{$User['idNguoiDung']}")){
                return response()->json([
                    'success' => 'false',
                    'message' => 'Sai mã captcha',
                    'data' => [
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),
                        'solanthu' => $soLanThu,
                    ]
                ],403);
            }
        }

        if ($User['matKhau'] != $data['matKhau']) {
            $soLanThu++;
            session()->put("login_solanthu_{$User['idNguoiDung']}", $soLanThu);
            var_dump(session("login_solanthu_{$User['idNguoiDung']}"));
            if($soLanThu>=3&&$soLanThu<=5){
                session()->put("login_captcha_{$User['idNguoiDung']}",random_int(1000, 9999));
                   if($soLanThu==5) {
                    session()->forget(["login_solanthu_{$User['idNguoiDung']}", "login_captcha_{$User['idNguoiDung']}"]);
                    session()->put("login_timeblock_{$User['idNguoiDung']}", $timeBlock);
                    return response()->json([
                        'successs' => "false",
                        'message' => 'Tài khoản của bạn đã bị khóa do đăng nhập sai nhiều lần',
                        'data' => [
                            'timeblock' => session("login_timeblock_{$User['idNguoiDung']}"),
                        ],
                    ], 403);
                    }
                return response()->json([
                    'successs' => "false",
                    'message' => 'Sai mật khẩu',
                    'data' => [
                        'solanthu' => $soLanThu,
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),                       
                    ]
                ], 403);
            }
            return Response()->json([
                'successs' => "false",
                'message' => 'Sai mật khẩu',
                'data' => [
                    'solanthu' => $soLanThu,
                ],            
            ], 403);
        }

        $payload = [
            'hoVaTen' => $User['hoVaTen'],
            'anhDaiDien' => $User['anhDaiDien'],
            'role' => $User['vaiTro'],
            'iat' => time(),
            'exp' => time() + 60 * 60,
        ];

        session()->forget(["login_solanthu_{$User['idNguoiDung']}", "login_timeblock_{$User['idNguoiDung']}", "login_captcha_{$User['idNguoiDung']}"]);
        $token = FirebaseJWT::encode($payload, env('JWT_SECRET'), 'HS256');
        return response()->json([
            'success' => 'true',
            'message' => 'Đăng nhập thành công',
            'data' => [
                'hoVaTen' => $User['hoVaTen'],
                'anhDaiDien' => $User['anhDaiDien'],
                'role' => $User['vaiTro'],
                'token' => $token
            ],
        ], 200);
    }
}
