import React, { useState } from "react";
import { Layout, Row, Col, Button, Input, Modal, Radio, Typography } from "antd";
import { useLocation } from "react-router-dom";
import "./Payment.scss";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PaymentBasic = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([
    { name: "Trần Thành Logn", phone: "(+84) 0306221140", address: "123/32/14 Thôn/Phường/Thành phố", isDefault: false },
    { name: "Trần Hạnh Logn", phone: "(+84) 0306221140", address: "123/32/14 Thôn/Phường/Thành phố", isDefault: true },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  console.log(selectedItems);
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

  const handleConfirmPayment = () => {
    setIsSuccessModalVisible(true);
  };

  const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout className="checkout-layout">
      <Content className="checkout-content">
        <Title className="checkout-title">Thông tin nhận hàng</Title>
        
        <Row gutter={[32, 16]}>
          <Col span={16}>
            <div className="info-section">
              <div className="info-header">
                <h3>Nguyễn Văn A</h3>
                <Paragraph>(+84) 916553230</Paragraph>
                <Paragraph>431/21 Nguyễn Văn Ai, phường 21, quận Bình Thạnh</Paragraph>
                <Button type="link" onClick={() => setIsModalVisible(true)}>Thay đổi</Button>
              </div>

              <div className="product-list">
                {selectedItems.map(item => (
                  <div className="product-item" key={item.id}>
                    <span>{item.name}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} đ (Số lượng: {item.quantity})</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col span={7} offset={1}>
            <div className="summary-section">
              <Title level={4}>Thanh toán</Title>
              <div className="summary-item">
                <span>Thành tiền:</span>
                <span className="total-price">{totalAmount.toLocaleString()} đ</span>
              </div>
              <div className="payment-method">
                <h4>Phương thức thanh toán</h4>
                <Radio.Group>
                  <Radio value="cash">Tiền mặt</Radio>
                  <Radio value="VNPay">VNPay</Radio>
                </Radio.Group>
              </div>
              <Button type="primary" className="confirm-button" onClick={handleConfirmPayment}>Xác nhận</Button>
            </div>
          </Col>
        </Row>

        <Modal
          title="Địa chỉ của tôi"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>Hủy</Button>,
            <Button key="submit" type="primary" onClick={handleAddAddress}>Cập nhật</Button>,
          ]}
        >
          <div>
            {addresses.map((address, index) => (
              <Radio key={index} value={index} checked={selectedAddress === index} onChange={() => setSelectedAddress(index)}>
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
            <Button type="link" onClick={handleAddAddress}>+ Thêm địa chỉ</Button>
          </div>
        </Modal>

        <Modal
          title="Thông báo"
          visible={isSuccessModalVisible}
          onCancel={() => setIsSuccessModalVisible(false)}
          footer={[
            <Button key="ok" type="primary" onClick={() => setIsSuccessModalVisible(false)}>OK</Button>,
          ]}
        >
          <p>Đơn hàng của bạn đã được thanh toán thành công!</p>
          <h4>Thông tin đơn hàng:</h4>
          <div className="product-list">
            {selectedItems.map(item => (
              <div style={{width:"100%"}} className="product-item" key={item.id}>
                <span>{item.name} </span>
                <span style={{textAlign:"right"}}> {(item.price * item.quantity).toLocaleString()}  đ (Số lượng: {item.quantity})</span>
              </div>
            ))}
          </div>
          <div className="summary-item">
            <strong>Tổng tiền: {totalAmount.toLocaleString()} đ</strong>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default PaymentBasic;