<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuocTroChuyen extends Model
{
    use HasFactory;

    protected $fillable = [
        'idCuocTroChuyen',
        'idUser1',
        'idUser2',
        'trangThai',
    ];

    public function message(){
        return $this->hasMany(Message::class);
    }

    public function idUser1(){
        return $this->belongsTo(NguoiDung::class, 'idUser1', 'idNguoiDung');
    }

    public function idUser2(){
        return $this->belongsTo(NguoiDung::class, 'idUser2', 'idNguoiDung');
    }
}
