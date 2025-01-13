import { AiOutlineArrowRight } from "react-icons/ai";
import PropTypes from "prop-types"; 

import styles from "./SanPhamNav.module.css"

const SanPham = ({ title}) => {
    return (
      <div className={styles.buttonBanner}>
        <span className={styles.buttonText}>{title}</span>
      </div>
    );
}

SanPham.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SanPham;