<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\Key;
use Firebase\JWT\JWT as FirebaseJWT ;

use function Termwind\parse;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next ,$role = null): Response
    {
         $token = $request->header('Authorization');
        if(!$token){
            return response()->json(['err'=>'Token chua duoc cung cap'],401);
        }
        try{
            $token=str_replace('Bearer ','',$token);
            var_dump(time());
            
            $decode=FirebaseJWT::decode($token,new Key(env('JWT_SECRET'),'HS256'));
            var_dump($decode);
            if($role && (!isset($decode->role))|| $decode->role != $role){
                return response()->json(['error' => 'Bạn không có quyền truy cập'], 403);
            }

            $request->attributes->set('token',$decode);

        } catch(\Firebase\JWT\ExpiredException $err){
            return response()->json(['error' => 'Token het han ' . $err->getMessage()], 401);
        }
        catch(\Exception $err){
            return response()->json(['error' => 'Token không hợp lệ: ' . $err->getMessage()], 401);
        }
        return $next($request);
    }
}
