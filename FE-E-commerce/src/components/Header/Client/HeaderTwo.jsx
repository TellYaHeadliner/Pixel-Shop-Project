import { Navbar, Nav, Button} from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const HeaderTwo = () => {
  return (
    <Navbar expand="lg" className="px-4" style={{ background: "#8037DE" }}>
      <Button className="d-flex align-items-center">
        <FaBars className="me-2" />
        DANH MỤC SẢN PHẨM
      </Button>

      {/* Menu liên kết */}
      <Nav className="mx-auto">
        <Nav.Link
          href="/"
          className="text-danger fw-bold fs-3 me-lg-5 text-light"
        >
          Trang chủ
        </Nav.Link>
        <Nav.Link
          href="/about"
          className="text-dark fw-bold fs-3 me-lg-5 text-light"
        >
          Giới thiệu
        </Nav.Link>
        <Nav.Link
          href="/news"
          className="text-dark fw-bold fs-3 me-lg-5 text-light"
        >
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
    </Navbar>
  );
};

export default HeaderTwo;
