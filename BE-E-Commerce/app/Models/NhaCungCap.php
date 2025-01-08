<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhaCungCap extends Model
{
    use HasFactory;
		protected $table = 'nhacungcap';
		protected $id = 'idNhaCungCap';

		public $timestamps = false;

    protected $fillable = [
        'tenNhaCungCap',
        'tenLienHe',
        'diaChi',
        'soDienThoai',
        'email',
    ];



}
