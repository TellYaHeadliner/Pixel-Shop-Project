<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckEmailSignUp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $captcha=$request->input('captcha');
        $email=$request->input('email');
       
        if(session()->has("SignUp_VerificationEmail_{$email}")&&session("SignUp_VerificationEmail_TimeBlock_{$email}")>time())
        {
           
            if($captcha!=session("SignUp_VerificationEmail_{$email}")){
                return response()->json([
                    'success'=>false,
                    'message'=>'Sai mã xác nhận email',
                    'data'=>[]
                ],403);
            } 
            return $next($request);
        }
        else if(session()->has("SignUp_VerificationEmail_TimeBlock_{$email}")&&session("SignUp_VerificationEmail_TimeBlock_{$email}")<time()){
            
            return response()->json([
                'success'=>false,
                'message'=>'Mã xác nhận đã bị vô hiệu hóa vui lòng nhấn nút gửi mã để nhận mã mới.',
                'data'=>[]
            ],403);
        }
        return response()->json([
            'success'=>false,
            'message'=>'Sai mã xác nhận email',
            'data'=>[]
        ],403);
    }
}
