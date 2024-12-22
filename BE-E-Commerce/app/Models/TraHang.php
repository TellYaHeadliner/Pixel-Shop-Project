<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraHang extends Model
{
    use HasFactory;

    protected $fillable = [
        'idTraHang',
        'idHoaDon',
        'ngayCoTheLayHang',
        'diaChiHienTai',
        'nganHangHoanTien'
    ];

    public function chitiettrahang(){
        return $this->hasMany(ChiTietTraHang::class, 'idTraHang', 'idTraHang');
    }

    public function hoadon(){
        return $this->belongsTo(HoaDon::class, 'idHoaDon', 'idHoaDon');
    }
}
