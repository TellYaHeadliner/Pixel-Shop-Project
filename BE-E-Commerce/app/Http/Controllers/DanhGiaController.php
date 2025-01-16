<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\DanhGia;
use DateTime;


class DanhGiaController extends Controller
{
    public function getDanhGiaByIdSanPham($id)
    {
        try {
            $data = DanhGia::where('idSanPham', $id)->orderByDesc('ngayGio')->get();
            return response()->json([
                'success' => true,
                'message' => 'Danh sách đánh giá của sản phẩm ' . $id,
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    public function getListDanhGia()
    {
        try {
            $data =  DB::table('DanhGia')
                ->join('sanpham', 'sanpham.idSanPham', '=', 'DanhGia.idSanPham')
                ->join('nguoidung', 'nguoidung.idNguoiDung', '=', 'DanhGia.idNguoiDung')
                ->select('sanpham.tenSanPham', 'DanhGia.soSao', 'DanhGia.ngayGio', 'nguoidung.hoVaTen', 'DanhGia.noiDung', 'DanhGia.idSanPham', 'DanhGia.idNguoiDung')
                ->orderBy('DanhGia.ngayGio', 'desc')
                ->get();
            return response()->json([
                'success' => true,
                'message' => 'Danh sách đánh giá của sản phẩm ',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }
    function getDanhGiaById($idNguoiDung, $idSanPham)
    {
        $data = DanhGia::where('idNguoiDung', $idNguoiDung)
            ->where('idSanPham', $idSanPham)
            ->first();
        return response()->json([
            'success' => true,
            'message' => "đánh giá sản phẩm " . $idSanPham . " của người dùng " . $idNguoiDung,
            'data' => $data
        ]);
    }
    public  function checkDanhGia($idNguoiDung, $idSanPham)
    {
        try {
            $data = DanhGia::where('idSanPham', $idSanPham)
                ->where('idNguoiDung', $idNguoiDung)
                ->first();
            if ($data) {
                return response()->json([
                    'success' => true,
                    'message' => 'Người dùng đã đánh giá sản phẩm',
                    'data' => $data
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'Người dùng chưa đánh giá sản phẩm',
                'data' => $data
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }

    public  function addDanhGia(Request $request)
    {
        try {

            $check = $this->checkDanhGia($request['idNguoiDung'], $request['idSanPham']);
            $check = $check->getData(true);

            if (!$check['success']) {
                DB::table('danhgia')
                    ->insert([
                        'idNguoiDung' => $request['idNguoiDung'],
                        'idSanPham' => $request['idSanPham'],
                        'noiDung' => $request['noiDung'],
                        'soSao' => $request['soSao'],
                        'ngayGio' => DateTime::createFromFormat('d-m-Y', $request['ngayGio']),
                    ]);
                return response()->json([
                    'success' => true,
                    'message' => 'thêm đánh giá thành công',
                    'data' => []
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'Người dùng đã đánh giá sản phẩm này',
                'data' => []
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi server ' . $err->getMessage(),
                'data' => []
            ], 500);
        }
    }

    function deleteDanhGia(Request $request)
    {
        try {
            DB::table('danhgia')
                ->where('idSanPham', $request['idSanPham'])
                ->where('idNguoiDung', $request['idNguoiDung'])
                ->delete();
            return response()->json([
                'success' => true,
                'message' => ' xóa đánh giá thành công',
                'data' => []
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                "success" => false,
                "message" => $err->getMessage(),
                "data" => [],
            ], 500);
        }
    }
}
