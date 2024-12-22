<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhaCungCap extends Model
{
    use HasFactory;

    protected $fillable = [
        'idNhaCungCap',
        'tenNhaCungCap',
        'tenLienHe',
        'diaChi',
        'soDienThoai',
        'email',
    ];

    public function lohang(){
        return $this->hasMany(LoHang::class, 'idNhaCungCap', 'idNhaCungCap');
    }
}
