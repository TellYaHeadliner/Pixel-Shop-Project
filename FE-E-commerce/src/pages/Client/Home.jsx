import { Container, Row, Col } from "react-bootstrap";
import SanPhamNav from "../../components/Client/Button/SanPhamNav";
import SanPhamCard from "../../components/Client/Cards/SanPhamCard";
import SlideShowAds from "../../components/Client/Slideshow/SlideshowAds";
const Home = () => {
  return (
    <>
      <Container fluid className="p-md-4">
        <Row>
          <Col md={6}>
            <SlideShowAds />
          </Col>
          <Col md={6}>
            <img
              src="/imgs/slideshow2.png"
              alt=""
              className="w-100 vh-50"
            />
            <img
              src="/imgs/slideshow3.png"
              alt=""
              className="w-100 vh-50 mt-4"
            />
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-3">
        <Row>
          <SanPhamNav title="Sản phẩm mới" />
        </Row>
        <Row className="my-4">
          <Col lg={4} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col lg={4} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col lg={4} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-3">
        <Row>
          <SanPhamNav title="Laptop" />
        </Row>
        <Row className="my-4">
          <Col lg={4} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col lg={4} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
          <Col lg={4} className="p-0 d-flex justify-content-center">
            <SanPhamCard />
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-3 p-0 d-flex justify-content-center">
        <img src="/imgs/banner.png" alt="" className="w-100 vh-50"/>
      </Container>
    </>
  );
};

export default Home;
