import { Carousel } from "antd";

import khuyenMaiService from "../../../services/khuyenMaiService";
import { useEffect, useState } from "react";
import "./SlideShowSanPhamNoiBat.css";
const SlideShowKhuyenMai = ({ width, height }) => {
  const [khuyenMai, setKhuyeMai] = useState([]);

  useEffect(() => {
    const fetchKhuyenMai = async () => {
      try {
        const response = await khuyenMaiService.getListBaiVietKhuyenMai;
        setKhuyeMai(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm nổi bật:", error);
      }
    };

    fetchKhuyenMai();
  }, []);

  return (
    <Carousel autoplay className="custom-cả">
      {khuyenMai.map((sanPham, index) => {
        const linkKhuyenMai = `http://127.0.0.1:5173/blog/${sanPham.slug}`;
        return (
          <a key={index} href={linkKhuyenMai}>
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

export default SlideShowKhuyenMai;
