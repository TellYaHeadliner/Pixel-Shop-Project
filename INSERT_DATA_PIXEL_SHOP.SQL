use pixel_shop

-- Thong tin
INSERT INTO `thongtin` (`dichVu`, `facebook`, `instagram`, `youtube`, `tiktok`) VALUES
('Dịch vụ chăm sóc khách hàng 24/7', 'https://facebook.com/samplepage', 'https://instagram.com/samplepage', 'https://youtube.com/samplechannel', 'https://tiktok.com/@samplepage'),
('Dịch vụ tư vấn trực tuyến', 'https://facebook.com/consultingpage', 'https://instagram.com/consultingpage', 'https://youtube.com/consultingchannel', 'https://tiktok.com/@consultingpage'),
('Dịch vụ bán hàng trực tuyến', 'https://facebook.com/onlinepage', 'https://instagram.com/onlinepage', 'https://youtube.com/onlinechannel', 'https://tiktok.com/@onlinepage');

-- Lien he
INSERT INTO `lienhe` (`idLienHe`, `hoVaTen`, `email`, `sdt`, `noiDung`, `thoiGian`, `trangThai`) VALUES
(1, 'Nguyễn Văn A', 'nguyenvana@example.com', '0987654321', 'Tôi muốn tìm hiểu thêm về dịch vụ của bạn.', '2025-01-12 09:00:00', 1),
(2, 'Trần Thị B', 'tranthib@example.com', '0976543210', 'Làm thế nào để đăng ký tài khoản?', '2025-01-11 14:30:00', 0),
(3, 'Lê Minh C', 'leminhc@example.com', '0912345678', 'Tôi gặp vấn đề với đơn hàng gần đây.', '2025-01-10 16:45:00', 1),
(4, 'Phạm Văn D', 'phamvand@example.com', '0923456789', 'Bạn có thể gửi thêm thông tin khuyến mãi không?', '2025-01-09 11:15:00', 0),
(5, 'Đỗ Thị E', 'dothie@example.com', '0934567890', 'Tôi cần hỗ trợ gấp, vui lòng liên hệ lại.', '2025-01-08 08:50:00', 1);


-- Bai viet
INSERT INTO `baiviet` (`tieuDe`, `slug`, `hinhAnh`, `noiDung`, `ngayDang`, `trangThai`) VALUES
('Top 5 điện thoại thông minh 5G đáng mua 2025', 'top-5-dien-thoai-thong-minh-5g-dang-mua-2025', 'images/dien-thoai-5g.jpg', 'Bài viết giới thiệu các mẫu điện thoại thông minh 5G tốt nhất năm 2025, với tính năng kết nối nhanh, hiệu năng mạnh mẽ và giá cả hợp lý.', '2025-01-12 09:30:00', 1),

('Laptop 2 trong 1: Sự lựa chọn tốt nhất cho công việc và giải trí', 'laptop-2-trong-1-su-lua-chon-tot-nhat-cho-cong-viec-va-giai-tri', 'images/laptop-2-trong-1.jpg', 'Bài viết gợi ý các mẫu laptop 2 trong 1 lý tưởng cho công việc và giải trí, với thiết kế gập linh hoạt và hiệu suất mạnh mẽ.', '2025-01-13 10:00:00', 1),

('Điện thoại pin trâu: Top 5 smartphone có pin lớn đáng mua nhất 2025', 'dien-thoai-pin-trau-top-5-smartphone-co-pin-lon-dang-mua-nhat-2025', 'images/dien-thoai-pin-trau.jpg', 'Khám phá những chiếc điện thoại thông minh có pin lớn, giúp bạn sử dụng thoải mái cả ngày dài mà không lo hết pin.', '2025-01-14 11:00:00', 1),

('Laptop Gaming: Lựa chọn tốt nhất cho game thủ 2025', 'laptop-gaming-lua-chon-tot-nhat-cho-game-thu-2025', 'images/laptop-gaming.jpg', 'Bài viết giới thiệu các mẫu laptop gaming mạnh mẽ, thiết kế đẹp mắt và khả năng chơi game tốt nhất năm 2025.', '2025-01-15 08:30:00', 1),

('Điện thoại 5G giá rẻ: Top các smartphone tầm trung 5G đáng mua', 'dien-thoai-5g-gia-re-top-cac-smartphone-tam-trung-5g-dang-mua', 'images/dien-thoai-5g-gia-re.jpg', 'Bài viết gợi ý các mẫu điện thoại tầm trung hỗ trợ 5G, mang lại trải nghiệm mạng nhanh và giá thành hợp lý.', '2025-01-16 15:00:00', 1);


-- Danh muc
INSERT INTO `danhmuc` (`tenDanhMuc`, `idDanhMucCha`) VALUES
('Điện thoại', NULL), -- Danh mục cha chính
('Laptop', NULL), -- Danh mục cha chính

('Điện thoại Samsung', 1), -- Danh mục con của "Điện thoại"
('Điện thoại iPhone', 1), -- Danh mục con của "Điện thoại"

('Laptop Dell', 2), -- Danh mục con của "Laptop"
('Laptop HP', 2), -- Danh mục con của "Laptop"
('Laptop ASUS', 2); -- Danh mục con của "Laptop"


-- Khuyen mai
INSERT INTO `khuyenmai` (`phanTram`, `ngayBatDau`, `ngayKetThuc`) VALUES
(10, '2025-01-15 00:00:00', '2025-02-15 23:59:59'), -- Khuyến mãi 10% từ 15/01 đến 15/02
(15, '2025-01-20 00:00:00', '2025-03-01 23:59:59'), -- Khuyến mãi 15% từ 20/01 đến 01/03
(20, '2025-02-05 00:00:00', '2025-03-10 23:59:59'), -- Khuyến mãi 20% từ 05/02 đến 10/03
(25, '2025-02-25 00:00:00', '2025-04-01 23:59:59'); -- Khuyến mãi 25% từ 25/02 đến 01/04


-- Nha cung cap
INSERT INTO `nhacungcap` (`tenNhaCungCap`, `tenLienHe`, `diaChi`, `soDienThoai`, `email`) VALUES
('Công ty ABC', 'Nguyễn Văn A', '123 Phố X, Quận Y', '0987654321', 'abc@gmail.com'),
('Công ty XYZ', 'Trần Thị B', '456 Đường B, Thành phố Z', '0123456789', 'xyz@gmail.com');


-- Lo hang
INSERT INTO `lohang` (`idNhaCungCap`, `date`) VALUES
(1, '2025-01-12 08:00:00'),
(2, '2025-01-13 09:30:00');

-- Chi tiet lo hang
INSERT INTO `chitietlohang` (`idSanPham`, `idLoHang`, `giaNhap`, `soLuong`) VALUES
(1, 1, 500000, 50),
(2, 1, 300000, 70),
(3, 2, 700000, 30),
(4, 2, 400000, 60);

-- sanpham
INSERT INTO `sanpham` (`tenSanPham`, `moTa`, `gia`, `soLuong`, `ngayThem`, `img`, `soLuotXem`, `loai`, `hang`, `noiBat`, `trangThai`, `slug`, `idDanhMuc`, `idKhuyenMai`) VALUES
('iPhone 14 Pro Max', 'Điện thoại iPhone 14 Pro Max với màn hình 6.7 inch, chip A16 Bionic...', 29990000, 100, '2025-01-12 00:00:00', 'images/iphone14.jpg', 150, 1, 'Apple', 1, 1, 'iphone-14-pro-max', 1, 1),
('Samsung Galaxy S23 Ultra', 'Điện thoại Samsung Galaxy S23 Ultra với màn hình 6.8 inch, chip Snapdragon 8 Gen 2...', 24990000, 80, '2025-01-12 00:00:00', 'images/samsung_s23.jpg', 120, 1, 'Samsung', 1, 1, 'samsung-galaxy-s23-ultra', 1, 2),
('Laptop Dell XPS 13', 'Laptop Dell XPS 13 với màn hình InfinityEdge 13.4 inch, chip Intel Core i7...', 35990000, 60, '2025-01-12 00:00:00', 'images/dell-xps13.jpg', 90, 2, 'Dell', 1, 1, 'dell-xps-13', 2, 1),
('Laptop HP Spectre x360', 'Laptop HP Spectre x360 với màn hình 13.3 inch cảm ứng, chip Intel Core i7...', 32990000, 50, '2025-01-12 00:00:00', 'images/hp-spectre.jpg', 85, 2, 'HP', 1, 1, 'hp-spectre-x360', 2, 2);


-- nguoidung
INSERT INTO nguoidung (idNguoiDung, tenDangNhap, hoVaTen, ngaySinh, matKhau, gioiTinh, sdt, vaiTro, email, anhDaiDien) VALUES
(1, 'admin', 'admin', '1990-01-15', 'Adminok123@', 1, '0123456789', 1, 'user1@example.com', 'link_to_avatar1.jpg'),
(2, 'user2', 'Trần Thị B', '1988-05-20', 'password2', 0, '0987654321', 2, 'user2@example.com', 'link_to_avatar2.jpg'),
(3, 'user3', 'Lê Văn C', '1995-03-30', 'password3', 1, '0912345678', 1, 'user3@example.com', 'link_to_avatar3.jpg'),
(4, 'user4', 'Phạm Thị D', '1992-11-05', 'password4', 0, '0934567890', 2, 'user4@example.com', 'link_to_avatar4.jpg'),
(5, 'user5', 'Trần Văn E', '1993-07-22', 'password5', 1, '0945678901', 1, 'user5@example.com', 'link_to_avatar5.jpg');


-- Chèn dữ liệu vào bảng diachi
INSERT INTO diachi (idDiaChi, idNguoiDung, diaChi, sdt, note, loaiDiaChi, macDinh) VALUES
(1, 1, '123 Đường A, Phường B, Quận C, TP.HCM', '0123456789', 'Nhà riêng', 'Nhà', 1),
(2, 1, '456 Đường D, Phường E, Quận F, TP.HCM', '0123456789', 'Công ty', 'Công ty', 0),
(3, 2, '789 Đường G, Phường H, Quận I, TP.HCM', '0987654321', 'Nhà ba mẹ', 'Nhà', 1),
(4, 3, '101 Đường J, Phường K, Quận L, TP.HCM', '0912345678', 'Chỗ ở trọ', 'Chỗ ở', 0),
(5, 4, '202 Đường M, Phường N, Quận O, TP.HCM', '0934567890', 'Địa chỉ văn phòng', 'Công ty', 1);

-- Chèn dữ liệu vào bảng hoadon
INSERT INTO hoadon (idHoaDon, idNguoiDung, idDiaChi, tongSoTien, trangThai, phuongThucThanhToan, ngayDat, nhanVienXacNhan, ngayXacNhan, soLan, thoiGianKhoa) VALUES
(1, 1, 1, 500000, 1, 1, '2023-01-15 10:00:00', NULL, NULL, 1, NULL),
(2, 2, 3, 750000, 1, 2, '2023-02-05 14:30:00', NULL, NULL, 1, NULL),
(3, 3, 4, 300000, 0, 1, '2023-03-10 09:15:00', 1, '2023-03-11 12:00:00', 2, NULL),
(4, 4, 5, 1000000, 1, 1, '2023-04-20 08:45:00', NULL, NULL, 1, NULL),
(5, 5, 2, 450000, 1, 2, '2023-05-25 16:20:00', NULL, NULL, 1, NULL);

INSERT INTO chitiethoadon (idHoaDon, idSanPham, soLuong, tongTien) VALUES
(1, 1, 2, 1000000),  -- 2 sản phẩm A, tổng tiền 1,000,000 VNĐ
(1, 2, 1, 750000),   -- 1 sản phẩm B, tổng tiền 750,000 VNĐ
(2, 2, 3, 2250000),  -- 3 sản phẩm B, tổng tiền 2,250,000 VNĐ
(3, 3, 1, 300000),   -- 1 sản phẩm C, tổng tiền 300,000 VNĐ
(4, 1, 1, 500000),   -- 1 sản phẩm A, tổng tiền 500,000 VNĐ
(5, 2, 2, 1500000);  -- 2 sản phẩm B, tổng tiền 1,500,000 VNĐ

-- Chèn dữ liệu vào bảng danhgia
INSERT INTO danhgia (idNguoiDung, idSanPham, noiDung, soSao, ngayGio) VALUES
(1, 1, 'Sản phẩm rất tốt, tôi rất hài lòng!', 5, '2023-01-10 08:30:00'),
(2, 2, 'Chất lượng không như mong đợi.', 3, '2023-02-12 14:15:00'),
(3, 3, 'Sản phẩm ổn, nhưng giao hàng chậm.', 4, '2023-03-20 10:00:00'),
(1, 3, 'Tuyệt vời, sẽ mua lại!', 5, '2023-01-15 09:00:00'),
(2, 1, 'Giá hơi cao so với chất lượng.', 2, '2023-02-15 11:00:00');

-- Chèn dữ liệu vào bảng trahang
INSERT INTO trahang (idTraHang, idHoaDon, idSanPham, hinhAnhSanPham, lyDoTraHang, ngayCoTheLayHang, diaChiHienTai, nganHangHoanTien, soTaiKhoanHoanTien, trangThai) VALUES
(1, 1, 1, 'link_to_image1.jpg', 'Sản phẩm bị lỗi', '2023-01-20 10:00:00', 1, 'Ngân hàng A', '123456789', 1),
(2, 2, 2, 'link_to_image2.jpg', 'Không đúng sản phẩm', '2023-02-15 14:30:00', 3, 'Ngân hàng B', '987654321', 0),
(3, 3, 3, 'link_to_image3.jpg', 'Sản phẩm không như mô tả', '2023-03-25 09:15:00', 4, 'Ngân hàng C', '555555555', 1),
(4, 4, 1, 'link_to_image4.jpg', 'Hàng bị hư hỏng', '2023-04-30 08:45:00', 5, 'Ngân hàng D', '444444444', 0),
(5, 5, 2, 'link_to_image5.jpg', 'Không vừa với kích thước', '2023-05-10 16:20:00', 2, 'Ngân hàng E', '333333333', 1);


