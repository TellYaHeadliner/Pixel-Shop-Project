import api from './api';

const donhangService = {
    getListHoaDon: api.get('/api/getListHoaDon'),
    getHoaDonById: (idHoaDon) => api.get(`/api/getHoaDonById/${idHoaDon}`),
    updateStatusHoaDon: (idHoaDon, trangThai) => api.put('/api/updateStatusHoaDon/', {data: { idHoaDon: idHoaDon, trangThai: trangThai}}),
    updateHiddenHoaDon: (idHoaDon, trangThai) => api.put('/api/updateHiddenHoaDon/', {data: { idHoaDon: idHoaDon, trangThai: trangThai}}),
}

export default donhangService;