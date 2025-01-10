<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    use HasFactory;
    protected $table="sanpham";
    protected $primaryKey="idSanPham";
    public $timestamps=false;

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

    public function thongsodienthoai(){
        return $this->hasOne(ThongSoDienThoai::class, 'idSanPham');
    }

    public function thongsolaptop(){
        return $this->hasOne(ThongSoLapTop::class, 'idSanPham');
    }

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
