<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    use HasFactory;

    protected $fillable = [
        'idNguoiDung',
        'idSanPham'
    ];
    protected $table="giohang";
    public static function findByPrimaryKeys($idSanPham, $idNguoiDung)
    {
        return self::where('idSanPham', $idSanPham)
                    ->where('idNguoiDung', $idNguoiDung)
                    ->first();
    }
    public $timestamps=false;

    public function nguoidung(){
        return $this->hasMany(NguoiDung::class, 'idNguoiDung', 'idNguoiDung');
    }

    public function sanpham(){
        return $this->belongsTo(SanPham::class, 'idSanPham', 'idSanPham');
    }
}
