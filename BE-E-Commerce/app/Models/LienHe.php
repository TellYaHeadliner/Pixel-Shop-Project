<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LienHe extends Model
{
    use HasFactory;

    protected $fillable = [
        'idLienHe',
        'hoVaTen',
        'email',
        'SDT',
        'noiDung',
        'thoiGian',
        'trangThai'
    ];

}
