<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YeuThich extends Model
{
    use HasFactory;
    protected $table = 'yeuthich';
    protected $primaryKey = null;
    public $timestamp = false;
    protected $fillable = [
        'idSanPham',
        'idNguoiDung',
    ];

    public function sanPham(){
        return $this->belongsTo(SanPham::class, 'idSanPham', 'idSanPham');
    }

    public function nguoiDung(){
        return $this->belongsTo(NguoiDung::class, 'idNguoiDung', 'idNguoiDung');
    }
}
