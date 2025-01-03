import React, { useState } from "react";
import { Layout, Button, Tree, Badge } from "antd";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import ModalLoginAndRegister from "../Modals/ModalLoginAndRegister";
import styles from "./ClientHeader.module.scss";

const { Header } = Layout;

// Mapping icon names to their respective components
const iconMap = {
  "Liên hệ": BsFillTelephoneFill,
  "Giỏ hàng": FiShoppingCart,
  "Đăng nhập": FaUser,
};

// IconButtonNavHeader component
const IconButtonNavHeader = ({ name, onClick, className }) => {
  const IconComponent = iconMap[name];

  return (
    <div
      className={`${styles.button} ${className}`} // Thêm className cho nút
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
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [titleLogin, setTitleLogin] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(20); // Số lượng giỏ hàng

  const handleShowModalLogin = (isLogin = true) => {
    setTitleLogin(isLogin);
    setShowModalLogin(true);
  };

  const handleCloseModalLogin = () => setShowModalLogin(false);

  const toggleTree = () => {
    setShowTree((prev) => !prev);
  };

  const treeData = [
    {
      title: 'Sản phẩm 1',
      key: '0-0',
      children: [
        { title: 'Danh mục 1-1', key: '0-0-0' },
        { title: 'Danh mục 1-2', key: '0-0-1' },
      ],
    },
    {
      title: 'Sản phẩm 2',
      key: '0-1',
      children: [
        { title: 'Danh mục 2-1', key: '0-1-0' },
        { title: 'Danh mục 2-2', key: '0-1-1' },
        {
          title: 'Danh mục 2-3',
          key: '0-1-2',
          children: [
            { title: 'Danh mục 2-3-1', key: '0-1-2-0' },
            { title: 'Danh mục 2-3-2', key: '0-1-2-1' },
          ],
        },
      ],
    },
  ];

  const onSelect = (selectedKeys, info) => {
    console.log('Selected:', selectedKeys, info);
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
          />
        </Badge>
        <Badge count={cartItemCount} overflowCount={10}>
          <IconButtonNavHeader
            name="Giỏ hàng"
            className={styles.cartButton}
          />
          <p className={styles.cartButton_total}>Tổng: 200k</p>
        </Badge>
        <Badge>
          <IconButtonNavHeader
            name="Đăng nhập"
            className={styles.loginButton}
            onClick={() => handleShowModalLogin(true)}
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
              onSelect={onSelect} // Đảm bảo onSelect được gọi
              style={{ flex: 1 }}
            />
          </div>
        )}
        <nav className={styles.navigation}>
          <a href="/" className={styles.link}>Trang chủ</a>
          <a href="/about" className={styles.link}>Giới thiệu</a>
          <a href="/news" className={styles.link}>Tin tức</a>
        </nav>

        <div className={styles.logo}>
          <img
            src="https://via.placeholder.com/80x50" // Link logo placeholder
            alt="Logo"
            className={styles.logoImage}
          />
        </div>
      </div>

      <ModalLoginAndRegister
        show={showModalLogin}
        onClose={handleCloseModalLogin}
        titleLogin={titleLogin}
      />
    </Header>
  );
};

export default ClientHeader;