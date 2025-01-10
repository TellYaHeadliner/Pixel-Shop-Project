import api from "./api"

const productsService = {
    getProducts: api.get('api/listSanPham'),
    getDetailProduct: (slug) => api.get(`api/product/${slug}`),
    getListLaptop: api.get('api/listLaptop')
};

export default productsService;