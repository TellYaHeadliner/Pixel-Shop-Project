import { BsArrowRight } from "react-icons/bs";
import PropTypes from "prop-types"; 

import styles from "./SanPhamNav.module.css"

const SanPham = ({ title }) => {
    return (
        <div className={styles.buttonBanner}>
            <span className={styles.buttonText}>
                {title}
            </span>
            <div className={styles.buttonIcon}>
                <span className="arrow">
                    <BsArrowRight className={styles.arrow}/>
                </span>
            </div>
        </div>
    )
}

SanPham.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SanPham;