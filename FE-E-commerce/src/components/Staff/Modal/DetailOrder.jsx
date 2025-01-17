import { Modal, Descriptions, Table, Button } from 'antd'

import DetailOrderTable from '../Table/DetailOrderTable'

const DetailOrder = ({ order, open, onClose, onDelete, onConfirm }) => {
  
    return (
      <Modal
        title={`Chi tiết đơn hàng #${order.idHoaDon || ""}`}
        open={open}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Đóng
          </Button>,
          <Button key="confirm" type="primary" onClick={onConfirm}>
            Xác nhận đơn hàng
          </Button>,
          <Button key="delete" type="primary" danger onClick={onDelete}>
            Hủy đơn hàng
          </Button>,
        ]}
      >
        <Descriptions title="Thông tin chi tiết đơn hàng" bordered column={1}>
          <Descriptions.Item label="Tên khách hàng">
            {order?.nguoiDatHang}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ giao hàng">
            {order?.diaChi}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số tiền">
            {order?.tongSoTien
              ? `${order.tongSoTien.toLocaleString()}đ`
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {order?.trangThai ? "Đã xác nhận" : "Chưa xác nhận"}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {order?.phuongThucThanhToan ? "Tiền mặt" : "Ngân hàng"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày thanh toán">
            {order?.ngayThanhToan || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {order?.soDienThoai || "N/A"}
          </Descriptions.Item>
        </Descriptions>
        <DetailOrderTable orderID={order?.orderID} />
      </Modal>
    );
}

export default DetailOrder;