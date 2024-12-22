<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'idBlog',
        'tieuDe',
        'slug',
        'noiDung',
        'hinhAnh',
        'ngayDang',
        'trangThai'
    ];
}
