<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThongTin extends Model
{
    use HasFactory;

		protected $table = "thongtin";
    protected $fillable = [
        'dichVu',
        'facebook',
        'instagram',
        'youtube',
        'tiktok'
    ];

		static function Add(){
			
		}

		static function Get(){
			return ThongTin::all()->first();
		}
}
