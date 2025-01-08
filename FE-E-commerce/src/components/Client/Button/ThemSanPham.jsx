import { Button } from "antd";
import { useState } from "react";
import ModalConfirmCart from "../Modals/ModalConfirmCart";

const ThemSanPham = () => {
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
        <ModalConfirmCart isModalVisible={isModalVisible} onClose={handleCancel} />
      </>
    );
}

export default ThemSanPham;