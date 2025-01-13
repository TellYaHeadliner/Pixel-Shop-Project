import {
  Modal,
  Typography,
  Descriptions,
  InputNumber,
  Row,
  Col,
  Form,
  Button,
  notification,
} from "antd";
import { useState, useEffect, useContext } from "react";
import InputSoLuong from "../Input/InputSoLuong";
import { UserContext } from "../../../routes/UserContext";
import axios from "axios";

const { Title } = Typography;

export default function ModalConfirmCart({
  isModalVisible,
  onClose,
  tenSanPham,
  gia = 0,
  khuyenmai = 0,
  slug,
}) {
  const [soLuong, setSoLuong] = useState(1);
  const tongTien = soLuong * gia - gia * (khuyenmai / 100);
  const { cartItemCount, setCartItemCount, token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const handleFinish = async (values) => {
    // const data = {
    //     //token
    //     slug,
    //     soLuong: values.soLuong,
    // };
    if(loading) return;
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addProductInGioHang",
        {
          slug: slug,
          soLuong: values.soLuong,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data.success) {
        if (response.data.data === 2) {
          setCartItemCount(cartItemCount + 1);
        }
        notification.open({
          message: "Thông báo",
          description: "thêm sản phẩm vào giỏ hàng thành công",
        });
        setLoading(false);
        onClose();
      }
    } catch (err) {
      notification.open({
        message: "Thông báo lỗi",
        description: `vui lòng thử lại! ${err.response.data.message} `,
      });
    }
  };

  return (
    <>
      <Modal
        title="Thêm vào giỏ hàng"
        open={isModalVisible}
        onCancel={onClose}
        footer={null} // Ẩn nút mặc định
        width={800}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ soLuong }}
        >
          <Title level={1}>{tenSanPham}</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Giá">
              {(gia || 0).toLocaleString()} vnđ
            </Descriptions.Item>
            <Descriptions.Item label="Giảm giá">
              {khuyenmai || 0}%
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng">
              <Form.Item
                name="soLuong"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber
                  min={1}
                  max={100} // Giới hạn số lượng
                  onChange={(value) => setSoLuong(value || 1)}
                />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {(tongTien || 0).toLocaleString()} vnđ
            </Descriptions.Item>
          </Descriptions>
          <Form.Item>
            <Row justify="end" style={{ marginTop: "20px" }}>
              <Button type="primary" htmlType="submit">
                Thêm vào giỏ hàng
              </Button>
              <Button style={{ marginLeft: "10px" }} onClick={onClose}>
                Hủy
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
