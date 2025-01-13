import api from "./api"

const khuyenMaiService = {
    getListBaiVietKhuyenMai: api.get('/api/getListBaiVietKhuyenMai')
};

export default khuyenMaiService;