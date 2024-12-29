<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT as FirebaseJWT ;

class LoginController extends Controller
{
    function CreateJwt(){

    $payload = [
        'idUser' => '1',       // Subject
        'role' => '1',    // Vai trò
        'iat' => time(),          // Issued at
        'exp' => time() + 60*60,  // Hết hạn sau 1 giờ
    ];
    $token = FirebaseJWT::encode($payload, env('JWT_SECRET'), 'HS256');
    return response()->json(['token' => $token]);
    }
}
