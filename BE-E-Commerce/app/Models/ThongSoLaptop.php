<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThongSoLaptop extends Model
{
    use HasFactory;

    protected $fillable = [
        'idSanPham',
        'CPU',
        'dungLuongRAM',
        'RAMToiDa',
        'loaiRAM',
        'busRAM',
        'soluongkheRAM',
        'loaiROM',
        'dungluongROM',
        'sokheROM',
        'size',
        'manHinh',
        'GPU',
        'soundCard',
        'congKetNoi',
        'trongLuong',
        'webcam',
        'pin',
        'sac'
    ];

    public function sanPham(){
        return $this->belongsTo(SanPham::class, 'idSanPham', 'idSanPham');
    }
}
