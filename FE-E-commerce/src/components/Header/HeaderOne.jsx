
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ButtonNav from "../Button/ButtonNav";
import Search from "../Search/Search";

const HeaderOne = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Search />
      <Nav>
        <Nav.Link href="/LienHe">
          <ButtonNav name="Liên hệ" />
        </Nav.Link>
        <Nav.Link href="/GioHang">
          <ButtonNav name="Giỏ hàng" />
        </Nav.Link>
        <Nav.Link href="/DangNhap">
          <ButtonNav name="Đăng nhập/Đăng ký" />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default HeaderOne;
