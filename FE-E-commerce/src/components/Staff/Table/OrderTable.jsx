import { Table, Button, message, Popconfirm } from "antd";
import { useState } from "react";

import DetailOrder from "../Modal/DetailOrder";
import donhangService from "../../../services/donHangService";
import Cookies from "js-cookie";

const OrderTable = ({ data }) => {
  const [selectedOrder, setSelectedOrder] = useState([]);

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
      render: (phuongThucThanhToan) => {
        return phuongThucThanhToan === 0 ? "Tiền mặt" : "VNPAY";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
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
    const findDetailOrder = async () => {
      try {
        const token = Cookies.get("token");
        const response = await donhangService.getHoaDonById(order.idHoaDon, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (response.data.data == null) {
          message.error("Không tìm thấy hóa đơn");
          return;
        }
        setSelectedOrder(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    findDetailOrder();
    setIsShowDetail(true);
  };

  const handleClose = () => {
    setIsShowDetail(false);
  };

  const handleConfirm = (order) => {
    setSelectedOrder(order);
    const handleConfirm = async () => {
      try {
        const updateTrangThai = order.trangThai + 1;
        const response = await donhangService.updateStatusHoaDon(
          order.idHoaDon,
          updateTrangThai
        );
        if (response.status === 200) {
          message.success(
            "Đã xác nhận sản phẩm ! Trang web sẽ reload lại trong 5s"
          );
          setInterval(() => {
            window.location.reload();
          }, 5000);
        }
      } catch (error) {
        message.error("Có lỗi trong quá trình xác nhận", error);
      }
    };
    handleConfirm();
    setSelectedOrder([]);
    setIsShowDetail(false);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    const handleHidden = async () => {
      try {
        const response = await donhangService.updateHiddenHoaDon(
          selectedOrder.idHoaDon,
          selectedOrder.trangThai
        );
        if (response.status === 401) {
          message.error("Không tìm thấy hóa đơn này");
          return;
        }
        if (response.status === 200) {
          message.success("Đã hủy hóa đơn! Trang web reload 5s");
          setInterval(() => {
            window.location.reload();
          }, 5000);
        }
      } catch (error) {
        message.error(`Có lỗi trong quá trình xóa`, error);
      }
    };
    handleHidden();
    setSelectedOrder([]);
    setIsShowDetail(false);
  };

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
