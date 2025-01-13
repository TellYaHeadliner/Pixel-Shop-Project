import { Button } from "antd";
import { useState } from "react";
import ModalConfirmCart from "../Modals/ModalConfirmCart";

const ThemSanPham = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    

    const openModalCart = () => {
        setIsModalVisible(true);

    }
    

    const handleCancel = () => {
        setIsModalVisible(false);
    }
    return (
      <>
        <Button style={{ width: "25%" }} onClick={openModalCart}>
          Thêm sản phẩm
        </Button>
        <ModalConfirmCart slug={props.slug} tenSanPham={props.tenSanPham} gia={props.gia} khuyenmai={props.khuyenmai} isModalVisible={isModalVisible} onClose={handleCancel} />
      </>
    );
}

export default ThemSanPham;