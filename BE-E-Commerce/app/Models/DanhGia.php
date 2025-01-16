<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhGia extends Model
{
    use HasFactory;

    protected $table='danhgia';
    protected $fillable = [
        'idSanPham',
        'idNguoiDung',
        'noiDungDanhGia',
        'soSao',
        'ngayGio'
    ];

    public function sanpham(){
        return $this->belongsTo(SanPham::class, 'idSanPham', 'idSanPham');
    }

    public function nguoidung(){
        return $this->belongsTo(NguoiDung::class, 'idNguoiDung', 'idNguoiDung');
    }
}
