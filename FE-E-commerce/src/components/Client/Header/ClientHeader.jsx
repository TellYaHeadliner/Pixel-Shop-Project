import React, { useState, useContext } from "react";
import { Layout, Button, Tree, Badge } from "antd";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../../../routes/UserContext.jsx'; // Import UserContext

import ModalLoginAndRegister from "../Modals/ModalLoginAndRegister";
import styles from "./ClientHeader.module.scss";

const { Header } = Layout;

const iconMap = {
  "Liên hệ": BsFillTelephoneFill,
  "Giỏ hàng": FiShoppingCart,
  "Đăng nhập": FaUser,
};

const IconButtonNavHeader = ({ name, onClick, className }) => {
  const IconComponent = iconMap[name];

  return (
    <div
      className={`${styles.button} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onClick(); }}
      aria-label={name}
    >
      {IconComponent && (
        <span className={styles.icon}>
          <IconComponent size="24px" color="#fff" />
        </span>
      )}
    </div>
  );
};

const ClientHeader = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get user context
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [titleLogin, setTitleLogin] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const { cartItemCount } = useContext(UserContext); 

  const handleShowModalLogin = (isLogin = true) => {
    setTitleLogin(isLogin);
    setShowModalLogin(true);
  };

  const handleCloseModalLogin = () => setShowModalLogin(false);

  const toggleTree = () => {
    setShowTree((prev) => !prev);
  };

  const handleLoginSuccess = () => {
    handleCloseModalLogin();
    navigate("/profile");
  };

  const handleLoginIconClick = () => {
    if (user) {
      navigate("/profile"); // Navigate to profile if logged in
    } else {
      handleShowModalLogin(true); // Show login modal if not logged in
    }
  };

  return (
    <Header className={styles.header}>
      <div className={styles.searchAndButtons}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
        <Badge>
          <IconButtonNavHeader
            name="Liên hệ"
            className={styles.contactButton}
            onClick={() => (navigate("/contact"))}
          />
        </Badge>
        <Badge count={cartItemCount} overflowCount={99}>
          <IconButtonNavHeader
            name="Giỏ hàng"
            className={styles.cartButton}
            onClick={() => navigate("/shoppingcart")}
          />
          <p className={styles.cartButton_total}>Tổng: 100.000.000vnđ</p>
        </Badge>
        <Badge>
          <IconButtonNavHeader
            name="Đăng nhập"
            className={styles.loginButton}
            onClick={handleLoginIconClick} // Updated click handler
          />
        </Badge>
      </div>

      <div className={styles.topRow}>
        <Button onClick={toggleTree} icon={<FaBars />} className={styles.CategoryButton}>
          DANH MỤC SẢN PHẨM
        </Button>
        {showTree && (
          <div className={styles.tree}>
            <Tree
              showLine
              treeData={treeData}
              onSelect={onSelect}
              style={{ flex: 1 }}
            />
          </div>
        )}
        <nav className={styles.navigation}>
          <Link to="/" className={styles.link}>Trang chủ</Link>
          <Link to="/about" className={styles.link}>Giới thiệu</Link>
          <Link to="/news" className={styles.link}>Tin tức</Link>
        </nav>

        <div className={styles.logo}>
          <img
            src="https://via.placeholder.com/80x50"
            alt="Logo"
            className={styles.logoImage}
          />
        </div>
      </div>

      <ModalLoginAndRegister
        show={showModalLogin}
        onClose={handleCloseModalLogin}
        onLoginSuccess={handleLoginSuccess}
        titleLogin={titleLogin}
      />
    </Header>
  );
};

export default ClientHeader;