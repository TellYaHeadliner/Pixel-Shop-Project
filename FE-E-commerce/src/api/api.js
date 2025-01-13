// src/apiService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const apiService = {
    login: async (credentials) => {
        return await axios.post(`${API_URL}/login`, credentials);
    },
    sendVerificationEmail: async (email) => {
        return await axios.post(`${API_URL}/VerificationEmail`, { email });
    },
    signup: async (userData) => {
        return await axios.post(`${API_URL}/signup`, userData);
    },
    getProfile: async () => {
        return await axios.post(`${API_URL}/getProfile`);
    },
    updateById: async (userData) => {
        return await axios.post(`${API_URL}/updateById`, userData);
    },
    changeEmail: async (emailData) => {
        return await axios.post(`${API_URL}/changeEmail`, emailData);
    },
    getListDanhMuc: async () => {
        return await axios.get(`${API_URL}/listDanhMuc`);
    },
    getThongTin: async () => {
        return await axios.get(`${API_URL}/getThongTin`);
    },
    addNhaCungCap: async (supplierData) => {
        return await axios.post(`${API_URL}/addNhaCungCap`, supplierData);
    },
    listNhaCungCap: async () => {
        return await axios.get(`${API_URL}/listNhaCungCap`);
    },
    getDiaChiUser: async (userId) => {
        return await axios.post(`${API_URL}/getDiaChiUser`, { userId });
    },
    updateDefaultLocation: async (locationData) => {
        return await axios.post(`${API_URL}/updateDefaultLocation`, locationData);
    },
};

export default apiService;