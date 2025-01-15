import { Carousel } from "antd";

import quangCaoService from "../../../services/quangCaoService";
import { useEffect, useState } from "react";
import "./SlideShowSanPhamNoiBat.css";
const SlideShowQuangCao = ({ width, height }) => {
  const [quangCao, setQuangCao] = useState([]);

  useEffect(() => {
    const fetchQuangCao = async () => {
      try {
        const response = await quangCaoService.getListQuangCao;
        setQuangCao(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm nổi bật:", error);
      }
    };
    fetchQuangCao();
  }, []);

  return (
    <Carousel autoplay>
      {quangCao.map((sanPham, index) => {
        // const linkKhuyenMai = `http://127.0.0.1:5173/blog/${sanPham.slug}`;
        return (
          <a key={index} href="#">
            <img
              width={width}
              height={height}
              src={`http://127.0.0.1:8000/imgs/${sanPham.hinhAnh}`}
              alt={sanPham.tieuDe}
              style={{ objectFit: "cover" }} // Đảm bảo hình ảnh được cắt xén đẹp
            />
          </a>
        );
      })}
    </Carousel>
  );
};

export default SlideShowQuangCao;
