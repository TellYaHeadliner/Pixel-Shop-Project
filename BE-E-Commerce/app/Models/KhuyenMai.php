<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhuyenMai extends Model
{
    use HasFactory;

    protected $fillable = [
        'idKhuyenMai',
        'phamTram',
        'ngayBatDau',
        'ngayKetThuc'
    ];

    public function sanpham(){
        return $this->hasMany(SanPham::class, 'idKhuyenMai', 'idKhuyenMai');
    }
}
