import React, { useState } from "react";
import { Table, Button, Modal, message, Tag } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";

export default function ProfileOrderBeingShip() {
  const [orderData, setOrderData] = useState({
    orderId: "VNP14728864",
    customerName: "Nguyễn Văn A",
    deliveryAddress: "123 Nguyễn Văn B, phường 26, quận Bình Thạnh, TPHCM",
    totalAmount: "6,950,000 vnd",
    status: 1, // Trạng thái: 0 (Chờ xác nhận)
    phuongThucThanhToan: "Chuyển khoản - VNPAY - NCB",
    paymentTime: "14:31:23 12/08/2024",
    phoneNumber: "0919595678",
    orderDetails: [
      {
        key: 1,
        image: "https://cdn.nguyenkimmall.com/images/detailed/824/dien-thoai-iphone-14-pro-max-256gb-vang-3.jpg",
        productName: "Xiaomi Redmi Turbo 5",
        price: "5,690,000 vnd",
        quantity: 1,
      },
      {
        key: 2,
        image: "https://genk.mediacdn.vn/139269124445442048/2023/1/15/007gdalpgy1ha1uzzyp9ej30r40tcjun-1673600536636-1673600536858739192051-1673749582485-16737495830061918081220.jpg",
        productName: "Xiaomi Redmi Turbo 5",
        price: "5,690,000 vnd",
        quantity: 1,
      },
      {
        key: 3,
        image: "https://cdn.nguyenkimmall.com/images/detailed/691/10047356-dien-thoai-xiaomi-redmi-9a-2gb-32gb-xanh-la-1.jpg",
        productName: "Xiaomi Redmi Turbo 6",
        price: "5,690,000 vnd",
        quantity: 1,
      },
    ],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hiển thị thông báo xác nhận hủy đơn
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setOrderData({ ...orderData, status: 3 });
    setIsModalVisible(false); 
    message.success("Đơn hàng đã được hủy thành công!"); 
   
  };

  // Hủy bỏ hành động
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderOrderStatus = (status) => {
    switch (status) {
      case 0:
        return <Tag color="blue">Chờ xác nhận</Tag>;
      case 1:
        return <Tag color="orange">Đang vận chuyển</Tag>;
      case 2:
        return <Tag color="green">Đã nhận</Tag>;
      case 3:
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Product" style={{ width: "50px" }} />,
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Lịch sử đơn hàng {orderData.orderId}</h2>
      <p>
        <strong>Tên khách hàng:</strong> {orderData.customerName}
      </p>
      <p>
        <strong>Địa chỉ giao hàng:</strong> {orderData.deliveryAddress}
      </p>
      <p>
        <strong>Tổng số tiền:</strong> {orderData.totalAmount}
      </p>
      <p>
        <strong>Trạng thái:</strong> {renderOrderStatus(orderData.status)}
      </p>
      <p>
        <strong>Phương thức thanh toán:</strong> {orderData.phuongThucThanhToan}
      </p>
      <p>
        <strong>Ngày thanh toán:</strong> {orderData.paymentTime}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {orderData.phoneNumber}
      </p>

      {orderData.status === 0 && ( 
        <Button
          type="primary"
          danger
          style={{ marginTop: "20px", marginLeft:'100%'}}
          onClick={showModal} // Mở modal xác nhận khi nhấn
        >
          Hủy đơn
        </Button>
      )}

      <h3 style={{ marginTop: "20px" }}>Chi tiết đơn hàng:</h3>
      <Table dataSource={orderData.orderDetails} columns={columns} pagination={false} bordered />

      {/* Modal xác nhận */}
      <Modal
        title="Xác nhận hủy đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </div>
  );
}
