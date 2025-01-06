import { Modal, Typography, Descriptions, InputNumber, Row, Col } from "antd";
import { useState, useEffect } from "react";
import InputSoLuong from "../Input/InputSoLuong";

const { Title } = Typography;

export default function ModalConfirmCart({ isModalVisible, onClose }) {
    const [soLuong, setSoLuong] = useState(1);
    const [giaSanPham, setGiaSanPham] = useState(15000000);
    const tongTien = soLuong * giaSanPham - (giaSanPham * 0.3)

    return (
      <>
        <Modal
          title="Thêm vào giỏ hàng"
          open={isModalVisible}
          onOk={onClose}
          onCancel={onClose}
          width={800}
        >
          <Title level={1}>
            Laptop Dell Vostro 3420 i5 1235U/8GB/512GB/OfficeHS 
            Win11 (V4I5702W1)
          </Title>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Giá"> {giaSanPham.toLocaleString("vi-VN")} vnđ </Descriptions.Item>
                <Descriptions.Item label="Giảm giá">30%</Descriptions.Item>
                <Descriptions.Item label="Số lượng">
                    <InputSoLuong soLuong={soLuong} setSoLuong={setSoLuong}/>
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">{tongTien.toLocaleString("vi-VN")} vnđ </Descriptions.Item>
            </Descriptions>
        </Modal>
      </>
    );
}