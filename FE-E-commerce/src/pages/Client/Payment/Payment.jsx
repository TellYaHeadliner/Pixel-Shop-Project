import React, { useEffect, useState, useContext } from "react";
import { Layout, Row, Col, Button, Modal, Radio, Typography, Input, message, Card } from "antd";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../routes/UserContext";
import apiService from "../../../api/api";
import "./Payment.scss";
import axios from "axios";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PaymentBasic = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const { idNguoiDung, token } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({ hoVaTen: '', diaChi: '', sdt: '', note: '', loaiDiaChi: '1' });
  const [paymentMethod, setPaymentMethod] = useState("0");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value); 
  };
  console.log(paymentMethod);

  axios.defaults.withCredentials=true;

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!idNguoiDung) {
        message.error("Không tìm thấy ID người dùng.");
        return;
      }

      try {
        const response = await apiService.getDiaChiUser(idNguoiDung, token);
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
  }, [idNguoiDung, token]);
  
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
      const response = await apiService.updateDefaultLocation(updateData, token);
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
  
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^0\d{0,11}$/; 
    return phoneRegex.test(phone);
  };
  const validateDiaChi = (diachi) => {
    if (diachi.length <= 10) {
        return false;
    }
    const isAllDigits = /^\d+$/.test(diachi);
    if (isAllDigits) {
        return false; 
    }

    const alphanumericRegex = /[a-zA-Z]/;
    return alphanumericRegex.test(diachi);
};
  const handleAddAddress = async () => {
    if (!newAddress.hoVaTen || !newAddress.diaChi || !newAddress.sdt) {
      message.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    
    if (!validatePhoneNumber(newAddress.sdt)) {
      message.error("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại bắt đầu bằng 0 và tối đa 12 số.");
      return;
    }
    if(!validateDiaChi(newAddress.diaChi)) {
      message.error("Địa chỉ không hợp lệ.");
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
      const response = await apiService.addLocation(addressData, token);
      if (response.data.success) {
        message.success("Thêm địa chỉ thành công!");
        setNewAddress({ hoVaTen: '', diaChi: '', sdt: '', note: '', loaiDiaChi: '1' });
        setIsAddModalVisible(false);
        const updatedResponse = await apiService.getDiaChiUser(idNguoiDung, token);
        setAddresses(updatedResponse.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Lỗi khi thêm địa chỉ: " + error.message);
    }
  };

  const handleDeleteAddress = async (idDiaChi) => {
    try {
      const response = await apiService.deleteLocation({ idDiaChi }, token);
      if (response.data.success) {
        message.success("Xóa địa chỉ thành công!");
        const updatedResponse = await apiService.getDiaChiUser(idNguoiDung, token);
        setAddresses(updatedResponse.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Lỗi khi xóa địa chỉ: " + error.message);
    }
  };

  const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0); // tongtien

  const handleConfirmPayment = async () => {
    if (!defaultAddress) {
      message.error("Vui lòng chọn địa chỉ giao hàng.");
      return;
    }
    try {
      console.log(token);
      const response = await axios.post(
        'http://127.0.0.1:8000/api/create-payment',
        {
          idDiaChi: defaultAddress.idDiaChi,
          listSanPham: selectedItems,
          phuongThucThanhToan:paymentMethod,
          tongSoTien:totalAmount
        },
        {
          headers:{
            "Content-Type": "application/json",
              'Authorization':`Bearer ${token}`
          }
        }
      ); 
      console.log(response.data)
      if (response.data.success) {
        window.location.href=response.data.data;
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <Layout className="checkout-layout">
      <Content className="checkout-content">
        <Title className="checkout-title">Thông tin nhận hàng</Title>

        <Row gutter={[32, 16]}>
          <Col span={16}>
            <div className="info-section">
              <div className="info-header">
                {defaultAddress && (
                  <Card style={{ marginBottom: 16 }}>
                    <h3>{defaultAddress.note}</h3>
                    <Paragraph>{defaultAddress.sdt}</Paragraph>
                    <Paragraph>{defaultAddress.diaChi}</Paragraph>
                    <Button type="link" onClick={() => setIsModalVisible(true)}>Thay đổi</Button>
                  </Card>
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
                <Radio.Group onChange={handleChange} >
                  <Radio value="0">Tiền mặt</Radio>
                  <Radio value="1">VNPay</Radio>
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
              <Card key={address.idDiaChi} style={{ marginBottom: 16 }}>
                <Radio
                  value={address.idDiaChi}
                  onChange={() => setSelectedAddressId(address.idDiaChi)}
                  checked={selectedAddressId === address.idDiaChi}
                >
                  {address.note} - {address.sdt} <br />
                  {address.diaChi}
                </Radio>
                <Button type="link" danger onClick={() => handleDeleteAddress(address.idDiaChi)}>Xóa</Button>
              </Card>
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
            required
            onChange={(e) => setNewAddress({ ...newAddress, hoVaTen: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <Input
            placeholder="Địa chỉ (hãy nhập đầy đủ và chính xác nơi bạn muốn giao hàng)"
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