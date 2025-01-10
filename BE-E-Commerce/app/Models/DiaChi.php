<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaChi extends Model
{
    use HasFactory;

		protected $table = "diachi";

		protected $primaryKey  = "idDiaChi";

    protected $fillable = [
        'idDiaChi',
        'idNguoiDung',
        'diaChi',
        'sdt',
        'note',
        'loaiDiaChi',
        'macDinh',
    ];

		public $timestamps = false;

    public function hoadon(){
        return $this->hasMany(HoaDon::class, 'idDiaChi', 'idDiaChi');
    }

    public function nguoidung(){
        return $this->belongsTo(NguoiDung::class, 'idNguoiDung', 'idNguoiDung');
    }
}
