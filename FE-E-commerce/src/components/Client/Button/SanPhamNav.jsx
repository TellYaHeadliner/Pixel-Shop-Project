import { AiOutlineArrowRight } from "react-icons/ai";
import PropTypes from "prop-types"; 

import styles from "./SanPhamNav.module.css"

const SanPham = ({ title, onNext }) => {
    return (
      <div className={styles.buttonBanner}>
        <span className={styles.buttonText}>{title}</span>
        <div className={styles.buttonIcon}>
          <span className="arrow" onClick={onNext} role="button" tabIndex={0}>
            <AiOutlineArrowRight className={styles.arrow} />
          </span>
        </div>
      </div>
    );
}

SanPham.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SanPham;