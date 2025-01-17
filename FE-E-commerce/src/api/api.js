import React, { useContext } from "react";
import axios from 'axios';
import { UserContext } from '../routes/UserContext';

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
    addDanhMuc: async (categoryData) => {
        return await axios.post(`${API_URL}/addDanhMuc`, categoryData);
    },
    updateDanhMuc: async (id, categoryData) => {
        return await axios.put(`${API_URL}/updateDanhMuc/${id}`, categoryData);
    },
    deleteDanhMuc: async (id) => {
        return await axios.delete(`${API_URL}/deleteDanhMuc/${id}`);
    },
    getThongTin: async () => {
        return await axios.get(`${API_URL}/getThongTin`);
    },
    updateThongTin: async (data) => {
        return await axios.post(`${API_URL}/updateThongTin`, data);
    },
    addNhaCungCap: async (supplierData) => {
        return await axios.post(`${API_URL}/addNhaCungCap`, supplierData);
    },
    listNhaCungCap: async () => {
        return await axios.get(`${API_URL}/listNhaCungCap`);
    },
    getDiaChiUser: async (idNguoiDung, token) => {
        return await axios.post(`${API_URL}/getDiaChiUser`, { idNguoiDung }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    addLocation: async (locationData, token) => {
        return await axios.post(`${API_URL}/addLocation`, locationData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    updateLocation: async (locationData, token) => {
        return await axios.post(`${API_URL}/updateLocation`, locationData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    deleteLocation: async (locationData, token) => {
        return await axios.post(`${API_URL}/deleteLocation`, locationData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    updateDefaultLocation: async (locationData, token) => {
        return await axios.post(`${API_URL}/updateDefaultLocation`, locationData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    getListSanPham: async () => {
        return await axios.get(`${API_URL}/getListSanPham`);
    },
    getChiTietSanPham: async (id) => {
        return await axios.get(`${API_URL}/product/${id}`);
    },
    getListBaiViet: async () => {
        return await axios.get(`${API_URL}/listBaiViet`);
    },
    getListQuangCao: async () => {
        return await axios.get(`${API_URL}/getListQuangCao`);
    },
    loiNhuanHienTai: async () => {
        return await axios.get(`${API_URL}/loiNhuanHienTai`);
    },
    sanPhamDaBanTheoThang: async () => {
        return await axios.get(`${API_URL}/sanPhamDaBanTheoThang`);
    },
    thongKeDoanhThuTheoTatCaNguoiDung: async () => {
        return await axios.get(`${API_URL}/thongKeDoanhThuTheoTatCaNguoiDung`);
    },
    thongKeDoanhThuSanPhamTheoNgay: async () => {
        return await axios.get(`${API_URL}/thongKeDoanhThuSanPhamTheoNgay`);
    },
    thongKeDonHangTheoNgay: async () => {
        return await axios.get(`${API_URL}/thongKeDonHangTheoNgay`);
    },
};

export default apiService;