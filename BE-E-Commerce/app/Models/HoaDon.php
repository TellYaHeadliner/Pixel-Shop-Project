<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    use HasFactory;
    protected $table='hoadon';
	public $timestamp=false;

    

    protected $fillable = [
        'idHoaDon',
        'idNguoiDung',
        'idDiaChi',
        'tongSoTien',
        'trangThai',
        'phuongThucThanhToan',
        'ngayDat',
        'nhanVienXacNhan',
        'ngayXacNhan',
        'soLan',
        'timeBlock'
    ];

    public function cthd(){
        return $this->hasMany(ChiTietHoaDon::class, 'idHoaDon', 'idHoaDon');
    }

    public function trahang(){
        return $this->hasMany(TraHang::class, 'idHoaDon', 'idHoaDon');
    }
}
