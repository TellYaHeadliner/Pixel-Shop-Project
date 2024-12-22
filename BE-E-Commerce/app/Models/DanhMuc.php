<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhMuc extends Model
{
    use HasFactory;

    protected $fillable = [
        'idDanhMuc',
        'tenDanhMuc',
        'idDanhMucCha'
    ];

    public function sanpham(){
        return $this->hasMany(SanPham::class, 'idDanhMuc', 'idDanhMuc');
    }

    public function children(){
        return $this->hasMany(DanhMuc::class, 'idDanhMucCha', 'idDanhMuc');
    }

    public function parent(){
        return $this->belongsTo(DanhMuc::class, 'idDanhMucCha', 'idDanhMuc');
    }
}
