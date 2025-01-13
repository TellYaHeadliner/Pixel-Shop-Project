<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class BaiViet extends Model
{
    use HasFactory;
		protected $table = "baiviet";
		protected $primaryKey = "idBaiViet";
		protected $fillable=[
			'idBaiViet',
			'tieuDe',
			'slug',
			'noiDung',
			'hinhAnh',
			'ngayDang',
			'trangThai'
		];
		public $timestamps = false;
}
