import api from "./api";

const businessStatistic = {
    checkHoaDonById: (idNguoiDung, idSanPham) => api.get(`/api/checkHoaDonById/${idNguoiDung}/${idSanPham}`),
    thongKeDoanhThuTheoThangVaNam: (thang, nam) => api.get(`/api/thongKeDoanhThuTheoThangVaNam/${thang}/${nam}`),
    thongKeDoanhThuTheoNguoiDung: (idNguoiDung) => api.get(`/api/thongKeDoanhThuTheoNguoiDung/${idNguoiDung}`),
    thongKeDoanhThuTheoTatCaNguoiDung: api.get('/api/thongKeDoanhThuTheoTatCaNguoiDung'),
    thongKeDoanhThuSanPhamTheoNgay: api.get('/api/thongKeDoanhThuSanPhamTheoNgay'),
    thongKeDonHangTheoNgay: api.get('/api/thongKeDonHangTheoNgay')
}

export default businessStatistic;