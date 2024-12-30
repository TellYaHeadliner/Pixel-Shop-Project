import { Container, Row, Col } from "react-bootstrap";
import SanPhamNav from "../../components/Client/Button/SanPhamNav";
import SanPhamCard from "../../components/Client/Cards/SanPhamCard";
const Home = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col md={6}>
            <img
              src="/public/imgs/slideshow1.png"
              alt=""
              className="w-100 h-100"
            />
          </Col>
          <Col md={6}>
            <img
              src="/public/imgs/slideshow2.png"
              alt=""
              className="w-100 h-auto "
            />
            <img
              src="/public/imgs/slideshow3.png"
              alt=""
              className="w-100 h-auto mt-4"
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
