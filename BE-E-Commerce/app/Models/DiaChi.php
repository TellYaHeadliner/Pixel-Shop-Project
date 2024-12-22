<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaChi extends Model
{
    use HasFactory;

    protected $fillable = [
        'idDiaChi',
        'idNguoiDung',
        'diaChi',
        'SDT',
        'note',
        'loaiDiaChi',
        'isMacDinh',
    ];

    public function hoadon(){
        return $this->hasMany(HoaDon::class, 'idDiaChi', 'idDiaChi');
    }

    public function nguoidung(){
        return $this->belongsTo(NguoiDung::class, 'idNguoiDung', 'idNguoiDung');
    }
}
