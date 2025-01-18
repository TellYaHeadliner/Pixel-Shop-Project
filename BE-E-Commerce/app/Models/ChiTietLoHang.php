<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietLoHang extends Model
{
    use HasFactory;
		protected $table = 'chitietlohang';
		public $timestamps = false;
    protected $fillable = [
        'idSanPham',
        'idLoHang',
        'giaNhap',
        'soLuong'
    ];

		public function loHang()
    {
        return $this->belongsTo(LoHang::class, 'idLoHang', 'idLoHang');
    }

    public function sanpham(){
        return $this->belongsTo(SanPham::class);
    }
}
