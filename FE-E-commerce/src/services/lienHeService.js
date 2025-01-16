import api from "./api"

const lienHeService = {
    getListLienHe: api.get('/api/getListLienHe'),
    getByIdLienHe: (id) => api.get(`/api/getByIdLienHe/${id}`),
    addLienHe: api.post('/api/addLienHe'),
    updateStatusLienHe: (idLienHe, trangThai) => api.put('/api/updateStatusLienHe/', {idLienHe: idLienHe, trangThai: trangThai}),
    deleteLienHe:(idLienHe) => api.delete('/api/deleteLienHe', { data: {idLienHe: idLienHe} })
}

export default lienHeService;