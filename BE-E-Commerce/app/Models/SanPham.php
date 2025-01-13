<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\ChiTietHoaDon;


class SanPham extends Model
{
    use HasFactory;
    protected $table="sanpham";
    protected $primaryKey="idSanPham";
    public $timestamps=false;

 public static function getListBestSellingProducts()
    {
        try {
            $listSanPham = ChiTietHoaDon::select(
                'chitiethoadon.idSanPham',
                DB::raw('SUM(soLuong) as totalSoLuong'),
            )
                ->join('hoadon','hoadon.idHoaDon','=','chitiethoadon.idHoaDon')
                ->where('hoadon.trangThai','=','1')
                ->groupBy('chitiethoadon.idSanPham')
                ->orderByDesc('totalSoLuong')
                ->take(10)
                ->get();
            $temp= [];
            foreach($listSanPham as $item){
                $temp[]= $item->idSanPham;
            }
            return $temp;
        } catch (\Exception $err) {
            return $err;
        }
    } 
        protected $fillable = [
        'idSanPham',
        'tenSanPham',
        'moTa',    
        'gia',
        'soLuong',   
        'ngayThem',
        'img',
        'idDanhMuc',
        'soLuotXem',
        'loai',
        'hang',
        'noiBat',
        'idKhuyenMai',
        'trangThai',
        'slug'
    ];

    public function chitietlohang(){
        return $this->hasMany(ChiTietLoHang::class, 'idSanPham');
    }
    
    public function khuyenmai(){
        return $this->belongsTo(KhuyenMai::class, 'idKhuyenMai');
    }

    public function yeuthich(){
        return $this->hasMany(YeuThich::class, 'idSanPham');
    }

    public function giohang(){
        return $this->hasMany(GioHang::class, 'idSanPham');
    }

    public function danhgia(){
        return $this->hasMany(DanhGia::class, 'idSanPham');
    }
 
    public function chitiethoadon(){
        return $this->hasMany(ChiTietHoaDon::class, 'idSanPham');
    }

    public function danhmuc(){
        return $this->belongsTo(DanhMuc::class, 'idDanhMuc');
    }
}
