import React from "react";
import { Row, Col, Layout, Image } from "antd";
import SanPhamNav from "../../../components/Client/Button/SanPhamNav";
import SanPhamCard from "../../../components/Client/Cards/CardSanPham";
import "./Home.scss"
import SlideShowAds from "../../../components/Client/Slideshow/SlideShowAds";
const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="user-home-layout">
      <Content
        className="user-home-content"
        style={{
          imageRendering: "optimizeQuality",
        }}
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <SlideShowAds
              linkImg="/imgs/slideshow1.png"
            />
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <SlideShowAds height="25%" linkImg="/imgs/slideshow2.png" />
              </Col>
              <Col span={24}>
                <SlideShowAds height="25%" linkImg="/imgs/slideshow3.png" />
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="mt-3">
          <SanPhamNav title="Sản phẩm mới" />
        </div>
        <Row gutter={[16, 16]} className="my-4">
          <Col xs={24} sm={12} lg={8}>
            <SanPhamCard />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <SanPhamCard />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <SanPhamCard />
          </Col>
        </Row>

        <div className="mt-3">
          <SanPhamNav title="Laptop" />
        </div>
        <Row gutter={[16, 16]} className="my-4">
          <Col xs={24} sm={12} lg={8}>
            <SanPhamCard />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <SanPhamCard />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <SanPhamCard />
          </Col>
        </Row>

        <div className="mt-3">  
          
        </div>
      </Content>
    </Layout>
  );
};

export default Home;