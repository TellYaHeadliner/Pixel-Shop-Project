import { Table, Button, message, Popconfirm } from "antd";
import { useState } from "react";

import DetailOrder from "../Modal/DetailOrder";

const OrderTable = ({ data }) => {
  const [orders, setOrders] = useState(data);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    {
      title: "ID Hóa Đơn",
      dataIndex: "idHoaDon",
      key: "idHoaDon",
    },
    {
      title: "Người đặt hàng",
      dataIndex: "nguoiDatHang",
      key: "nguoiDatHang",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "ngayDat",
      key: "ngayDat",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongSoTien",
      key: "tongSoTien",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) =>
        trangThai === 1 ? "Đã xác nhận" : "Chưa xác nhận",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "phuongThucThanhToan",
      key: "phuongThucThanhToan",
      render: (phuongThucThanhToan) =>
        phuongThucThanhToan ? "Tiền mặt" : "Ngân hàng",
    },
    {
      title: "Người xác nhận",
      dataIndex: "nhanVienXacNhan",
      key: "nhanVienXacNhan",
      render: (nhanVienXacNhan) =>
        nhanVienXacNhan ? nhanVienXacNhan : "Chưa xác nhận",
    },
    {
      title: "Ngày xác nhận",
      dataIndex: "ngayXacNhan",
      key: "ngayXacNhan",
    },
    {
      title: "Số lần",
      dataIndex: "soLan",
      key: "soLan",
    },
    {
      title: "Thời gian khóa",
      dataIndex: "thoiGianKhoa",
      key: "thoiGianKhoa",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, order) => (
        <Button type="primary" onClick={() => handleShowDetail(order)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];
  const [isShowDetail, setIsShowDetail] = useState(false);

  const handleShowDetail = (order) => {
    console.log(order);
    setSelectedOrder(order);
    setIsShowDetail(true);
  };

  const handleClose = () => {
    console.log(`Sẽ đóng`);
    setIsShowDetail(false);
    setSelectedOrder(null);
  };

  const handleConfirm = (order) => {
    setSelectedOrder(order);
    if (selectedOrder?.trangThai == 1) {
      message.error("Sản phẩm đã được xác nhận");
      setIsShowDetail(false);
    } else {
      const updatedOrder = { ...selectedOrder, trangThai: 1 };
      setOrders(
        orders.map((o) =>
          o.idHoaDon === selectedOrder.idHoaDon ? updatedOrder : o
        )
      );
      message.success("Đã xác nhận sản phẩm");
      setSelectedOrder(updatedOrder);
      setIsShowDetail(false);
    }
    
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    const updatedContact = orders.filter((o) => o.idHoaDon !== selectedOrder.idHoaDon)
    setOrders(updatedContact);
    message.success("Xóa thành công hóa đơn");
    setIsShowDetail(false);
  }

  return (
    <>
      <Table columns={columns} dataSource={orders} rowKey="idHoaDon" />
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
