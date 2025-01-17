import api from './api';

const donhangService = {
    getListHoaDon: api.get('/api/getListHoaDon'),
    getHoaDonById: (idHoaDon) => api.get(`/api/getHoaDonById/${idHoaDon}`),
}

export default donhangService;