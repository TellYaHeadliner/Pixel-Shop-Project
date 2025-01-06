import React from "react";
import { Row, Col, Layout, Image } from "antd";
import SanPhamNav from "../../../components/Client/Button/SanPhamNav";
import SanPhamCard from "../../../components/Client/Cards/CardSanPham";
import "./Home.scss"
const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="user-home-layout" >
      <Content
        className="user-home-content"
        style={{
          imageRendering: 'optimizeQuality',
        }}>
        <Row gutter={[100, 10]} >
          <Col span={13}>
            <Image
              src="/imgs/slideshow1.png"
              alt=""
              height='93%'
              width='110%'
              style={{
                imageRendering: 'optimizeQuality',
              }}
              preview={false}
            />
          </Col>
          <Col span={1}>
            <Image
              src="/imgs/slideshow2.png"
              preview={false}
              width='470px'
              style={{
                imageRendering: 'optimizeQuality',
                marginBottom: '30px'
              }}
            />
            <Image
              src="/imgs/slideshow3.png"
              alt=""
              preview={false}
              width='470px'
              style={{
                imageRendering: 'optimizeQuality',
                margin: '0'
              }}
            />
          </Col>
        </Row>

        <div className="mt-3">
          <SanPhamNav title="Sản phẩm mới" />
        </div>
        <Row gutter={[16, 16]} className="my-4">
          <Col span={8} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col span={8} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col span={8} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
        </Row>

        <div className="mt-3">
          <SanPhamNav title="Laptop" />
        </div>
        <Row gutter={[16, 16]} className="my-4">
          <Col span={8} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col span={8} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col span={8} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
        </Row>

        <div className="mt-3">
          <Image
            src="/imgs/banner.png"
            alt=""
            width="100%"
            preview={false}
            style={{ maxHeight: '50vh', objectFit: 'cover', imageRendering: 'optimizeQuality', }}
          />
        </div>
      </Content>
    </Layout >
  );
};

export default Home;