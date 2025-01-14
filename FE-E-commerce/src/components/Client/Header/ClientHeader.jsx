import React, { useState, useEffect } from "react";
import { Layout, Button, Tree, Badge } from "antd";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import apiService from "../../../api/api";
import { useNavigate, Link } from "react-router-dom";
import ModalLoginAndRegister from "../Modals/ModalLoginAndRegister";
import styles from "./ClientHeader.module.scss";
import Cookies from "js-cookie";

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

export const ClientHeader = () => {
  const navigate = useNavigate();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [titleLogin, setTitleLogin] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [treeData, setTreeData] = useState([]); // State to hold category data

  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const cartItemCount = Cookies.get('cartItemCount') ? parseInt(Cookies.get('cartItemCount')) : 0;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getListDanhMuc();
        const formattedData = response.data.data.map(category => ({
          title: category.tenDanhMuc,
          key: category.idDanhMuc, // Sử dụng idDanhMuc làm key
          children: category.child.map(child => ({
            title: child.tenDanhMuc,
            key: child.idDanhMuc,
            children: child.child || [] // Nếu có danh mục con
          })) || [] // Đảm bảo rằng nếu không có child, nó sẽ là mảng rỗng
        }));
        setTreeData(formattedData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

  const onSelect = (selectedKeys, info) => {
    console.log('Selected:', selectedKeys, info);
    // Navigate to a different page or perform an action based on selected category
    navigate(`/category/${selectedKeys[0]}`); // Example to navigate to category page
  };

  const handleLoginClick = () => {
    if (user && user.email) {
      navigate("/profile");
    } else {
      handleShowModalLogin(true);
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
            onClick={() => navigate("/contact")}
          />
        </Badge>
        <Badge count={cartItemCount} overflowCount={99}>
          <IconButtonNavHeader
            name="Giỏ hàng"
            className={styles.cartButton}
            onClick={() => navigate("/shoppingcart")}
          />
          <p className={styles.cartButton_total}>Tổng: 100.000vnđ</p>
        </Badge>
        <Badge>
          <IconButtonNavHeader
            name="Đăng nhập"
            className={styles.loginButton}
            onClick={handleLoginClick}
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