import { Carousel } from "antd";

import productsService from "../../../services/productsService";
import { useEffect, useState } from "react";
import "./SlideShowSanPhamNoiBat.css";
const SlideShowSanPhamNoiBat = ({ width, height }) => {
  const [sanPhamNoiBat, setSanPhamNoiBat] = useState([]);

  useEffect(() => {
    const fetchSanPhamNoiBat = async () => {
      try {
        const response = await productsService.getListProductNoiBat;
        setSanPhamNoiBat(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm nổi bật:", error);
      }
    };

    fetchSanPhamNoiBat();
  }, []);

  return (
    <Carousel autoplay className="custom-cả">
      {sanPhamNoiBat.map((sanPham) => {
        const linkProduct = `http://127.0.0.1:5173/product/${sanPham.slug}`;
        return (
          <a key={sanPham.id} href={linkProduct}>
            <img
              width={width}
              height={height}
              src={`http://127.0.0.1:8000/imgs/${sanPham.img}`}
              alt={sanPham.tenSanPham}
              style={{ objectFit: "cover" }} // Đảm bảo hình ảnh được cắt xén đẹp
            />
          </a>
        );
      })}
    </Carousel>
  );
};

export default SlideShowSanPhamNoiBat;
