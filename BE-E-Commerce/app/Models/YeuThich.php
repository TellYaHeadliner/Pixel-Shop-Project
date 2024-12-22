<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YeuThich extends Model
{
    use HasFactory;

    protected $fillable = [
        'idSanPham',
        'idKhachHang',
    ];

    public function sanPham(){
        return $this->belongsTo(SanPham::class, 'idSanPham', 'idSanPham');
    }

    public function nguoiDung(){
        return $this->belongsTo(NguoiDung::class, 'idKhachHang', 'idKhachHang');
    }
}
