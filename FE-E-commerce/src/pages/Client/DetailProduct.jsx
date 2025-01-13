import { Row, Col, Card } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import SpecProduct from "../../components/Client/Descriptions/SpecProduct";
import ImageProduct from "../../components/Client/Image/ImageProduct";
import HeadingProduct from "../../components/Client/Descriptions/HeadingProduct";
import StarRating from "../../components/Client/Descriptions/StarRating";
import ViewCount from "../../components/Client/Descriptions/ViewCount";
import HeartCount from "../../components/Client/Descriptions/HeartCount";
import ThemSanPham from "../../components/Client/Button/ThemSanPham";
import DescriptionsProduct from "../../components/Client/Descriptions/DescriptionsProduct";
import Review from "../../components/Client/Input/Review";
import RatingStar from "../../components/Client/Input/RatingStar";
import TableComment from "../../components/Client/Table/TableComment";
import CardSanPham from "../../components/Client/Cards/CardSanPham";
import Price from "../../components/Client/Descriptions/Price"
import productsService from "../../services/productsService";


const DetailProduct = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [spLienQuan, setSPLienQuan] = useState([]);
  const [rating, setRating] = useState(null);
  const [khuyenmai,setKhuyenMai]=useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await productsService.getDetailProduct(slug);
        setProduct(response.data.data.sanPham);
        setDetailProduct(response.data.data.thongSoSanPham);
        setRating(response.data.data.danhGia);
        setSPLienQuan(response.data.data.sanPhamLienQuan);
        setKhuyenMai(response.data.data.khuyenmai); khuyenmai
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [slug])
  return (
    <div style={{ marginTop: "16px" }}>
      <Row justify="center" align="flex-start" gutter={[16, 16]}>
        <Col md={10}>
          <ImageProduct img={product?.img} />
          <HeadingProduct tenSanPham={product?.tenSanPham} /> 
          <Price gia={product?.gia} />  
          <Row justify="flex-start" align="middle">
            <Col>
              <StarRating />
            </Col>
            <Col>
              <ViewCount rating={product?.soLuotXem} />
            </Col>
            <Col>
              <HeartCount />
            </Col>
          </Row>
          <div style={{ marginTop: "1rem" }}>
            <ThemSanPham slug={slug} tenSanPham={product?.tenSanPham} gia={product?.gia} khuyenmai={khuyenmai} />
          </div>
        </Col>
        <Col md="16">
          <SpecProduct detailProduct={detailProduct} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={18} style={{ marginTop: "2rem" }}>
          <DescriptionsProduct description={product?.moTa} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={18} style={{ marginTop: "2rem" }}>
          <Card title="Đánh giá sản phẩm">
            <RatingStar />
            <Review />
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={18} style={{ marginTop: "2rem" }}>
          <Card title="Danh sách đánh giá">
            <TableComment rating={rating} />
          </Card>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        gutter={[16, 16]}
        style={{ marginTop: "2rem" }}
      >
      {spLienQuan.map((product, index) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <CardSanPham
            tenSanPham={product?.tenSanPham}
            hang={product?.hang}
            gia={product?.gia}
            img={product?.img}
            slug={product?.slug}
          />
        </Col>
      ))}
      </Row>
    </div>
  );
};

export default DetailProduct;
