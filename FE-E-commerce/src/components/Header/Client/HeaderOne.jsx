
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";


import ButtonNavHeader from "../../Button/Client/ButtonNavHeader";
import Search from "../../Search/Client/Search";
import ModalLogin from "../../Modals/Client/ModalLogin";
import styles from "./HeaderOne.module.css"


const HeaderOne = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [titleLogin, setTitleLogin] = useState(false);

    const handleShowModalLogin = (isLogin = true) => {
      setTitleLogin(isLogin);
      setShowModalLogin(true);
    };
  const handleCloseModalLogin = () => setShowModalLogin(false);
  
  return (
    <Navbar
      expand="lg"
      className="px-3 text-center"
      style={{ background: "#8037DE" }}
    >
      <Search />
      <Nav className="d-flex">
        <Nav.Link href="/LienHe" className={styles.navLink}>
          <ButtonNavHeader name="Liên hệ" />
        </Nav.Link>
        <Nav.Link href="/GioHang" className={styles.navLink}>
          <ButtonNavHeader name="Giỏ hàng" />
        </Nav.Link>
        <Nav.Link className={styles.navLink}>
          <div onClick={() => handleShowModalLogin(true)}>
            <ButtonNavHeader name="Đăng nhập" />
          </div>
          <ModalLogin
            show={showModalLogin}
            onClose={handleCloseModalLogin}
            titleLogin={titleLogin}
          />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default HeaderOne;
