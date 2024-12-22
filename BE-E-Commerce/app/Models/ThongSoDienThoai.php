<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThongSoDienThoai extends Model
{
    use HasFactory;

    protected $fillable = [
        'idSanPham',
        'heDieuHanh',
        'CPU',
        'RAM',
        'boNhoTrong',
        'cameraSau',
        'cameraTruoc',
        'pin',
        'sac',
        'SIM',
        'loa',
        'mauSac',
        'trongLuong'
    ];

    public function sanPham(){
        return $this->belongsTo(SanPham::class, 'idSanPham', 'idSanPham');
    }
}
