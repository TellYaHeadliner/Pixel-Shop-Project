import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import PropTypes from "prop-types"; 

import styles from "./ButtonNav.module.css";

const mapIcon = {
  "Liên hệ": BsFillTelephoneFill,
  "Giỏ hàng": FiShoppingCart,
  "Đăng nhập": FaUser,
};

const ButtonNav = ({ name }) => {
  const IconComponent = mapIcon[name];
  
  const iconClassName =
    name === "Giỏ hàng" ? styles.cart : 
    name === "Liên hệ" ? styles.contact : 
    name === "Đăng nhập" ? styles.user : "";

  return (
    <div className={styles.button}>
      {IconComponent && (
        <span className={`${styles.icon} ${iconClassName}`}>
          <IconComponent size="24px" color="#00" />
        </span>
      )}
      <span style={{color: "white" }}>{name}</span>
    </div>
  );
};

ButtonNav.propTypes = {
  name: PropTypes.string.isRequired, 
};

export default ButtonNav;

