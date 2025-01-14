<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhuyenMai extends Model
{
    use HasFactory;

		protected $table = 'khuyenmai';
		protected $primaryKey = 'idKhuyenMai';
    protected $fillable = [
        'idKhuyenMai',
        'phamTram',
        'ngayBatDau',
        'ngayKetThuc'
    ];
		public $timestamps = false;

    public function sanpham(){
        return $this->hasMany(SanPham::class, 'idKhuyenMai', 'idKhuyenMai');
    }
		public static function getIDKhuyenMaiConHieuLuc(){
			$listID = [];
			$listKM = KhuyenMai::where('ngayKetThuc',">",now())->get();
			foreach($listKM as $i)
				$listID[]=$i['idKhuyenMai'];
			return $listID;
		}
}
