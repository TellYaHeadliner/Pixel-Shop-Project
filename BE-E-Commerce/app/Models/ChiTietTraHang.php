<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietTraHang extends Model
{
    use HasFactory;

    protected $fillable = [
        'idTraHang',
        'idSanPham',
        'hinhAnhSanPham',
        'lyDoTraHang',
        'ketQuaHoanTra'
    ];

    public function trahang(){
        return $this->belongsTo(TraHang::class);
    }
}
