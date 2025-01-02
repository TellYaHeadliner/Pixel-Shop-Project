<?php

namespace App\Http\Controllers;

use App\Mail\sendVerificationEmail;
use Illuminate\Http\Request;
use App\Models\NguoiDung;
use GuzzleHttp\Psr7\Response;
use Firebase\JWT\JWT as FirebaseJWT;
use Symfony\Component\VarDumper\VarDumper;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\File;
use DateTime;

class UserController extends Controller
{
    function login(Request $request)
    {
        $data = $request->all();
        $soLanThuToiDa = 5;
        $timeBlock = time() + 300; // giây

        $User = NguoiDung::where('tenDangNhap', '=', $data['tenDangNhap'])
            ->orWhere('email', '=', $data['tenDangNhap'])
            ->first();

        if (!$User) {
            return Response()->json([
                'success' => false,
                'message' => "Tài khoản không tồn tại",
                'data'=>[
                    'solanthu'=>0,
                ]
            ], 403);
        }


        $soLanThu = session()->get("login_solanthu_{$User['idNguoiDung']}", 0);
        $thoiGianMoKhoa = session()->get("login_timeblock_{$User['idNguoiDung']}", null);
        if ($thoiGianMoKhoa && time() <= $thoiGianMoKhoa) {
            return response()->json([
                'success' => false,
                'message' => 'Tài khoản của bạn đang bị khóa do đăng nhập sai nhiều lần',
                'data'=>[
                    'solanthu'=>5
                ]
            ], 403);
        }

        if (session()->has("login_captcha_{$User['idNguoiDung']}")) {
            if (!isset($data['captcha'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chưa nhập mã captcha',
                    'data' => [
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),
                        'solanthu' => $soLanThu,
                    ]
                ], 403);
            } else if ($data['captcha'] != session("login_captcha_{$User['idNguoiDung']}")) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sai mã captcha',
                    'data' => [
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),
                        'solanthu' => $soLanThu,
                    ]
                ], 403);
            }
        }

        if ($User['matKhau'] != $data['matKhau']) {
            $soLanThu++;
            session()->put("login_solanthu_{$User['idNguoiDung']}", $soLanThu);
            if ($soLanThu >= 3 && $soLanThu <= $soLanThuToiDa) {
                session()->put("login_captcha_{$User['idNguoiDung']}", random_int(100000, 999999));
                if ($soLanThu == $soLanThuToiDa) {
                    session()->forget(["login_solanthu_{$User['idNguoiDung']}", "login_captcha_{$User['idNguoiDung']}"]);
                    session()->put("login_timeblock_{$User['idNguoiDung']}", $timeBlock);
                    return response()->json([
                        'success' => false,
                        'message' => 'Tài khoản của bạn đã bị khóa do đăng nhập sai nhiều lần',
                        'data' => [
                            'solanthu'=>$soLanThu,
                            'timeblock' => session("login_timeblock_{$User['idNguoiDung']}"),
                        ],
                    ], 403);
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Sai mật khẩu lần thứ: ' . $soLanThu,
                    'data' => [
                        'solanthu' => $soLanThu,
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),
                    ]
                ], 403);
            }
            return Response()->json([
                'success' => false,
                'message' => 'Sai mật khẩu lần thứ: ' . $soLanThu,
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
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'data' => [
                'hoVaTen' => $User['hoVaTen'],
                'anhDaiDien' => $User['anhDaiDien'],
                'email' => $User['email'],
                'role' => $User['vaiTro'],
                'token' => $token,
            ],
        ], 200);
    }
    function signup(Request $request)
    {
        $data = $request->all();
        if ($request->hasFile('anhDaiDien')) {
            $file = $request->files('anhDaiDien');

            if (!File::exists(public_path('imgs/') . $file->getClientOriginalName())) {
                $file->move(public_path('imgs/' . $file->getClientOriginalName()));
            }
            $data['anhDaiDien'] = $file->getClientOriginalName();
        } else {
            $data['anhDaiDien'] = 'anhDaiDienDefault.jpg';
        }
        try {
            NguoiDung::create([
                'tenDangNhap' => $data['tenDangNhap'],
                'matKhau' => $data['matKhau'],
                'hoVaTen' => $data['hoVaTen'],
                'ngaySinh' => DateTime::createFromFormat('d-m-Y', $data['ngaySinh']),
                'gioiTinh' => $data['gioiTinh'],
                'SĐT' => $data['SĐT'],
                'vaiTro' => $data['vaiTro'],
                'email' => $data['email'],
                'anhDaiDien' => $data['anhDaiDien']
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Đăng ký không thành công ' . $err,
                'data' => []
            ]);
        }
        session()->forget(["SignUp_VerificationEmail_{$data['email']}", "SignUp_VerificationEmail_TimeBlock_{$data['email']}"]);
        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công',
            'data' => []
        ], 200);
    }
    function sendVerificationEmail(Request $request)
    {
        $data = $request->all();
        $captcha = random_int(100000, 999999);

        if (NguoiDung::where('tenDangNhap', '=', $data['tenDangNhap'])->first()) {
            return Response()->json([
                'success' => false,
                'err' => "Tên đăng nhập đã tồn tại",
            ], 403);
        }
        if (NguoiDung::where('email', '=', $data['tenDangNhap'])->first()) {
            return Response()->json([
                'success' => false,
                'err' => "Email đã tồn tại",
            ], 403);
        }

        try {
            Mail::to($data['email'])->send(new sendVerificationEmail($data['name'], $captcha));
            session()->put("SignUp_VerificationEmail_{$data['email']}", $captcha);
            session()->put("SignUp_VerificationEmail_TimeBlock_{$data['email']}", time() + 180);
            var_dump(session("SignUp_VerificationEmail_{$data['email']}"));
            var_dump(session("SignUp_VerificationEmail_TimeBlock_{$data['email']}"));
            return response()->json([
                'success' => true,
                'message' => 'Gửi mã thành công',
                'data' => [],
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Gửi mã thất bại. vui lòng thử lại',
                'data' => [],
            ], 500);
        }
    }
}
