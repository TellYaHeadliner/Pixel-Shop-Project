import api from "~/api"

const authService = {
    login: (cerdential) => api.post('/auth/DangNhap'),
    register: (userData) => api.post('/auth/DangKi'),
    logout: () => {
        localStorage.removeItem('access_token')
        return Promise.resolve(false);
    },
};

export default authService;