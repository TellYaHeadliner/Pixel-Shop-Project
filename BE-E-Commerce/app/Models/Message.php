<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'idMessage',
        'idCuocTroChuyen',
        'idNguoiGui',
        'noiDung',
        'thoiGian'
    ];

    public function cuocTroChuyen(){
        return $this->belongsTo(CuocTroChuyen::class, 'idCuocTroChuyen', 'idCuocTroChuyen');
    }

    public function nguoidung(){
        return $this->belongsTo(NguoiDung::class, 'idNguoiGui', 'idNguoiDung');
    }
}
