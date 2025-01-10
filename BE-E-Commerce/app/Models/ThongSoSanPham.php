<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class ThongSoSanPham extends Model
{
    use HasFactory;
		protected $table = 'thongsosanpham';
		protected $primaryKey = 'idSanPham';
		public $timestamps = false;

		protected $fillable=[
			'idSanPham',
			'heDieuHanh',
			'CPU',
			'RAM',
			'RAMToiDa',
			'loaiRAM',
			'busRAM',
			'soLuongKheRAM',
			'dungLuongROM',
			'loaiROM',
			'soKheROM',
			'GPU',
			'cameraTruoc',
			'cameraSau',
			'pin',
			'sac',
			'loa',
			'SIM',
			'manHinh',
			'kichThuoc',
			'trongLuong',
			'mauSac',
			'congKetNoi'
		];

}
