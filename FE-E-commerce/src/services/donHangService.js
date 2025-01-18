import { useContext } from 'react';
import api from './api';
import { UserContext } from '../routes/UserContext';
import axios from 'axios';

const { token } =useContext(UserContext);
axios.defaults.withCredentials=true;

const donhangService = {
   
    getListHoaDon: api.get('/api/getListHoaDon'),
    getHoaDonById: (idHoaDon) => api.get(`/api/getHoaDonById/${idHoaDon}`),
    updateStatusHoaDon: (idHoaDon, trangThai) => axios.put(
        '/api/updateStatusHoaDon/', 
        {data: { idHoaDon: idHoaDon, trangThai: trangThai}},
        {headers:{"Content-Type": "application/json",'Authorization':`Bearer ${token}`}}
    ),
    updateHiddenHoaDon: (idHoaDon, trangThai) => api.put('/api/updateHiddenHoaDon/', {data: { idHoaDon: idHoaDon, trangThai: trangThai}}),
}

export default donhangService;