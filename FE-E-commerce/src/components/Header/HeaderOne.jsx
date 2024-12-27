
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ButtonNav from "../Button/ButtonNav";
import Search from "../Search/Search";
import styles from "./HeaderOne.module.css"

const HeaderOne = () => {
  return (
    <Navbar
      expand="lg"
      className="px-3 text-center"
      style={{ background: "#8037DE" }}
    >
      <Search />
      <Nav className="d-flex">
        <Nav.Link href="/LienHe" className={styles.navLink}>
          <ButtonNav name="Liên hệ" />
        </Nav.Link>
        <Nav.Link href="/GioHang" className={styles.navLink}>
          <ButtonNav name="Giỏ hàng" />
        </Nav.Link>
        <Nav.Link href="/DangNhap" className={styles.navLink}>
          <ButtonNav name="Đăng nhập" />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default HeaderOne;
