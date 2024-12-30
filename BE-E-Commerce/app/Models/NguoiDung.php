<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class NguoiDung extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table="nguoidung";
    protected $primaryKey="idNguoidung";
    public $timestamps=false;

    protected $fillable = [
        'idNguoiDung',
        'tenDangNhap',
        'matKhau',
        'hoVaTen',
        'ngaySinh',
        'gioiTinh',
        'SDT',
        'vaiTro',
        'email',
        'anhDaiDien'
    ];

    protected $hidden = [
        'matKhau', 
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'ngaySinh' => 'datetime',
            'matKhau' => 'hashed',
        ];
    }

    public function message(){
        return $this->hasMany(Message::class, 'idNguoiDung');
    }

    public function user1(){
        return $this->hasMany(User::class, 'idNguoiDung', 'idUser1');
    }

    public function user2(){
        return $this->hasMany(User::class, 'idNguoiDung', 'idUser2');
    }

    public function diachi(){
        return $this->hasMany(DiaChi::class, 'idNguoiDung');
    }

    public function hoadon(){
        return $this->hasMany(HoaDon::class, 'idNguoiDung');
    }

    public function yeuthich(){
        return $this->hasMany(Yeuthich::class, 'idNguoiDung');
    }

    public function giohang(){
        return $this->hasMany(GioHang::class, 'idNguoiDung');
    }

    public function danhgia(){
        return $this->hasMany(DanhGia::class, 'idNguoiDung');
    }
}
