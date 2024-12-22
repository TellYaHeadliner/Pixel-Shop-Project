import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const HeaderTwo = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom py-3">
      <Container>
        {/* Danh mục sản phẩm */}
        <Button
          variant="outline-secondary"
          className="d-flex align-items-center"
        >
          <FaBars className="me-2" />
          DANH MỤC SẢN PHẨM
        </Button>

        {/* Menu liên kết */}
        <Nav className="mx-auto">
          <Nav.Link href="/" className="text-danger fw-bold">
            Trang chủ
          </Nav.Link>
          <Nav.Link href="/about" className="text-dark fw-bold">
            Giới thiệu
          </Nav.Link>
          <Nav.Link href="/news" className="text-dark fw-bold">
            Tin tức
          </Nav.Link>
        </Nav>

        {/* Logo */}
        <div className="logo">
          <img
            src="https://via.placeholder.com/80x50" // Link logo placeholder
            alt="Logo"
            className="img-fluid"
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderTwo;
