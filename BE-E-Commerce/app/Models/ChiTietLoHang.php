<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietLoHang extends Model
{
    use HasFactory;

    protected $fillable = [
        'idSanPham',
        'idLoHang',
        'giaNhap',
        'soLuong'
    ];

    public function lohang(){
        return $this->belongsTo(LoHang::class);
    }

    public function sanpham(){
        return $this->belongsTo(SanPham::class);
    }
}
