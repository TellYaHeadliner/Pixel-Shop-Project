<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoHang extends Model
{
    use HasFactory;
		protected $table = 'lohang';
		protected $primaryKey = 'idLoHang';
		public $timestamp = false;
    protected $fillable = [
        'idLoHang',
        'idNhaCungCap',
        'date'
    ];

    public function chitietlohang(){
        return $this->hasMany(ChiTietLoHang::class, 'idLoHang');
    }

    public function nhacungcap(){
        return $this->belongsTo(NhaCungCap::class, 'idNhaCungCap');
    }
}
