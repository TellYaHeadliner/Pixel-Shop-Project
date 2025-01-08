import React, { useState } from "react";
import { Layout, Row, Col, Button, Input, Modal, Radio } from "antd";
//import type { RadioChangeEvent } from 'antd';

import { useLocation } from "react-router-dom"; // Import useLocation
import "./Payment.scss";

const { Content } = Layout;

const Payment = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      name: "Trần Thành Logn",
      phone: "(+84) 0306221140",
      address: "123/32/14 Thôn/Phường/Thành phố",
      isDefault: false,
    },
    {
      name: "Trần Hạnh Logn",
      phone: "(+84) 0306221140",
      address: "123/32/14 Thôn/Phường/Thành phố",
      isDefault: true,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      const newAddressObj = {
        name: "Người dùng mới",
        phone: "(+84) 0000000000",
        address: newAddress,
        isDefault: false,
      };
      setAddresses([...addresses, newAddressObj]);
      setNewAddress("");
    }
    setIsModalVisible(false);
  };

  const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout className="checkout-layout">
      <Content className="checkout-content">
        <h2 className="checkout-title">Thông tin nhận hàng</h2>

        <Row gutter={[32, 16]}>
          <Col span={15} className="info-section">
            <div className="info-header">
              {/* Hiển thị thông tin địa chỉ người nhận */}
              <h3>Nguyễn Văn A</h3>
              <p>(+84) 916553230</p>
              <p>431/21 Nguyễn Văn Ai, phường 21, quận Bình Thạnh</p>
              <Button type="link" onClick={() => setIsModalVisible(true)}>Thay đổi</Button>
            </div>

            <div className="product-list">
              {selectedItems.map(item => (
                <div className="product-item" key={item.id}>
                  <span className="product-name">{item.name}</span>
                  <span className="product-price">{(item.price * item.quantity).toLocaleString()} đ</span>
                  <span className="product-quantity">Số lượng: {item.quantity}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col span={8} className="summary-section">
            <h3>Thanh toán</h3>
            <div className="summary-item">
              <span>Thành tiền:</span>
              <span className="total-price">{totalAmount.toLocaleString()} đ</span>
            </div>
            <div className="payment-method">
              <h4>Phương thức thanh toán</h4>
              <Radio value="cash">Thanh toán bằng tiền mặt</Radio>
              <Radio value="VNPay">Thanh toán bằng VNPay</Radio>
            </div>
            <Button type="primary" className="confirm-button">
              Xác nhận
            </Button>
          </Col>
        </Row>

        {/* Modal để thay đổi địa chỉ */}
        <Modal
          title="Địa chỉ của tôi"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleAddAddress}>
              Cập nhật
            </Button>,
          ]}
        >
          <div>
            {addresses.map((address, index) => (
              <Radio
                key={index}
                value={index}
                checked={selectedAddress === index}
                onChange={() => setSelectedAddress(index)}
              >
                {address.name} {address.phone} <br />
                {address.address} <br />
                {address.isDefault && <span>(Mặc định)</span>}
              </Radio>
            ))}
            <Input
              placeholder="Nhập địa chỉ mới"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              style={{ margin: "16px 0" }}
            />
            <Button type="link" onClick={handleAddAddress}>
              + Thêm địa chỉ
            </Button>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Payment;