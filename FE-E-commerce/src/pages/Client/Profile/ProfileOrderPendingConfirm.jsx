import React, { useState } from "react";
import { Table, Button, Modal, message, Tag } from "antd";
import "antd/dist/reset.css";
import { useNavigate, useParams,axios } from "react-router-dom";


export default function ProfileOrderPendingConfirm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  
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
  
  const orderDataDetail = async()=>{
    try{
      const response= await axios.post(
         "http://127.0.0.1:8000/api/getListOrder"
      )
    }catch(e){
      message.error(e.repo)
    }
  }
  

  // const columns = [
  //   {
  //     title: "STT",
  //     dataIndex: "key",
  //     key: "key",
  //     render: (text, record, index) => index + 1,
  //     align: "center",
  //   },
  //   {
  //     title: "Hình ảnh",
  //     dataIndex: "image",
  //     key: "image",
  //     render: (image) => <img src={image} alt="Product" style={{ width: "50px" }} />,
  //     align: "center",
  //   },
  //   {
  //     title: "Tên sản phẩm",
  //     dataIndex: "productName",
  //     key: "productName",
  //     align: "center",
  //   },
  //   {
  //     title: "Giá",
  //     dataIndex: "price",
  //     key: "price",
  //     align: "center",
  //   },
  //   {
  //     title: "Số lượng",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //     align: "center",
  //   },
  // ];

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
          onClick={showModal} 
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
