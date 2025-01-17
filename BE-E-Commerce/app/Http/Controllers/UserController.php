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
use Firebase\JWT\Key;
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
                'data' => [
                    'solanthu' => 0,
                ]
            ], 401);
        }

        $soLanThu = session()->get("login_solanthu_{$User['idNguoiDung']}", 0);
        $thoiGianMoKhoa = session()->get("login_timeblock_{$User['idNguoiDung']}", null);
        if ($thoiGianMoKhoa && time() <= $thoiGianMoKhoa) {
            return response()->json([
                'success' => false,
                'message' => 'Tài khoản của bạn đang bị khóa do đăng nhập sai nhiều lần',
                'data' => [
                    'solanthu' => 5
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
                ], 401);
            } else if ($data['captcha'] != session("login_captcha_{$User['idNguoiDung']}")) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sai mã captcha',
                    'data' => [
                        'captcha' => session()->get("login_captcha_{$User['idNguoiDung']}"),
                        'solanthu' => $soLanThu,
                    ]
                ], 401);
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
                            'solanthu' => $soLanThu,
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
                ], 401);
            }
            return Response()->json([
                'success' => false,
                'message' => 'Sai mật khẩu lần thứ: ' . $soLanThu,
                'data' => [
                    'solanthu' => $soLanThu,
                ],
            ], 401);
        }
        $payload = [
            'idNguoiDung'=>$User['idNguoiDung'],
            'hoVaTen' => $User['hoVaTen'],
            'anhDaiDien' => $User['anhDaiDien'],
            'role' => $User['vaiTro'],
            'iat' => time(),
            'exp' => time() + 3600*2,
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

        if ($request->input('matKhau') != $request->input('repeatMatKhau')) {
            return response()->json([
                'success' => false,
                'message' => 'Mật khẩu không trùng khớp!',
                'data' => []
            ], 401);
        }

        try {
            NguoiDung::create([
                'tenDangNhap' => $data['tenDangNhap'],
                'matKhau' => $data['matKhau'],
                'hoVaTen' => $data['hoVaTen'],
                'ngaySinh' => DateTime::createFromFormat('d-m-Y', $data['ngaySinh']),
                'gioiTinh' => $data['gioiTinh'],
                'sdt' => '0',
                'vaiTro' => 3,
                'email' => $data['email'],
                'anhDaiDien' => 'anhDaiDienDefault.jpg',
            ]);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => $err->getMessage(),
                // 'message' => 'Đăng ký không thành công, vui lòng thử lại!',
                'data' => []
            ], 500);
        }
        session()->forget(["SignUp_VerificationEmail_{$data['email']}", "SignUp_VerificationEmail_TimeBlock_{$data['email']}"]);
        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công',
            'data' => []
        ], 200);
    }
    function checkToken(Request $request){
        $token = $request['token'];
        if(!$token){
            return response()->json(['err'=>'Token chua duoc cung cap'],401);
        }
        try{       
            $decode=FirebaseJWT::decode($token,new Key(env('JWT_SECRET'),'HS256'));
        } catch(\Firebase\JWT\ExpiredException $err){
            return response()->json(['error' => 'Token het han' . $err->getMessage()], 401);
        }
        catch(\Exception $err){
            return response()->json(['error' => 'Token không hợp lệ: ' . $err->getMessage()], 401);
        }
        return response()->json([
            'success'=>true,
            'message'=>" ",
            'data'=>$decode
        ],200);
    }
    function sendVerificationEmail(Request $request)
    {
        $data = $request->all();
        $captcha = random_int(100000, 999999);

        if (NguoiDung::where('tenDangNhap', '=', $data['tenDangNhap'])->first()) {
            return Response()->json([
                'success' => false,
                'message' => "Tên đăng nhập đã tồn tại",
            ], 403);
        }
        if (NguoiDung::where('email', '=', $data['tenDangNhap'])->first()) {
            return Response()->json([
                'success' => false,
                'message' => "Email đã tồn tại",
            ], 403);
        }

        try {
            Mail::to($data['email'])->send(new sendVerificationEmail($data['name'], $captcha));
            session()->put("SignUp_VerificationEmail_{$data['email']}", $captcha);
            session()->put("SignUp_VerificationEmail_TimeBlock_{$data['email']}", time() + 180);
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

		function getById(Request $request){
			$data = $request->all();
			$user = NguoiDung::where('idNguoiDung', "=", $data["idNguoiDung"])->first();
			if($user){
				return response()->json([
					"success" => true,
					"message" => "Lấy thông tin user thành công!",
					"data" => $user
				],200);
			}
			return response()->json([
				"success" => true,
				"message" => "Không tìm thấy thông tin người dùng trong hệ thống!",
				"data" => []
			],404);
		}

    function updateById(Request $request)
    {
        $data = $request->all();
        $user = NguoiDung::where('idNguoiDung', "=", $data["idNguoiDung"])->first();
        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Không tìm thấy người dùng để cập nhật!",
                "data" => []
            ], 404);
        }
        $ngaySinh = DateTime::createFromFormat('d-m-Y', $data['ngaySinh']);
        try {
            $user->update([
                'hoVaTen' => $data['hoVaTen'] ?? $user->hoVaTen,
                'ngaySinh' => $ngaySinh == "0" ? $user->ngaySinh : $ngaySinh,
                'matKhau' => $data['matKhau'] ?? $user->matKhau,
                'gioiTinh' => $data['gioiTinh'] ?? $user->gioiTinh,
                'email' => $data['email'] ?? $user->email,
                'anhDaiDien' => $data['anhDaiDien'] ?? $user->anhDaiDien,
            ]);

            return response()->json([
                "success" => true,
                "message" => "Cập nhật thông tin người dùng thành công!",
                "data" => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Đã xảy ra lỗi khi cập nhật: " . $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

		function updateAnhDaiDien(Request $request){
			$data = request()->all();
			try{
				$user = NguoiDung::where("idNguoiDung", "=", $data["idNguoiDung"])->first();
				if (!$user) {
					return response()->json([
							"success" => false,
							"message" => "Không tìm thấy người dùng để cập nhật!",
							"data" => []
					], 404);
				}
				if ($request->hasFile('anhDaiDien')) {
						$file = $request->file('anhDaiDien');
						$newFileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
						$user->update([
                'anhDaiDien' => $newFileName,
            ]);
						$file->move(public_path('imgs'), $newFileName);
						return response()->json([
							"success" => true,
							"message" => "Cập nhật ảnh đại diện thành công!",
							"data" =>  ["anhDaiDien" => $newFileName],
						],200);
				}
			}catch (\Exception $e) {
				return response()->json([
                "success" => false,
                "message" => "Đã xảy ra lỗi khi cập nhật: " . $e->getMessage(),
                "data" => []
				], 500);
			}
		}
		function thongKeDoTuoi(){
			try{
				$data = NguoiDung::selectRaw("
															CASE
																	WHEN TIMESTAMPDIFF(YEAR, ngaySinh, CURDATE()) < 18 THEN '-18'
																	WHEN TIMESTAMPDIFF(YEAR, ngaySinh, CURDATE()) BETWEEN 18 AND 24 THEN '18-24'
																	WHEN TIMESTAMPDIFF(YEAR, ngaySinh, CURDATE()) BETWEEN 25 AND 34 THEN '25-34'
																	WHEN TIMESTAMPDIFF(YEAR, ngaySinh, CURDATE()) BETWEEN 35 AND 44 THEN '35-44'
																	WHEN TIMESTAMPDIFF(YEAR, ngaySinh, CURDATE()) >= 45 THEN '45+'
																	ELSE 'Không xác định'
															END AS doTuoi,
															COUNT(*) AS soNguoi
													")
													->groupBy('doTuoi')
													->get();
				return response()->json([
					'success' => true,
					'message' => 'Lấy dữ liệu thành công!',
					'data' => $data
				],200);
			}catch (\Exception $e){
				return response()->json([
					'success' => false,
					'message' => $e->getMessage(),
				],500);
			}
		}
}
