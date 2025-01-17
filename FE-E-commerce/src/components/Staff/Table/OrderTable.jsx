import { Table, Button, message, Popconfirm } from "antd";
import { useState } from "react";

import DetailOrder from "../Modal/DetailOrder";
import donhangService from "../../../services/donHangService";

const OrderTable = ({ data }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    {
      title: "ID Hóa Đơn",
      dataIndex: "idHoaDon",
      key: "idHoaDon",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "tongSoTien",
      key: "tongSoTien",
      render: (text) => <span>{Number(text).toLocaleString()} VNĐ</span>, // Format currency
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "phuongThucThanhToan",
      key: "phuongThucThanhToan",
      render: (phuongThucThanhToan) => { return phuongThucThanhToan === 0 ? "Ngân hàng" : "Tiền mặt" }
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, order) => (
        <Button type="primary" onClick={() => handleShowDetail(order)}>
          Xem chi tiết
        </Button>
      ),
    }
  ];
  const [isShowDetail, setIsShowDetail] = useState(false);
  
  const handleShowDetail = (order) => {
    const findDetailOrder = async () => {
      try {
        const response = await donhangService.getHoaDonById(order?.idHoaDon)
        console.log(response);
        setSelectedOrder(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    setIsShowDetail(true);
    findDetailOrder();
  };

  const handleClose = () => {
    console.log(`Sẽ đóng`);
    setIsShowDetail(false);
    setSelectedOrder(null);
  };

  const handleConfirm = (order) => {
    setSelectedOrder(order);
    message.success("Đã xác nhận sản phẩm");
    setSelectedOrder(updatedOrder);
    setIsShowDetail(false);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    message.success("Xóa thành công hóa đơn");
    setIsShowDetail(false);
  }

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="idHoaDon" />
      {selectedOrder && (
        <DetailOrder
          order={selectedOrder}
          open={isShowDetail}
          onClose={handleClose}
          onConfirm={handleConfirm}
          onDelete={handleDelete} 
        />
      )}
    </>
  );
};

export default OrderTable;
