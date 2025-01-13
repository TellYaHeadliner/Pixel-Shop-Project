import api from "./api"

const productsService = {
    getListNewProducts: api.get('api/getListNewProducts'),
    getDetailProduct: (slug) => api.get(`api/product/${slug}`),
    getListLaptop: api.get('api/listLaptop'),
    getListBestSellingProducts: api.get('api/getListBestSellingProducts'),
    getListProductNoiBat: api.get('api/getListSanPhamNoiBat'),
};

export default productsService;