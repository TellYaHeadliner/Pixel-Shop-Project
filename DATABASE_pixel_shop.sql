-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2024 at 09:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

CREATE DATABASE `pixel_shop` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use `pixel_shop`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pixel_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `baiviet`
--

CREATE TABLE `baiviet` (
  `idBaiViet` bigint NOT NULL,
  `tieuDe` text NOT NULL,
  `slug` text NOT NULL,
  `hinhAnh` text NOT NULL,
  `noiDung` text NOT NULL,
  `ngayDang` datetime NOT NULL,
  `trangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `idHoaDon` bigint NOT NULL,
  `idSanPham` bigint NOT NULL,
  `soLuong` int NOT NULL,
  `tongTien` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietlohang`
--

CREATE TABLE `chitietlohang` (
  `idSanPham` bigint NOT NULL,
  `idLoHang` bigint NOT NULL,
  `giaNhap` int NOT NULL,
  `soLuong` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cuoctrochuyen`
--

CREATE TABLE `cuoctrochuyen` (
  `idCuocTroChuyen` bigint NOT NULL,
  `idUser1` bigint NOT NULL,
  `idUser2` bigint ,
  `trangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `danhgia`
--

CREATE TABLE `danhgia` (
  `idNguoidung` bigint NOT NULL,
  `idSanPham` bigint NOT NULL,
  `noidung` text NOT NULL,
  `soSao` tinyint(1) NOT NULL,
  `ngayGio` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `idDanhMuc` bigint NOT NULL,
  `tenDanhMuc` tinytext NOT NULL,
  `idDanhMucCha` bigint
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `diachi`
--

CREATE TABLE `diachi` (
  `idDiaChi` bigint NOT NULL,
  `idNguoiDung` bigint NOT NULL,
  `diaChi` text NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `note` text ,
  `loaiDiaChi` tinytext NOT NULL,
  `macDinh` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `idNguoiDung` bigint NOT NULL,
  `idSanPham` bigint NOT NULL,
  `soLuong` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `idHoaDon` bigint NOT NULL,
  `idNguoiDung` bigint NOT NULL,
  `idDiaChi` bigint NOT NULL,
  `tongSoTien` int NOT NULL,
  `trangThai` tinyint(1) NOT NULL,
  `phuongThucThanhToan` tinyint(1) NOT NULL,
  `ngayDat` datetime NOT NULL,
  `nhanVienXacNhan` bigint ,
  `ngayXacNhan` datetime ,
  `soLan` tinyint(1) NOT NULL,
  `thoiGianKhoa` datetime 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `idKhuyenMai` bigint NOT NULL,
  `phanTram` int NOT NULL,
  `ngayBatDau` datetime NOT NULL,
  `ngayKetThuc` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lienhe`
--

CREATE TABLE `lienhe` (
  `idLienHe` bigint NOT NULL,
  `hoVaTen` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `noiDung` text NOT NULL,
  `thoiGian` datetime NOT NULL,
  `trangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lohang`
--

CREATE TABLE `lohang` (
  `idLoHang` bigint NOT NULL,
  `idNhaCungCap` bigint NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `idNguoiDung` bigint NOT NULL,
  `tenDangNhap` tinytext NOT NULL,
  `hoVaTen` tinytext NOT NULL,
  `ngaySinh` date NOT NULL,
  `matKhau` tinytext NOT NULL,
  `gioiTinh` tinyint(1) NOT NULL,
  `SĐT` varchar(10),
  `vaiTro` tinyint(1) NOT NULL,
  `email` tinytext NOT NULL,
  `anhDaiDien` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `idNhaCungCap` bigint NOT NULL,
  `tenNhaCungCap` tinytext NOT NULL,
  `tenLienHe` tinytext NOT NULL,
  `diaChi` text NOT NULL,
  `soDienThoai` varchar(10) NOT NULL,
  `email` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `idSanPham` bigint NOT NULL,
  `tenSanPham` text NOT NULL,
  `moTa` longtext NOT NULL,
  `gia` int NOT NULL,
  `soLuong` int NOT NULL,
  `ngayThem` datetime NOT NULL,
  `img` text NOT NULL,
  `soLuotXem` int NOT NULL,
  `loai` tinyint(1) NOT NULL,
  `hang` tinytext NOT NULL,
  `noiBat` tinyint(1) NOT NULL,
  `trangThai` tinyint(1) NOT NULL,
  `slug` text NOT NULL,
  `idDanhMuc` bigint NOT NULL,
  `idKhuyenMai` bigint 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongsosanpham`
--

CREATE TABLE `thongsosanpham` (
  `idSanPham` bigint NOT NULL,
  `heDieuHanh` tinytext DEFAULT NULL,
  `CPU` tinytext DEFAULT NULL,
  `RAM` int DEFAULT NULL,
  `RAMToiDa` int DEFAULT NULL,
  `loaiRAM` text DEFAULT NULL,
  `busRAM` int DEFAULT NULL,
  `soluongkheRAM` int DEFAULT NULL,
  `dungluongROM` int(11) DEFAULT NULL,
  `loaiROM` text DEFAULT NULL,
  `soKheROM` int DEFAULT NULL,
  `GPU` text DEFAULT NULL,
  `cameraTruoc` text DEFAULT NULL,
  `cameraSau` text DEFAULT NULL,
  `pin` text DEFAULT NULL,
  `sac` text DEFAULT NULL,
  `loa` text DEFAULT NULL,
  `SIM` text DEFAULT NULL,
  `manHinh` text DEFAULT NULL,
  `kichThuoc` tinytext DEFAULT NULL,
  `trongLuong` decimal DEFAULT NULL,
  `mauSac` tinytext DEFAULT NULL,
  `congKetNoi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongtin`
--

CREATE TABLE `thongtin` (
  `dichVu` longtext NOT NULL,
  `facebook` text NOT NULL,
  `instagram` text NOT NULL,
  `youtube` text NOT NULL,
  `tiktok` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tinnhan`
--

CREATE TABLE `tinnhan` (
  `idTinNhan` bigint NOT NULL,
  `idCuocTroChuyen` bigint NOT NULL,
  `idNguoiGui` bigint NOT NULL,
  `noiDung` text NOT NULL,
  `thoiGian` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trahang`
--

CREATE TABLE `trahang` (
  `idTraHang` bigint NOT NULL,
  `idHoaDon` bigint NOT NULL,
  `idSanPham` bigint NOT NULL,
  `hinhAnhSanPham` text NOT NULL,
  `lyDoTraHang` text NOT NULL,
  `ngayCoTheLayHang` datetime NOT NULL,
  `diaChiHienTai` bigint NOT NULL,
  `nganHangHoanTien` tinytext NOT NULL,
  `soTaiKhoanHoanTien` tinytext NOT NULL,
  `trangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `yeuthich`
--

CREATE TABLE `yeuthich` (
  `idSanPham` bigint NOT NULL,
  `idNguoiDung` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baiviet`
--
ALTER TABLE `baiviet`
  ADD PRIMARY KEY (`idBaiViet`);

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`idHoaDon`,`idSanPham`),
  ADD KEY `idSanPham` (`idSanPham`);

--
-- Indexes for table `chitietlohang`
--
ALTER TABLE `chitietlohang`
  ADD PRIMARY KEY (`idSanPham`,`idLoHang`),
  ADD KEY `idLoHang` (`idLoHang`);

--
-- Indexes for table `cuoctrochuyen`
--
ALTER TABLE `cuoctrochuyen`
  ADD PRIMARY KEY (`idCuocTroChuyen`),
  ADD KEY `idUser1` (`idUser1`),
  ADD KEY `idUser2` (`idUser2`);

--
-- Indexes for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD PRIMARY KEY (`idNguoidung`,`idSanPham`),
  ADD KEY `idSanPham` (`idSanPham`);

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`idDanhMuc`),
  ADD KEY `idDanhMucCha` (`idDanhMucCha`);

--
-- Indexes for table `diachi`
--
ALTER TABLE `diachi`
  ADD PRIMARY KEY (`idDiaChi`),
  ADD KEY `idNguoiDung` (`idNguoiDung`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`idNguoiDung`,`idSanPham`),
  ADD KEY `idSanPham` (`idSanPham`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`idHoaDon`),
  ADD KEY `idDiaChi` (`idDiaChi`),
  ADD KEY `idNguoiDung` (`idNguoiDung`),
  ADD KEY `nhanVienXacNhan` (`nhanVienXacNhan`);

--
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`idKhuyenMai`);

--
-- Indexes for table `lienhe`
--
ALTER TABLE `lienhe`
  ADD PRIMARY KEY (`idLienHe`);

--
-- Indexes for table `lohang`
--
ALTER TABLE `lohang`
  ADD PRIMARY KEY (`idLoHang`),
  ADD KEY `idNhaCungCap` (`idNhaCungCap`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`idNguoiDung`);

--
-- Indexes for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`idNhaCungCap`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`idSanPham`),
  ADD KEY `idDanhMuc` (`idDanhMuc`),
  ADD KEY `idKhuyenMai` (`idKhuyenMai`);

--
-- Indexes for table `thongsosanpham`
--
ALTER TABLE `thongsosanpham`
  ADD PRIMARY KEY (`idSanPham`);

--
-- Indexes for table `tinnhan`
--
ALTER TABLE `tinnhan`
  ADD PRIMARY KEY (`idTinNhan`),
  ADD KEY `idCuocTroChuyen` (`idCuocTroChuyen`),
  ADD KEY `idNguoiGui` (`idNguoiGui`);

--
-- Indexes for table `trahang`
--
ALTER TABLE `trahang`
  ADD PRIMARY KEY (`idTraHang`),
  ADD KEY `idHoaDon` (`idHoaDon`),
  ADD KEY `idSanPham` (`idSanPham`);

--
-- Indexes for table `yeuthich`
--
ALTER TABLE `yeuthich`
  ADD PRIMARY KEY (`idSanPham`,`idNguoiDung`),
  ADD KEY `idNguoiDung` (`idNguoiDung`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `baiviet`
--
ALTER TABLE `baiviet`
  MODIFY `idBaiViet` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cuoctrochuyen`
--
ALTER TABLE `cuoctrochuyen`
  MODIFY `idCuocTroChuyen` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `idDanhMuc` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `diachi`
--
ALTER TABLE `diachi`
  MODIFY `idDiaChi` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `idHoaDon` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `idKhuyenMai` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lienhe`
--
ALTER TABLE `lienhe`
  MODIFY `idLienHe` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lohang`
--
ALTER TABLE `lohang`
  MODIFY `idLoHang` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `idNguoiDung` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  MODIFY `idNhaCungCap` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `idSanPham` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thongsosanpham`
--
ALTER TABLE `thongsosanpham`
  MODIFY `idSanPham` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tinnhan`
--
ALTER TABLE `tinnhan`
  MODIFY `idTinNhan` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trahang`
--
ALTER TABLE `trahang`
  MODIFY `idTraHang` bigint NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`idHoaDon`) REFERENCES `hoadon` (`idHoaDon`),
  ADD CONSTRAINT `chitiethoadon_ibfk_2` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`);

--
-- Constraints for table `chitietlohang`
--
ALTER TABLE `chitietlohang`
  ADD CONSTRAINT `chitietlohang_ibfk_1` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`),
  ADD CONSTRAINT `chitietlohang_ibfk_2` FOREIGN KEY (`idLoHang`) REFERENCES `lohang` (`idLoHang`);

--
-- Constraints for table `cuoctrochuyen`
--
ALTER TABLE `cuoctrochuyen`
  ADD CONSTRAINT `cuoctrochuyen_ibfk_1` FOREIGN KEY (`idUser1`) REFERENCES `nguoidung` (`idNguoiDung`),
  ADD CONSTRAINT `cuoctrochuyen_ibfk_2` FOREIGN KEY (`idUser2`) REFERENCES `nguoidung` (`idNguoiDung`);

--
-- Constraints for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `danhgia_ibfk_1` FOREIGN KEY (`idNguoidung`) REFERENCES `nguoidung` (`idNguoiDung`),
  ADD CONSTRAINT `danhgia_ibfk_2` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`);

--
-- Constraints for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD CONSTRAINT `danhmuc_ibfk_1` FOREIGN KEY (`idDanhMucCha`) REFERENCES `danhmuc` (`idDanhMuc`);

--
-- Constraints for table `diachi`
--
ALTER TABLE `diachi`
  ADD CONSTRAINT `diachi_ibfk_1` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`);

--
-- Constraints for table `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`),
  ADD CONSTRAINT `giohang_ibfk_2` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`idDiaChi`) REFERENCES `diachi` (`idDiaChi`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`),
  ADD CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`nhanVienXacNhan`) REFERENCES `nguoidung` (`idNguoiDung`);

--
-- Constraints for table `lohang`
--
ALTER TABLE `lohang`
  ADD CONSTRAINT `lohang_ibfk_1` FOREIGN KEY (`idNhaCungCap`) REFERENCES `nhacungcap` (`idNhaCungCap`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`idDanhMuc`) REFERENCES `danhmuc` (`idDanhMuc`),
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`idKhuyenMai`) REFERENCES `khuyenmai` (`idKhuyenMai`);

--
-- Constraints for table `thongsosanpham`
--
ALTER TABLE `thongsosanpham`
  ADD CONSTRAINT `thongsosanpham_ibfk_1` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`);

--
-- Constraints for table `tinnhan`
--
ALTER TABLE `tinnhan`
  ADD CONSTRAINT `tinnhan_ibfk_1` FOREIGN KEY (`idCuocTroChuyen`) REFERENCES `cuoctrochuyen` (`idCuocTroChuyen`),
  ADD CONSTRAINT `tinnhan_ibfk_2` FOREIGN KEY (`idNguoiGui`) REFERENCES `nguoidung` (`idNguoiDung`);

--
-- Constraints for table `trahang`
--
ALTER TABLE `trahang`
  ADD CONSTRAINT `trahang_ibfk_1` FOREIGN KEY (`idHoaDon`) REFERENCES `hoadon` (`idHoaDon`),
  ADD CONSTRAINT `trahang_ibfk_2` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`),
  ADD CONSTRAINT `trahang_ibfk_3` FOREIGN KEY (`diaChiHienTai`) REFERENCES `diachi` (`idDiaChi`);

--
-- Constraints for table `yeuthich`
--
ALTER TABLE `yeuthich`
  ADD CONSTRAINT `yeuthich_ibfk_1` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`),
  ADD CONSTRAINT `yeuthich_ibfk_2` FOREIGN KEY (`idSanPham`) REFERENCES `sanpham` (`idSanPham`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
