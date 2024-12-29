<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $Blog = [
            'idBlog' => 1,
            'tieuDe' => 'Giới thiệu Laravel',
            'slug' => 'gioi-thieu-laravel',
            'noiDung' => 'Laravel là một framework PHP mạnh mẽ...',
            'hinhAnh' => 'laravel.jpg',
            'ngayDang' => '2024-12-25',
            'trangThai' => 1,
        ];

        /*
            Vui lòng trả về json đúng cú pháp theo thứ tự
            - success: true/false
            - message: Thông báo về trạng thái
            - data: Dữ liệu Blog nếu có, nếu không trả về null
            Trường hợp dữ liệu trả về đúng một dòng data nếu viết Tiếng Việt thì dữ liệu sẽ bị lỗi
        */
        return response()->json([
            'success' => 'true',
            'message' => 'Lấy dữ liệu Blog thành công',
            'data' => $Blog,
            'Request'=>$request->attributes->get('token')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
