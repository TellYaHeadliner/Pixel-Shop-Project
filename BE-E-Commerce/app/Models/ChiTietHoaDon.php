<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDon extends Model
{
    use HasFactory;

    protected $fillable = [
        'idHoaDon',
        'idSanPham',
        'soLuong',
        'tongTien',
    ];

    public function hoadon(){
        return $this->belongsTo(HoaDon::class, 'idHoaDon');
    }

    public function sanpham(){
        return $this->belongsTo(SanPham::class, 'idSanPham');
    }
}
