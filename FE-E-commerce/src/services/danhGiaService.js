import api from "./api";

const danhGiaService = {
    getDanhGiaByIdSanPham: (id) => api.get(`/api/getDanhGiaByIdSanPham/${id}`),
    getListDanhGia: api.get('/api/getListDanhGia'),
    deleteDanhGia:(idNguoiDung, idSanPham) =>  api.delete('/api/deleteDanhGia', { data: { idNguoiDung: idNguoiDung, idSanPham: idSanPham}}),
}

export default danhGiaService;