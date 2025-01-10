<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LienHe extends Model
{
    use HasFactory;
		protected $table = "lienhe";
		protected $primaryKey = "idLienHe";
    protected $fillable = [
        'idLienHe',
        'hoVaTen',
        'email',
        'sdt',
        'noiDung',
        'thoiGian',
        'trangThai'
    ];

		public $timestamps = false;

}
