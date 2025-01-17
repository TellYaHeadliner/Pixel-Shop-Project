import { Row, Col, Layout, Typography, Card, Flex } from "antd";
import { AiOutlineCheck } from "react-icons/ai";
import { useState, useEffect } from "react";

import SanPhamNav from "../../../components/Client/Button/SanPhamNav";
import "./Home.scss";
import apiService from "../../../api/api";
import WebsiteInfo from "../../../components/Client/WebsiteInfo/WebsiteInfo.jsx";
import SlideShowKhuyenMai from "../../../components/Client/Slideshow/SlideShowKhuyenMai";
import SlideShowSanPhamNoiBat from "../../../components/Client/Slideshow/SlideShowSanPhamNoiBat";
import CardSanPham from "../../../components/Client/Cards/CardSanPham";
import SlideShowQuangCao from "../../../components/Client/Slideshow/SlideShowQuangCao";

const { Content } = Layout;
const { Paragraph, Title, Text } = Typography;

import productsService from "../../../services/productsService";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [listLaptop, setListLaptop] = useState([]);
  const [bestSellerList, setBestSellerList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listNoiBat, setListNoiBat] = useState([]);
  const [websiteInfo, setWebsiteInfo] = useState({}); // Trạng thái cho thông tin trang web

  const handleNextSlideShow = (current) => {
    setCurrentSlide(current);
  };

  useEffect(() => {
    document.title = "Trang chủ Pixel Shop";
    const fetchProducts = async () => {
      try {
        const response = await productsService.getListNewProducts;
        if (response && response.data && response.data.data.listSanPham) {
          setNewProducts(response.data.data?.listSanPham);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [newProducts]);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await productsService.getListLaptop;
        if (response && response.data && response.data.data) {
          setListLaptop(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };
    fetchLaptops();
  }, [listLaptop]);

  useEffect(() => {
    const fetchBestProductList = async () => {
      try {
        const response = await productsService.getListBestSellingProducts;
        setBestSellerList(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBestProductList();
  }, [bestSellerList]);

  useEffect(() => {
    try {
      const fetchNoiBatList = async () => {
        try {
          const response = await productsService.getListProductNoiBat;
          setListNoiBat(response.data.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchNoiBatList();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [listNoiBat])

  useEffect(() => {
    const fetchWebsiteInfo = async () => {
      try {
        const response = await apiService.getThongTin();
        setWebsiteInfo(response.data);
      } catch (error) {
        console.error("Error fetching website info:", error);
      }
    };

    fetchWebsiteInfo();
  }, []);
  return (
    <Layout className="user-home-layout">
      <Content
        className="user-home-content"
        style={{
          imageRendering: "optimizeQuality",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={14}>
            <SlideShowSanPhamNoiBat width="100%" height="700px" />
          </Col>
          <Col xs={24} md={10}>
            <Flex gap="middle" vertical>
              <SlideShowKhuyenMai width="100%" height="300px" />
              <SlideShowQuangCao width="100%" height="380px" />
            </Flex>
          </Col>
        </Row>

        <div className="mt-3">
          <SanPhamNav title="Sản phẩm mới" />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {newProducts.map((product, index) => (
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

        <div className="mt-3">
          <SanPhamNav
            title="Sản phẩm bán chạy"
            onNext={() => handleNextSlideShow((currentSlide + 1) % 3)}
          />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {bestSellerList.map((product, index) => (
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

        <div className="mt-3">
          <SanPhamNav title="Laptop" />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {listLaptop.map((product, index) => (
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

        <div className="mt-3">
          <SanPhamNav title="Sản phẩm nổi bật" />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {listLaptop.map((product, index) => (
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
        <WebsiteInfo info={websiteInfo} /> {/* Hiển thị thông tin trang web */}

      </Content>
    </Layout>
  );
};

export default Home;
