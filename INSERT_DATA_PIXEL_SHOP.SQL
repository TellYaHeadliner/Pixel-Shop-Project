use pixel_shop

-- 1. Bảng `baiviet`
INSERT INTO `baiviet` (`tieuDe`, `slug`, `hinhAnh`, `noiDung`, `ngayDang`, `trangThai`) VALUES
('Công nghệ AI trong năm 2025', 'cong-nghe-ai-2025', 'ai-2025.jpg', 'AI đang trở thành xu hướng...', '2024-12-01 10:00:00', 1),
('Top 5 laptop tốt nhất 2025', 'top-5-laptop-2025', 'top-laptops.jpg', 'Danh sách những laptop nổi bật...', '2024-12-02 12:00:00', 1),
('Hướng dẫn sử dụng tai nghe không dây', 'huong-dan-su-dung-tai-nghe', 'wireless-earphones.jpg', 'Cách kết nối và sử dụng tai nghe...', '2024-12-03 09:00:00', 1);

-- 2. Bảng `sanpham`
INSERT INTO `sanpham` (`tenSanPham`, `moTa`, `gia`, `soLuong`, `ngayThem`, `img`, `soLuotXem`, `loai`, `hang`, `noiBat`, `trangThai`, `slug`, `idDanhMuc`, `idKhuyenMai`) VALUES
('Dell XPS 13', 'Laptop siêu mỏng nhẹ...', 30000000, 15, '2024-12-01 08:00:00', 'dell-xps-13.jpg', 120, 1, 'Dell', 1, 1, 'dell-xps-13', 1, NULL),
('Samsung Galaxy Tab S9', 'Máy tính bảng hiệu năng cao...', 20000000, 10, '2024-12-02 10:00:00', 'galaxy-tab-s9.jpg', 250, 2, 'Samsung', 1, 1, 'samsung-galaxy-tab-s9', 2, NULL),
('AirPods Pro 2', 'Tai nghe không dây chất lượng...', 6000000, 50, '2024-12-03 11:00:00', 'airpods-pro-2.jpg', 400, 3, 'Apple', 1, 1, 'airpods-pro-2', 3, NULL);

-- 3. Bảng `nguoidung`
INSERT INTO `nguoidung` (`tenDangNhap`, `hoVaTen`, `ngaySinh`, `matKhau`, `gioiTinh`, `sdt`, `vaiTro`, `email`, `anhDaiDien`) VALUES
('admin', 'Quản Trị Viên', '1990-01-01', 'hashed_password', 1, '0909123456', 1, 'admin@pixelshop.com', 'admin.jpg'),
('user1', 'Nguyễn Văn A', '1995-02-25', 'hashed_password', 1, '0978456789', 2, 'user1@example.com', 'user1.jpg'),
('user2', 'Trần Thị B', '1993-03-15', 'hashed_password', 2, '0934123456', 2, 'user2@example.com', 'user2.jpg');

-- 4. Bảng `danhmuc`
INSERT INTO `danhmuc` (`tenDanhMuc`, `idDanhMucCha`) VALUES
('Laptop', NULL),
('Điện thoại', NULL),
('Máy tính bảng', NULL),
('Tai nghe', NULL),
('Phụ kiện công nghệ', NULL);

-- 5. Bảng `khuyenmai`
INSERT INTO `khuyenmai` (`phanTram`, `ngayBatDau`, `ngayKetThuc`) VALUES
(10, '2024-12-01 00:00:00', '2024-12-15 23:59:59'),
(20, '2024-12-05 00:00:00', '2024-12-20 23:59:59');

-- 6. Bảng `hoadon`
INSERT INTO `hoadon` (`idNguoiDung`, `idDiaChi`, `tongSoTien`, `trangThai`, `phuongThucThanhToan`, `ngayDat`, `nhanVienXacNhan`, `soLan`) VALUES
(2, 1, 20000000, 1, 2, '2024-12-05 09:00:00', NULL, 0),
(3, 2, 30000000, 1, 1, '2024-12-06 14:00:00', 1, 0),
(4, 3, 6000000, 0, 2, '2024-12-07 16:30:00', NULL, 0);

-- 7. Bảng `danhgia`
INSERT INTO `danhgia` (`idNguoiDung`, `idSanPham`, `noiDung`, `soSao`, `ngayGio`) VALUES  
(1, 1, 'Thiết kế đẹp, rất hài lòng với sản phẩm.', 5, '2024-12-06 08:15:00'),  
(2, 2, 'Hiệu suất ổn định, màu sắc màn hình rất sống động.', 4, '2024-12-07 10:20:00'),  
(3, 3, 'Chất lượng âm thanh tốt, thao tác đơn giản.', 5, '2024-12-08 15:45:00');  

-- 8. Bảng `giohang`
INSERT INTO `giohang` (`idNguoiDung`, `idSanPham`, `soLuong`) VALUES
(2, 1, 1),
(3, 2, 1),
(4, 3, 2);

-- 9. Bảng `diachi`
INSERT INTO `diachi` (`idNguoiDung`, `diaChi`, `sdt`, `note`, `loaiDiaChi`, `macDinh`) VALUES
(2, '123 Đường ABC, Quận 1, TP.HCM', '0912345678', 'Giao trong giờ hành chính', 'Nhà riêng', 1),
(3, '456 Đường DEF, Quận 2, TP.HCM', '0923456789', 'Giao hàng buổi tối', 'Văn phòng', 1),
(4, '789 Đường GHI, Quận 3, TP.HCM', '0934567890', 'Giao nhanh trong ngày', 'Nhà riêng', 1);

INSERT INTO `thongsosanpham` (
  `idSanPham`, `heDieuHanh`, `CPU`, `RAM`, `RAMToiDa`, `loaiRAM`, `busRAM`, 
  `soLuongKheRAM`, `dungLuongROM`, `loaiROM`, `soKheROM`, `GPU`, `cameraTruoc`, 
  `cameraSau`, `pin`, `sac`, `loa`, `SIM`, `manHinh`, `kichThuoc`, `trongLuong`, 
  `mauSac`, `congKetNoi`
) VALUES (
  NULL, 'Windows 10', 'Intel Core i7', 16, 32, 'LPDDR4X', 3733, 2, 512, 'SSD', 1, 
  'Intel Iris Xe', '720p HD', '13 MP', '55 Wh', '65W USB-C', 'Dual Speakers', 
  'Nano SIM', '13.4 inch FHD+', '302.9 x 199.4 x 14.8 mm', 1.26, 'Platinum Silver', 'Thunderbolt 3'
);

INSERT INTO `sanpham` (`idSanPham`, `tenSanPham`, `moTa`, `gia`, `soLuong`, `ngayThem`, `img`, `soLuotXem`, `loai`, `hang`, `noiBat`, `trangThai`, `slug`, `idDanhMuc`, `idKhuyenMai`)
VALUES
  (NULL, 'Laptop Dell XPS 13', 'Laptop Dell XPS 13 - Mỏng nhẹ, cấu hình cao', 25000000, 10, NOW(), 'dell_xps13.jpg', 50, 1, 'Dell', 1, 1, 'laptop-dell-xps-13', 1, NULL),
  (NULL, 'Laptop HP Spectre x360', 'Laptop HP Spectre x360 - Màn hình cảm ứng, 2-in-1', 30000000, 15, NOW(), 'hp_spectre_x360.jpg', 60, 1, 'HP', 1, 1, 'laptop-hp-spectre-x360', 1, NULL),
  (NULL, 'Laptop ASUS ZenBook UX425', 'Laptop ASUS ZenBook UX425 - Mỏng nhẹ, màn hình 14 inch', 22000000, 8, NOW(), 'asus_zenbook_ux425.jpg', 40, 1, 'ASUS', 1, 1, 'laptop-asus-zenbook-ux425', 1, NULL),
  (NULL, 'Laptop Lenovo ThinkPad X1 Carbon', 'Laptop Lenovo ThinkPad X1 Carbon - Cấu hình mạnh mẽ, độ bền cao', 35000000, 5, NOW(), 'lenovo_thinkpad_x1_carbon.jpg', 45, 1, 'Lenovo', 1, 1, 'laptop-lenovo-thinkpad-x1-carbon', 1, NULL);

 
 
-- Thêm thông tin của Laptop HP Spectre x360
INSERT INTO `thongsosanpham` (`idSanPham`, `heDieuHanh`, `CPU`, `RAM`, `RAMToiDa`, `loaiRAM`, `busRAM`, `soLuongKheRAM`, `dungLuongROM`, `loaiROM`, `soKheROM`, `GPU`, `cameraTruoc`, `cameraSau`, `pin`, `sac`, `loa`, `SIM`, `manHinh`, `kichThuoc`, `trongLuong`, `mauSac`, `congKetNoi`)
VALUES
  (4, 'Windows 10 Home', 'Intel Core i7-1165G7', 16, 32, 'LPDDR4x', 4266, 1, 512, 'SSD', 1, 'Intel Iris Xe Graphics', '1080p FHD IR', '13 MP', '66 WHr', 'USB-C Power Adapter', 'Bang & Olufsen, quad speakers', NULL, '13.3 inch OLED FHD', '305 x 207 x 14.9 mm', 1.3, 'Bạc ánh kim', 'Thunderbolt 4, USB-C, MicroSD, Jack 3.5mm');

-- Thêm thông tin của Laptop ASUS ZenBook UX425
INSERT INTO `thongsosanpham` (`idSanPham`, `heDieuHanh`, `CPU`, `RAM`, `RAMToiDa`, `loaiRAM`, `busRAM`, `soLuongKheRAM`, `dungLuongROM`, `loaiROM`, `soKheROM`, `GPU`, `cameraTruoc`, `cameraSau`, `pin`, `sac`, `loa`, `SIM`, `manHinh`, `kichThuoc`, `trongLuong`, `mauSac`, `congKetNoi`)
VALUES
  (5, 'Windows 10 Home', 'Intel Core i7-1165G7', 16, 32, 'LPDDR4x', 4266, 1, 512, 'SSD', 1, 'Intel Iris Xe Graphics', 'HD webcam', '13 MP', '67 WHr', 'USB-C Power Adapter', 'Harman Kardon, stereo speakers', NULL, '14 inch FHD', '321 x 208 x 13.9 mm', 1.1, 'Xanh lá', 'USB-C, Thunderbolt 4, HDMI, MicroSD, Jack 3.5mm');

-- Thêm thông tin của Laptop Lenovo ThinkPad X1 Carbon
INSERT INTO `thongsosanpham` (`idSanPham`, `heDieuHanh`, `CPU`, `RAM`, `RAMToiDa`, `loaiRAM`, `busRAM`, `soLuongKheRAM`, `dungLuongROM`, `loaiROM`, `soKheROM`, `GPU`, `cameraTruoc`, `cameraSau`, `pin`, `sac`, `loa`, `SIM`, `manHinh`, `kichThuoc`, `trongLuong`, `mauSac`, `congKetNoi`)
VALUES
  (6, 'Windows 10 Pro', 'Intel Core i7-1165G7', 16, 32, 'LPDDR4x', 4266, 1, 512, 'SSD', 1, 'Intel Iris Xe Graphics', '720p HD', '13 MP', '51 WHr', 'USB-C Power Adapter', 'Dolby Atmos Speaker System', NULL, '14 inch FHD', '323 x 214 x 16 mm', 1.2, 'Đen', 'USB-C, Thunderbolt 4, HDMI, MicroSD, Jack 3.5mm');
