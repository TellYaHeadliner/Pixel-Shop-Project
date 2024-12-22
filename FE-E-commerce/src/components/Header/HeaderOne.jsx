
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

const HeaderOne = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand href="/">Logo</Navbar.Brand>
      <Form className="d-flex flex-grow-1 mx-3">
        <FormControl
          type="search"
          placeholder="Tìm kiếm"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="inline-primary">
          <BsSearch /> 
        </Button>
      </Form>
      <Nav>
        <Nav.Link href="/contact">
          <BsFillTelephoneFill /> Liên hệ
        </Nav.Link>
        <Nav.Link href="/LienHe">
          <BsCart /> Giỏ hàng
        </Nav.Link>
        <Nav.Link href="/DangNhap">
          <BsFillPersonFill /> Đăng nhập/Đăng ký
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default HeaderOne;
