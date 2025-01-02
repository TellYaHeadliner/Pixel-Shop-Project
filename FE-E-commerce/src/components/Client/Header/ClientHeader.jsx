import { useState } from "react";
import { Layout, Input, Button, Tree } from "antd";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser, FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import ModalLogin from "../Modals/ModalLogin";
import styles from "./ClientHeader.module.scss";

const { Header } = Layout;

// Mapping icon names to their respective components
const mapIcon = {
  "Liên hệ": BsFillTelephoneFill,
  "Giỏ hàng": FiShoppingCart,
  "Đăng nhập": FaUser,
};

// ButtonNavHeader component
const ButtonNavHeader = ({ name, onClick, backgroundColor }) => {
  const IconComponent = mapIcon[name];

  return (
    <div
      className={styles.button}
      onClick={onClick}
      style={{ backgroundColor }}
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
      <span className={styles.buttonText}>{name}</span>
    </div>
  );
};

const ClientHeader = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [titleLogin, setTitleLogin] = useState(false);
  const [showTree, setShowTree] = useState(false);

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
      ],
    },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.searchAndButtons}>
        <Input.Search
          placeholder="Tìm kiếm"
          size="large"
          className={styles.searchInput}
          style={{ width: '70%', height: '70%' }}
        />
        <ButtonNavHeader name="Liên hệ" backgroundColor="#4CAF50" />
        <ButtonNavHeader name="Giỏ hàng" backgroundColor="#FF9800" />
        <ButtonNavHeader
          name="Đăng nhập"
          backgroundColor="#2196F3"
          onClick={() => handleShowModalLogin(true)}
        />
      </div>

      <div className={styles.topRow}>
        <Button onClick={toggleTree} icon={<FaBars />} className={styles.menuButton}>
          DANH MỤC SẢN PHẨM
        </Button>
        {showTree && (
          <div className={styles.tree}>
            <Tree
              showLine
              treeData={treeData}
              defaultExpandAll
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

      <ModalLogin
        show={showModalLogin}
        onClose={handleCloseModalLogin}
        titleLogin={titleLogin}
      />
    </Header>
  );
};

export default ClientHeader;


