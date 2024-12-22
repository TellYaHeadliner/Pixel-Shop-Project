<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Blog', function (Blueprint $table){
            $table->uuid('idBlog')->primary();
            $table->string('tieuDe');
            $table->string('slug');
            $table->binary('hinhAnh');
            $table->string('noiDung');
            $table->timestamp('ngayDang')->default()->useCurrent();
            $table->boolean('trangThai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Blog');
    }
};
