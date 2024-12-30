import { Container, Row, Col } from "react-bootstrap";
import SanPhamNav from "../../components/Button/Client/SanPhamNav";
import SanPhamCard from "../../components/Cards/Clients/SanPhamCard";
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
        <Row className="d-flex justify-content-center">
          <Col md={4} className="p-1">
            <SanPhamCard />
          </Col>
          <Col md={4} className="p-1">
            <SanPhamCard />
          </Col>
          <Col md={4} className="p-1">
            <SanPhamCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
