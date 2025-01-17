use pixel_shop;
-- Bai viet
INSERT INTO `baiviet` (`tieuDe`, `slug`, `hinhAnh`, `noiDung`, `ngayDang`, `trangThai`) VALUES
('Khuyến Mãi Giảm 20%', 'khuyen-mai-giam-20', 'khuyen-mai-giam-20%.png', 'Nhận ngay ưu đãi giảm giá 20% cho tất cả sản phẩm. Đừng bỏ lỡ!', NOW(), 1);
INSERT INTO `baiviet` (`tieuDe`, `slug`, `hinhAnh`, `noiDung`, `ngayDang`, `trangThai`) VALUES
('Khuyến Mãi Đặc Biệt', 'khuyen-mai', 'khuyen-mai.png', 'Đừng bỏ lỡ cơ hội nhận ưu đãi giảm giá 20%! Chương trình có hạn.', NOW(), 1),
('Khuyến Mãi Mùa Hè', 'khuyen-mai-mua-he', 'khuyen-mai-mua-he.png', 'Giảm giá đến 30% cho sản phẩm mùa hè.', NOW(), 1);
INSERT INTO `baiviet` (`tieuDe`, `slug`, `hinhAnh`, `noiDung`, `ngayDang`, `trangThai`) VALUES
('Quảng Cáo Đặc Biệt', 'quang-cao', 'quang-cao.png', 'Khám phá các chương trình quảng cáo hấp dẫn với nhiều ưu đãi!', NOW(), 1);

-- Lien he
INSERT INTO `lienhe` (`hoVaTen`, `email`, `sdt`, `noiDung`, `thoiGian`, `trangThai`) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0987654321', 'Tôi muốn tìm hiểu thêm về dịch vụ của bạn.', '2025-01-12 09:00:00', 1),
('Trần Thị B', 'tranthib@example.com', '0976543210', 'Làm thế nào để đăng ký tài khoản?', '2025-01-11 14:30:00', 0),
('Lê Minh C', 'leminhc@example.com', '0912345678', 'Tôi gặp vấn đề với đơn hàng gần đây.', '2025-01-10 16:45:00', 1),
('Phạm Văn D', 'phamvand@example.com', '0923456789', 'Bạn có thể gửi thêm thông tin khuyến mãi không?', '2025-01-09 11:15:00', 0),
('Đỗ Thị E', 'dothie@example.com', '0934567890', 'Tôi cần hỗ trợ gấp, vui lòng liên hệ lại.', '2025-01-08 08:50:00', 1);

-- Thong tin
INSERT INTO `thongtin` (`dichVu`, `facebook`, `instagram`, `youtube`, `tiktok`) VALUES
('Dịch vụ chăm sóc khách hàng 24/7', 'https://facebook.com/samplepage', 'https://instagram.com/samplepage', 'https://youtube.com/samplechannel', 'https://tiktok.com/@samplepage'),
('Dịch vụ tư vấn trực tuyến', 'https://facebook.com/consultingpage', 'https://instagram.com/consultingpage', 'https://youtube.com/consultingchannel', 'https://tiktok.com/@consultingpage'),
('Dịch vụ bán hàng trực tuyến', 'https://facebook.com/onlinepage', 'https://instagram.com/onlinepage', 'https://youtube.com/onlinechannel', 'https://tiktok.com/@onlinepage');

-- nhacungcap
INSERT INTO nhacungcap (idNhaCungCap, tenNhaCungCap, tenLienHe, diaChi, soDienThoai, email)
VALUES 
(1, 'Nhà Cung Cấp A', 'Nguyễn Văn A', 'Địa chỉ A', '0123456789', 'nhaCungCapA@example.com'),
(2, 'Nhà Cung Cấp B', 'Trần Thị B', 'Địa chỉ B', '0987654321', 'nhaCungCapB@example.com'),
(3, 'Nhà Cung Cấp C', 'Lê Văn C', 'Địa chỉ C', '0112233445', 'nhaCungCapC@example.com'),
(4, 'Nhà Cung Cấp D', 'Phạm Thị D', 'Địa chỉ D', '0778899001', 'nhaCungCapD@example.com'),
(5, 'Nhà Cung Cấp E', 'Nguyễn Văn E', 'Địa chỉ E', '0667788990', 'nhaCungCapE@example.com');

INSERT INTO lohang (idLoHang, idNhaCungCap, date)
VALUES 
(1, 1, CURRENT_DATE),
(2, 1, CURRENT_DATE),
(3, 1, CURRENT_DATE),
(4, 1, CURRENT_DATE),
(5, 1, CURRENT_DATE);


-- thongsosanpham
INSERT INTO `thongsosanpham` (`idSanPham`, `heDieuHanh`, `CPU`, `RAM`, `RAMToiDa`, `loaiRAM`, `busRAM`, `soLuongKheRAM`, `dungLuongROM`, `loaiROM`, `soKheROM`, `GPU`, `cameraTruoc`, `cameraSau`, `pin`, `sac`, `loa`, `SIM`, `manHinh`, `kichThuoc`, `trongLuong`, `mauSac`, `congKetNoi`) VALUES
(1, 'iOS', 'A15 Bionic', 6, 6, 'LPDDR4X', 0, 2, 128, 'NVMe', 1, 'Apple GPU', '12MP', '12MP', '3100mAh', '20W', 'Stereo', 'Dual SIM', '6.1 inch', '146.7 x 71.5 x 7.8 mm', 164, 'Blue', 'Lightning'),
(2, 'Android', 'Exynos 2200', 8, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Mali-G78', '10MP', '50MP', '4000mAh', '25W', 'Stereo', 'Dual SIM', '6.8 inch', '151.7 x 71.2 x 8.4 mm', 169, 'Phantom Black', 'USB Type-C'),
(3, 'Android', 'Snapdragon 8 Gen 2', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Adreno 730', '32MP', '50MP', '4600mAh', '120W', 'Stereo', 'Dual SIM', '6.73 inch', '164.9 x 75.1 x 8.9 mm', 205, 'Black', 'USB Type-C'),
(4, 'macOS', 'Apple M2', 8, 16, 'LPDDR5', 0, 2, 512, 'SSD', 2, 'M2 GPU', '720p', '1080p', '5000mAh', '30W', 'Stereo', 'Dual SIM', '13.3 inch', '304.1 x 212.5 x 13.3 mm', 1, 'Space Gray', 'USB Type-C'),
(5, 'Windows', 'Intel Core i7-1185G7', 8, 16, 'LPDDR4X', 2666, 2, 1, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '52Wh', '65W', 'Stereo', 'Dual SIM', '13.4 inch', '296.7 x 199.7 x 14.9 mm', 1, 'Platinum', 'USB Type-C'),
(6, 'Windows', 'Intel Core i7-1165G7', 16, 32, 'LPDDR4X', 2933, 2, 1, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '52Wh', '65W', 'Stereo', 'Dual SIM', '13.3 inch', '307.5 x 206.2 x 14.8 mm', 1, 'Silver', 'USB Type-C'),
(7, 'Android', 'Snapdragon 8+ Gen 1', 16, 16, 'LPDDR5', 3200, 2, 512, 'UFS 3.1', 2, 'Adreno 730', '32MP', '64MP', '5000mAh', '67W', 'Stereo', 'Dual SIM', '6.78 inch', '168.8 x 77.3 x 8.6 mm', 210, 'Phantom Black', 'USB Type-C'),
(8, 'Windows', 'Intel Core i5-1135G7', 8, 16, 'LPDDR4X', 2400, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '50Wh', '45W', 'Stereo', 'Dual SIM', '14 inch', '317.9 x 211.2 x 16.5 mm', 1, 'Black', 'USB Type-C'),
(9, 'Android', 'Snapdragon 8 Gen 2', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Adreno 730', '50MP', '64MP', '5000mAh', '80W', 'Stereo', 'Dual SIM', '6.74 inch', '163.3 x 75.9 x 8.6 mm', 195, 'Phantom Blue', 'USB Type-C'),
(10, 'Windows', 'Intel Core i7-11800H', 16, 32, 'LPDDR4X', 3200, 2, 1, 'NVMe SSD', 2, 'NVIDIA RTX 3060', '720p', '1080p', '60Wh', '150W', 'Stereo', 'Dual SIM', '15.6 inch', '359 x 248 x 19.9 mm', 2, 'Black', 'USB Type-C'),
(11, 'Android', 'Snapdragon 8 Gen 2', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Adreno 730', '50MP', '64MP', '5000mAh', '80W', 'Stereo', 'Dual SIM', '6.8 inch', '164.3 x 75.7 x 8.9 mm', 190, 'Moonlight Silver', 'USB Type-C'),
(12, 'Android', 'Dimensity 9200', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Mali-G77', '50MP', '50MP', '5000mAh', '67W', 'Stereo', 'Dual SIM', '6.7 inch', '163.8 x 75.9 x 8.5 mm', 195, 'Cosmic Black', 'USB Type-C'),
(13, 'Android', 'Google Tensor G2', 8, 8, 'LPDDR5', 0, 2, 128, 'UFS 3.1', 2, 'Mali-G710', '12MP', '50MP', '4600mAh', '30W', 'Stereo', 'Dual SIM', '6.7 inch', '155.6 x 73.2 x 8.9 mm', 198, 'Obsidian', 'USB Type-C'),
(14, 'Windows', 'Intel Core i7-1360P', 8, 16, 'LPDDR4X', 2666, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '60Wh', '65W', 'Stereo', 'Dual SIM', '15.6 inch', '355.3 x 233.6 x 15.3 mm', 2, 'Silver', 'USB Type-C'),
(15, 'Windows', 'Intel Core i5-1135G7', 8, 16, 'LPDDR4X', 2933, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '50Wh', '45W', 'Stereo', 'Dual SIM', '14 inch', '315.8 x 218.2 x 15.6 mm', 1, 'Black', 'USB Type-C'),
(16, 'Windows', 'Intel Core i5-1135G7', 8, 16, 'LPDDR4X', 2400, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '40Wh', '45W', 'Stereo', 'Dual SIM', '13.5 inch', '308 x 208 x 14.9 mm', 1, 'Silver', 'USB Type-C'),
(17, 'Windows', 'Intel Core i3-1115G4', 8, 8, 'LPDDR4X', 2133, 2, 512, 'NVMe SSD', 2, 'Intel UHD', '720p', '720p', '45Wh', '45W', 'Mono', 'Dual SIM', '15.6 inch', '357 x 230 x 19.9 mm', 2, 'Black', 'USB Type-C'),
(18, 'Android', 'Snapdragon 695', 6, 6, 'LPDDR4X', 1866, 2, 128, 'UFS 2.2', 1, 'Adreno 619', '13MP', '50MP', '5000mAh', '18W', 'Stereo', 'Dual SIM', '6.6 inch', '164.3 x 75.7 x 8.8 mm', 180, 'Graphite', 'USB Type-C'),
(19, 'Android', 'Snapdragon 778G', 6, 12, 'LPDDR4X', 2400, 2, 128, 'UFS 2.1', 1, 'Adreno 642L', '16MP', '64MP', '4500mAh', '33W', 'Stereo', 'Dual SIM', '6.55 inch', '159.2 x 73.5 x 8.8 mm', 190, 'Nebula Blue', 'USB Type-C'),
(20, 'Windows', 'Intel Core i7-10750H', 16, 16, 'DDR4', 2933, 2, 512, 'NVMe SSD', 2, 'NVIDIA GTX 1650', '720p', '1080p', '50Wh', '120W', 'Stereo', 'Dual SIM', '15.6 inch', '359.8 x 235.6 x 24.9 mm', 2, 'Black', 'USB Type-C');



-- Hoa don
INSERT INTO `hoadon` (`idHoaDon`, `idNguoiDung`, `idDiaChi`, `tongSoTien`, `trangThai`, `phuongThucThanhToan`, `ngayDat`, `nhanVienXacNhan`, `ngayXacNhan`, `soLan`, `thoiGianKhoa`) VALUES
(1, 1, 1, 25000000, 2, 0, '2025-01-05 00:00:00', 1, '2025-01-06 00:00:00', 1, NULL),
(2, 2, 2, 18000000, 2, 0, '2025-01-06 00:00:00', 2, '2025-01-06 00:00:00', 1, NULL),
(3, 3, 3, 22000000, 2, 0, '2025-01-07 00:00:00', 3, '2025-01-07 00:00:00', 1, NULL),
(4, 4, 4, 19000000, 2, 0, '2025-01-08 00:00:00', 4, '2025-01-08 00:00:00', 1, NULL),
(5, 5, 5, 30000000, 2, 0, '2025-01-09 00:00:00', 1, '2025-01-09 00:00:00', 1, NULL),
(6, 6, 6, 15000000, 2, 0, '2025-01-10 00:00:00', 2, '2025-01-10 00:00:00', 1, NULL),
(7, 7, 7, 25000000, 2, 0, '2025-01-11 00:00:00', 3, '2025-01-11 00:00:00', 1, NULL),
(8, 8, 8, 28000000, 2, 0, '2025-01-12 00:00:00', 4, '2025-01-12 00:00:00', 1, NULL),
(9, 9, 9, 26000000, 2, 0, '2025-01-13 00:00:00', 1, '2025-01-13 00:00:00', 1, NULL),
(10, 10, 10, 24000000, 2, 0, '2025-01-14 00:00:00', 2, '2025-01-14 00:00:00', 1, NULL),
(11, 1, 11, 20000000, 2, 0, '2025-01-15 00:00:00', 3, '2025-01-15 00:00:00', 1, NULL),
(12, 2, 12, 27000000, 2, 0, '2025-01-16 00:00:00', 4, '2025-01-16 00:00:00', 1, NULL),
(13, 3, 13, 23000000, 2, 0, '2025-01-17 00:00:00', 1, '2025-01-17 00:00:00', 1, NULL),
(14, 4, 14, 21000000, 2, 0, '2025-01-18 00:00:00', 2, '2025-01-18 00:00:00', 1, NULL),
(15, 5, 15, 30000000, 2, 0, '2025-01-19 00:00:00', 3, '2025-01-19 00:00:00', 1, NULL),
(16, 3, 8, 400000, 0, 0, '2025-01-06 10:00:00', 7, '2025-01-07 12:00:00', 0, NULL),
(17, 10, 2, 3000000, 0, 0, '2025-01-05 18:00:00', 5, '2025-01-06 19:00:00', 1, NULL),
(18, 6, 9, 800000, 0, 0, '2025-01-10 07:00:00', 2, '2025-01-11 07:30:00', 0, NULL),
(19, 8, 6, 950000, 0, 0, '2025-01-11 13:00:00', 10, '2025-01-12 14:00:00', 2, NULL),
(20, 1, 10, 150000, 0, 0, '2025-01-08 20:00:00', 6, '2025-01-09 21:00:00', 0, NULL),
(21, 2, 3, 1100000, 0, 0, '2025-01-09 09:00:00', 4, '2025-01-10 10:00:00', 1, NULL),
(22, 5, 7, 1900000, 0, 0, '2025-01-13 11:00:00', 8, '2025-01-14 12:00:00', 0, NULL),
(23, 9, 4, 600000, 0, 0, '2025-01-12 17:00:00', 1, '2025-01-13 18:00:00', 2, NULL),
(24, 7, 1, 450000, 0, 0, '2025-01-06 08:00:00', 3, '2025-01-07 09:00:00', 1, NULL),
(25, 4, 5, 500000, 0, 0, '2025-01-07 14:00:00', 9, '2025-01-08 15:00:00', 0, NULL),
(26, 3, 8, 850000, 0, 0, '2025-01-10 11:00:00', 7, '2025-01-11 12:00:00', 0, NULL),
(27, 10, 2, 1400000, 0, 0, '2025-01-05 10:00:00', 5, '2025-01-06 11:00:00', 1, NULL),
(28, 6, 9, 950000, 0, 0, '2025-01-09 18:00:00', 2, '2025-01-10 19:00:00', 0, NULL);


-- nguoidung
INSERT INTO `nguoidung` (`idNguoiDung`, `tenDangNhap`, `hoVaTen`, `ngaySinh`, `matKhau`, `gioiTinh`, `sdt`, `vaiTro`, `email`, `anhDaiDien`) VALUES
(1, 'user1', 'Nguyen Van A', '1990-01-01', 'password1', 1, '0123456789', 3, 'user1@example.com', 'anhDaiDien.jpg'),
(2, 'user2', 'Tran Thi B', '1992-02-02', 'password2', 2, '0987654321', 3, 'user2@example.com', 'anhDaiDien.jpg'),
(3, 'admin1', 'Le Van C', '1988-03-03', 'password3', 1, '0912345678', 1, 'admin1@example.com', 'anhDaiDien.jpg'),
(4, 'mod1', 'Pham Thi D', '1994-04-04', 'password4', 2, '0943216789', 2, 'mod1@example.com', 'anhDaiDien.jpg'),
(5, 'user3', 'Hoang Van E', '1996-05-05', 'password5', 1, '0934567890', 3, 'user3@example.com', 'anhDaiDien.jpg'),
(6, 'user4', 'Vu Thi F', '1998-06-06', 'password6', 2, '0923456781', 3, 'user4@example.com', 'anhDaiDien.jpg'),
(7, 'user5', 'Dang Van G', '1995-07-07', 'password7', 1, '0909876543', 3, 'user5@example.com', 'anhDaiDien.jpg'),
(8, 'user6', 'Ngo Thi H', '1993-08-08', 'password8', 2, '0981122334', 3, 'user6@example.com', 'anhDaiDien.jpg'),
(9, 'user7', 'Do Van I', '2000-09-09', 'password9', 1, '0911223344', 3, 'user7@example.com', 'anhDaiDien.jpg'),
(10, 'mod2', 'Nguyen Thi K', '1991-10-10', 'password10', 2, '0976543210', 2, 'mod2@example.com', 'anhDaiDien.jpg'),
(11, 'logn123', 'lognđâsd', '2025-01-01', '123', 1, '0306221140', 3, 'logn021004@gmail.com', ''),
(12, 'logn321', 'loong', '2025-01-20', '123', 1, '0', 3, 'wmfunnygame@gmail.com', 'anhDaiDienDefault.jpg');

INSERT INTO `giohang` (`idNguoiDung`, `idSanPham`, `soLuong`) VALUES
(2, 4, 1),
(2, 5, 2),
(3, 6, 1),
(3, 7, 4),
(4, 8, 2),
(4, 9, 1),
(5, 10, 1),
(5, 11, 3),
(6, 12, 2),
(6, 13, 1),
(7, 14, 2),

-- sanpham
INSERT INTO `sanpham` (`idSanPham`, `tenSanPham`, `moTa`, `gia`, `soLuong`, `ngayThem`, `img`, `soLuotXem`, `loai`, `hang`, `noiBat`, `trangThai`, `slug`, `idDanhMuc`, `idKhuyenMai`) VALUES
(1, 'iPhone 14', 'Điện thoại cao cấp của Apple', 22000000, 50, '2024-12-01 00:00:00', 'iPhone-14.jpg', 100, 1, 'Apple', 1, 0, 'iphone-14', 1, 11),
(2, 'Samsung Galaxy S23', 'Điện thoại flagship của Samsung', 21000000, 40, '2024-12-05 00:00:00', 'Samsung-galaxy-s23.jpg', 80, 1, 'Samsung', 1, 0, 'samsung-galaxy-s23', 1, 12),
(3, 'Xiaomi 13 Pro', 'Điện thoại cấu hình mạnh mẽ của Xiaomi', 18000000, 60, '2024-12-10 00:00:00', 'Xiaomi-13-pro', 90, 1, 'Xiaomi', 0, 0, 'xiaomi-13-pro', 1, 13),
(4, 'MacBook Air M2', 'Laptop siêu mỏng với chip M2', 30000000, 30, '2024-12-15 00:00:00', 'Macbook-air-2.jpg', 150, 2, 'Apple', 1, 0, 'macbook-air-m2', 2, 14),
(5, 'Dell XPS 13', 'Laptop mỏng nhẹ cao cấp', 28000000, 25, '2024-12-20 00:00:00', 'Dell-xps-13.jpg', 120, 2, 'Dell', 1, 0, 'dell-xps-13', 2, 15),
(6, 'HP Spectre x360', 'Laptop đa năng có màn hình cảm ứng', 25000000, 20, '2025-01-01 00:00:00', 'HP-Spectre-x360.jpg', 50, 2, 'HP', 0, 0, 'hp-spectre-x360', 2, 16),
(7, 'Asus ROG Phone 7', 'Điện thoại gaming hiệu năng cao', 25000000, 15, '2025-01-05 00:00:00', 'Asus-rog-7.jpg', 200, 1, 'Asus', 1, 0, 'asus-rog-phone-7', 1, 17),
(8, 'Lenovo ThinkPad X1', 'Laptop bền bỉ dành cho doanh nhân', 27000000, 10, '2025-01-06 00:00:00', 'Lenovo-thinkpad-x1.jpg', 110, 2, 'Lenovo', 0, 0, 'lenovo-thinkpad-x1', 2, 18),
(9, 'Realme GT Neo 5', 'Điện thoại giá tốt với cấu hình mạnh', 12000000, 100, '2025-01-07 00:00:00', 'Realme-gt-neo-5.jpg', 300, 1, 'Realme', 0, 0, 'realme-gt-neo-5', 1, 19),
(10, 'MSI Stealth 15', 'Laptop gaming mạnh mẽ của MSI', 35000000, 5, '2025-01-07 00:00:00', 'Msi-stealth-15.jpg', 250, 2, 'MSI', 1, 0, 'msi-stealth-15', 2, 20),
(11, 'OPPO Find X6', 'Điện thoại camera đỉnh của OPPO', 19000000, 45, '2025-01-08 00:00:00', 'Oppo-find-x6.png', 90, 1, 'OPPO', 1, 0, 'oppo-find-x6', 1, 11),
(12, 'Vivo X90 Pro', 'Điện thoại chụp ảnh chuyên nghiệp', 21000000, 40, '2025-01-08 00:00:00', 'anhDaiDien.jpg', 85, 1, 'Vivo', 0, 0, 'vivo-x90-pro', 1, 12),
(13, 'Google Pixel 8', 'Điện thoại chạy Android gốc', 23000000, 50, '2025-01-09 00:00:00', 'Google-pixel-8', 120, 1, 'Google', 1, 0, 'google-pixel-8', 1, 13),
(14, 'Samsung Galaxy Book 3', 'Laptop cao cấp của Samsung', 32000000, 20, '2025-01-09 00:00:00', 'Samsung-galaxy-book-3.jpg', 100, 2, 'Samsung', 0, 0, 'samsung-galaxy-book-3', 2, 14),
(15, 'Acer Swift 5', 'Laptop mỏng nhẹ với hiệu năng tốt', 24000000, 30, '2025-01-10 00:00:00', 'Acer-swift-5.jpg', 75, 2, 'Acer', 0, 0, 'acer-swift-5', 2, 15),
(16, 'Microsoft Surface Laptop 5', 'Laptop đẹp, phù hợp văn phòng', 26000000, 25, '2025-01-10 00:00:00', 'Microsoft-surface-laptop-5.jpg', 95, 2, 'Microsoft', 1, 0, 'microsoft-surface-laptop-5', 2, 16),
(17, 'Asus Vivobook 15', 'Laptop giá rẻ hiệu năng ổn', 15000000, 100, '2025-01-11 00:00:00', 'Asus-vivo-15.png', 150, 2, 'Asus', 0, 0, 'asus-vivobook-15', 2, 17),
(18, 'Redmi Note 13 Pro', 'Điện thoại giá rẻ cấu hình cao', 12000000, 120, '2025-01-11 00:00:00', 'Redmi-note-13-pro.jpg', 200, 1, 'Xiaomi', 0, 0, 'redmi-note-13-pro', 1, 18),
(19, 'Dell G15 Gaming', 'Laptop gaming giá tốt', 27000000, 15, '2025-01-12 00:00:00', 'Dell-g15-gaming.jpg', 140, 2, 'Dell', 1, 0, 'dell-g15-gaming', 2, 19),
(20, 'HP Omen 16', 'Laptop gaming mạnh mẽ của HP', 32000000, 10, '2025-01-12 00:00:00', 'HP-omen-16.jpg', 180, 2, 'HP', 1, 0, 'hp-omen-16', 2, 20);

-- thongsosanpham
INSERT INTO `thongsosanpham` (`idSanPham`, `heDieuHanh`, `CPU`, `RAM`, `RAMToiDa`, `loaiRAM`, `busRAM`, `soLuongKheRAM`, `dungLuongROM`, `loaiROM`, `soKheROM`, `GPU`, `cameraTruoc`, `cameraSau`, `pin`, `sac`, `loa`, `SIM`, `manHinh`, `kichThuoc`, `trongLuong`, `mauSac`, `congKetNoi`) VALUES
(1, 'iOS', 'A15 Bionic', 6, 6, 'LPDDR4X', 0, 2, 128, 'NVMe', 1, 'Apple GPU', '12MP', '12MP', '3100mAh', '20W', 'Stereo', 'Dual SIM', '6.1 inch', '146.7 x 71.5 x 7.8 mm', 164, 'Blue', 'Lightning'),
(2, 'Android', 'Exynos 2200', 8, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Mali-G78', '10MP', '50MP', '4000mAh', '25W', 'Stereo', 'Dual SIM', '6.8 inch', '151.7 x 71.2 x 8.4 mm', 169, 'Phantom Black', 'USB Type-C'),
(3, 'Android', 'Snapdragon 8 Gen 2', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Adreno 730', '32MP', '50MP', '4600mAh', '120W', 'Stereo', 'Dual SIM', '6.73 inch', '164.9 x 75.1 x 8.9 mm', 205, 'Black', 'USB Type-C'),
(4, 'macOS', 'Apple M2', 8, 16, 'LPDDR5', 0, 2, 512, 'SSD', 2, 'M2 GPU', '720p', '1080p', '5000mAh', '30W', 'Stereo', 'Dual SIM', '13.3 inch', '304.1 x 212.5 x 13.3 mm', 1, 'Space Gray', 'USB Type-C'),
(5, 'Windows', 'Intel Core i7-1185G7', 8, 16, 'LPDDR4X', 2666, 2, 1, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '52Wh', '65W', 'Stereo', 'Dual SIM', '13.4 inch', '296.7 x 199.7 x 14.9 mm', 1, 'Platinum', 'USB Type-C'),
(6, 'Windows', 'Intel Core i7-1165G7', 16, 32, 'LPDDR4X', 2933, 2, 1, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '52Wh', '65W', 'Stereo', 'Dual SIM', '13.3 inch', '307.5 x 206.2 x 14.8 mm', 1, 'Silver', 'USB Type-C'),
(7, 'Android', 'Snapdragon 8+ Gen 1', 16, 16, 'LPDDR5', 3200, 2, 512, 'UFS 3.1', 2, 'Adreno 730', '32MP', '64MP', '5000mAh', '67W', 'Stereo', 'Dual SIM', '6.78 inch', '168.8 x 77.3 x 8.6 mm', 210, 'Phantom Black', 'USB Type-C'),
(8, 'Windows', 'Intel Core i5-1135G7', 8, 16, 'LPDDR4X', 2400, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '50Wh', '45W', 'Stereo', 'Dual SIM', '14 inch', '317.9 x 211.2 x 16.5 mm', 1, 'Black', 'USB Type-C'),
(9, 'Android', 'Snapdragon 8 Gen 2', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Adreno 730', '50MP', '64MP', '5000mAh', '80W', 'Stereo', 'Dual SIM', '6.74 inch', '163.3 x 75.9 x 8.6 mm', 195, 'Phantom Blue', 'USB Type-C'),
(10, 'Windows', 'Intel Core i7-11800H', 16, 32, 'LPDDR4X', 3200, 2, 1, 'NVMe SSD', 2, 'NVIDIA RTX 3060', '720p', '1080p', '60Wh', '150W', 'Stereo', 'Dual SIM', '15.6 inch', '359 x 248 x 19.9 mm', 2, 'Black', 'USB Type-C'),
(11, 'Android', 'Snapdragon 8 Gen 2', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Adreno 730', '50MP', '64MP', '5000mAh', '80W', 'Stereo', 'Dual SIM', '6.8 inch', '164.3 x 75.7 x 8.9 mm', 190, 'Moonlight Silver', 'USB Type-C'),
(12, 'Android', 'Dimensity 9200', 12, 12, 'LPDDR5', 3200, 2, 256, 'UFS 3.1', 2, 'Mali-G77', '50MP', '50MP', '5000mAh', '67W', 'Stereo', 'Dual SIM', '6.7 inch', '163.8 x 75.9 x 8.5 mm', 195, 'Cosmic Black', 'USB Type-C'),
(13, 'Android', 'Google Tensor G2', 8, 8, 'LPDDR5', 0, 2, 128, 'UFS 3.1', 2, 'Mali-G710', '12MP', '50MP', '4600mAh', '30W', 'Stereo', 'Dual SIM', '6.7 inch', '155.6 x 73.2 x 8.9 mm', 198, 'Obsidian', 'USB Type-C'),
(14, 'Windows', 'Intel Core i7-1360P', 8, 16, 'LPDDR4X', 2666, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '60Wh', '65W', 'Stereo', 'Dual SIM', '15.6 inch', '355.3 x 233.6 x 15.3 mm', 2, 'Silver', 'USB Type-C'),
(15, 'Windows', 'Intel Core i5-1135G7', 8, 16, 'LPDDR4X', 2933, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '50Wh', '45W', 'Stereo', 'Dual SIM', '14 inch', '315.8 x 218.2 x 15.6 mm', 1, 'Black', 'USB Type-C'),
(16, 'Windows', 'Intel Core i5-1135G7', 8, 16, 'LPDDR4X', 2400, 2, 512, 'NVMe SSD', 2, 'Intel Iris Xe', '720p', '1080p', '40Wh', '45W', 'Stereo', 'Dual SIM', '13.5 inch', '308 x 208 x 14.9 mm', 1, 'Silver', 'USB Type-C'),
(17, 'Windows', 'Intel Core i3-1115G4', 8, 8, 'LPDDR4X', 2133, 2, 512, 'NVMe SSD', 2, 'Intel UHD', '720p', '720p', '45Wh', '45W', 'Mono', 'Dual SIM', '15.6 inch', '357 x 230 x 19.9 mm', 2, 'Black', 'USB Type-C'),
(18, 'Android', 'Snapdragon 695', 6, 6, 'LPDDR4X', 1866, 2, 128, 'UFS 2.2', 1, 'Adreno 619', '13MP', '50MP', '5000mAh', '18W', 'Stereo', 'Dual SIM', '6.6 inch', '164.3 x 75.7 x 8.8 mm', 180, 'Graphite', 'USB Type-C'),
(19, 'Android', 'Snapdragon 778G', 6, 12, 'LPDDR4X', 2400, 2, 128, 'UFS 2.1', 1, 'Adreno 642L', '16MP', '64MP', '4500mAh', '33W', 'Stereo', 'Dual SIM', '6.55 inch', '159.2 x 73.5 x 8.8 mm', 190, 'Nebula Blue', 'USB Type-C'),
(20, 'Windows', 'Intel Core i7-10750H', 16, 16, 'DDR4', 2933, 2, 512, 'NVMe SSD', 2, 'NVIDIA GTX 1650', '720p', '1080p', '50Wh', '120W', 'Stereo', 'Dual SIM', '15.6 inch', '359.8 x 235.6 x 24.9 mm', 2, 'Black', 'USB Type-C');


-- danhgia
INSERT INTO danhgia (idNguoiDung, idSanPham, noiDung, soSao, ngayGio)
VALUES 
(1, 1, 'Sản phẩm rất tốt!', 5, NOW()),
(1, 2, 'Không như mong đợi.', 3, NOW()),
(2, 1, 'Tôi rất hài lòng.', 4, NOW()),
(2, 3, 'Chất lượng ổn.', 4, NOW()),
(3, 4, 'Sản phẩm tuyệt vời!', 5, NOW()),
(3, 5, 'Tôi sẽ mua lại.', 5, NOW()),
(4, 6, 'Không tệ.', 3, NOW()),
(4, 7, 'Không đáng giá.', 2, NOW()),
(5, 8, 'Thật sự rất xứng đáng.', 5, NOW()),
(5, 9, 'Sản phẩm tốt.', 4, NOW()),
(6, 10, 'Chưa đạt yêu cầu.', 2, NOW()),
(6, 11, 'Giá quá cao.', 3, NOW()),
(7, 12, 'Tôi không bao giờ mua lại.', 1, NOW()),
(8, 13, 'Rất hài lòng với sản phẩm.', 5, NOW()),
(9, 14, 'Sản phẩm bình thường.', 3, NOW()),
(10, 15, 'Tôi không thích.', 2, NOW()),
(11, 16, 'Sản phẩm rất tốt!', 5, NOW()),
(12, 17, 'Tôi sẽ giới thiệu cho bạn bè.', 4, NOW());

-- chitethoadon
INSERT INTO `chitiethoadon` (`idHoaDon`, `idSanPham`, `soLuong`, `tongTien`) VALUES
(1, 1, 2, 50000000),
(1, 2, 1, 10000000),
(1, 3, 1, 25000000),
(1, 4, 3, 54000000),
(1, 5, 2, 60000000),
(1, 6, 1, 15000000),
(2, 4, 2, 36000000),
(2, 5, 1, 30000000),
(2, 6, 2, 30000000),
(2, 7, 3, 60000000),
(2, 8, 1, 25000000),
(3, 6, 3, 45000000),
(3, 7, 2, 40000000),
(3, 9, 2, 48000000),
(3, 10, 3, 90000000),
(3, 11, 1, 50000000),
(4, 8, 1, 25000000),
(4, 9, 1, 24000000),
(4, 12, 2, 46000000),
(4, 13, 1, 23000000),
(4, 14, 3, 69000000),
(5, 1, 2, 50000000),
(5, 2, 3, 30000000),
(5, 10, 2, 60000000),
(5, 11, 1, 50000000),
(5, 15, 1, 25000000),
(6, 1, 3, 75000000),
(6, 2, 2, 20000000),
(6, 3, 4, 100000000),
(6, 4, 1, 18000000),
(6, 5, 2, 60000000),
(7, 3, 4, 88000000),
(7, 4, 2, 38000000),
(7, 6, 3, 45000000),
(7, 7, 2, 40000000),
(8, 5, 1, 30000000),
(8, 6, 2, 30000000),
(9, 7, 3, 60000000),
(9, 8, 1, 25000000),
(10, 9, 2, 48000000);

--chitietlohang
INSERT INTO chitietlohang (idSanPham, idLoHang, giaNhap, soLuong)
VALUES 
(1, 1, 10000, 10),
(2, 1, 12000, 15),
(3, 1, 11000, 20),
(4, 1, 13000, 25),
(5, 1, 14000, 30),
(6, 1, 15000, 35),
(7, 1, 16000, 40),
(8, 1, 17000, 45),
(9, 1, 18000, 50),
(10, 1, 19000, 55),
(11, 1, 20000, 60),
(12, 1, 21000, 65),
(13, 1, 22000, 70),
(14, 1, 23000, 75),
(15, 1, 24000, 80),
(16, 1, 25000, 85),
(17, 1, 26000, 90),
(18, 1, 27000, 95),
(19, 1, 28000, 100),
(20, 1, 29000, 105);