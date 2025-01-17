import React, { useEffect, useState, useContext } from "react";
import { Layout, Row, Col, Button, Modal, Radio, Typography, Input, message } from "antd";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../routes/UserContext";
import apiService from "../../../api/api";
import "./Payment.scss";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PaymentBasic = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const { idNguoiDung } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({ hoVaTen: '', diaChi: '', sdt: '', note: '', loaiDiaChi: '1' });

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!idNguoiDung) {
        message.error("Không tìm thấy ID người dùng.");
        return;
      }

      try {
        const response = await apiService.getDiaChiUser(idNguoiDung);
        if (response.data.success) {
          const userAddresses = response.data.data;
          const defaultAddr = userAddresses.find(addr => addr.macDinh === 1);
          setAddresses(userAddresses);
          setDefaultAddress(defaultAddr);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Lỗi khi lấy địa chỉ: " + error.message);
      }
    };

    fetchAddresses();
  }, [idNguoiDung]);

  const handleConfirmAddress = async () => {
    if (!selectedAddressId) {
      message.error("Vui lòng chọn một địa chỉ.");
      return;
    }

    const updateData = {
      idDiaChi: selectedAddressId,
      idNguoiDung,
    };

    try {
      const response = await apiService.updateDefaultLocation(updateData);
      if (response.data.success) {
        const updatedAddress = addresses.find(addr => addr.idDiaChi === selectedAddressId);
        setDefaultAddress(updatedAddress);
        message.success("Cập nhật địa chỉ giao hàng thành công!");
        setIsModalVisible(false);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật địa chỉ: " + error.message);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.hoVaTen || !newAddress.diaChi || !newAddress.sdt) {
      message.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }

    const addressData = {
      idNguoiDung,
      hoVaTen: newAddress.hoVaTen,
      diaChi: newAddress.diaChi,
      sdt: newAddress.sdt,
      note: newAddress.note,
      loaiDiaChi: newAddress.loaiDiaChi,
    };

    try {
      const response = await apiService.addLocation(addressData);
      if (response.data.success) {
        message.success("Thêm địa chỉ thành công!");
        setNewAddress({ hoVaTen: '', diaChi: '', sdt: '', note: '', loaiDiaChi: '1' });
        setIsAddModalVisible(false);
        // Refresh address list
        const updatedResponse = await apiService.getDiaChiUser(idNguoiDung);
        setAddresses(updatedResponse.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Lỗi khi thêm địa chỉ: " + error.message);
    }
  };

  const handleConfirmPayment = () => {
    if (!defaultAddress) {
      message.error("Vui lòng chọn địa chỉ giao hàng.");
      return;
    }
    // Logic để xác nhận thanh toán
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
                {defaultAddress && (
                  <div>
                    <h3>{defaultAddress.note}</h3>
                    <Paragraph>{defaultAddress.sdt}</Paragraph>
                    <Paragraph>{defaultAddress.diaChi}</Paragraph>
                    <Button type="link" onClick={() => setIsModalVisible(true)}>Thay đổi</Button>
                  </div>
                )}
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
          title="Chọn địa chỉ giao hàng"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>Hủy</Button>,
            <Button key="submit" type="primary" onClick={handleConfirmAddress}>
              Xác nhận
            </Button>,
            <Button key="add" type="default" onClick={() => { setIsAddModalVisible(true); setIsModalVisible(false); }}>
              Thêm địa chỉ mới
            </Button>,
          ]}
        >
          <div>
            <h4>Địa chỉ có sẵn:</h4>
            {addresses.map((address) => (
              <Radio
                key={address.idDiaChi}
                value={address.idDiaChi}
                onChange={() => setSelectedAddressId(address.idDiaChi)}
                checked={selectedAddressId === address.idDiaChi}
              >
                {address.note} - {address.sdt} <br />
                {address.diaChi}
              </Radio>
            ))}
            {selectedAddressId === null && (
              <Paragraph type="warning">Bạn chưa chọn địa chỉ nào!</Paragraph>
            )}
          </div>
        </Modal>

        <Modal
          title="Thêm địa chỉ mới"
          open={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsAddModalVisible(false)}>Hủy</Button>,
            <Button key="submit" type="primary" onClick={handleAddAddress}>
              Thêm
            </Button>,
          ]}
        >
          <Input
            placeholder="Họ và tên"
            value={newAddress.hoVaTen}
            onChange={(e) => setNewAddress({ ...newAddress, hoVaTen: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <Input
            placeholder="Địa chỉ"
            value={newAddress.diaChi}
            onChange={(e) => setNewAddress({ ...newAddress, diaChi: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <Input
            placeholder="Số điện thoại"
            value={newAddress.sdt}
            onChange={(e) => setNewAddress({ ...newAddress, sdt: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <Input
            placeholder="Ghi chú"
            value={newAddress.note}
            onChange={(e) => setNewAddress({ ...newAddress, note: e.target.value })}
            style={{ marginBottom: 16 }}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default PaymentBasic;