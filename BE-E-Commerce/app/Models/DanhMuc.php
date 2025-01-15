<?php

namespace App\Models;

use Faker\Core\Number;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhMuc extends Model
{
    use HasFactory;

		protected $table = 'danhmuc';

		protected $primaryKey = 'idDanhMuc';
    protected $fillable = [
        'idDanhMuc',
        'tenDanhMuc',
        'idDanhMucCha'
    ];
		public $timestamps = false;

    public function sanpham(){
        return $this->hasMany(SanPham::class, 'idDanhMuc', 'idDanhMuc');
    }

    public function children(){
        return $this->hasMany(DanhMuc::class, 'idDanhMucCha', 'idDanhMuc');
    }

    public function parent(){
        return $this->belongsTo(DanhMuc::class, 'idDanhMucCha', 'idDanhMuc');
    }

		public function getList($list = [],$cha = null){
				$tam = $tam = DanhMuc::where(function($query) use ($cha) {
						if ($cha !== null) {
								$query->where("idDanhMucCha", "like", $cha);
						} else {
								$query->whereNull("idDanhMucCha");
						}
				})->get();
				foreach($tam as $i){
					$obj = new \stdClass();
					$obj->idDanhMuc = $i['idDanhMuc'];
					$obj->tenDanhMuc = $i['tenDanhMuc'];
					$obj->idDanhMucCha = $i['idDanhMucCha'];
					$obj->child = $this->getList([],$obj->idDanhMuc);
					$list[] = $obj;
				}
				return $list;
		}

		public function getChildrenList($id,$list=[]){
			$list[] = (int) $id;
			$Children = DanhMuc::where("idDanhMucCha","=",$id)->get();
			foreach($Children as $i){
				$list = $this->getChildrenList($i['idDanhMuc'],$list);
			}
			return $list;
		}
}
