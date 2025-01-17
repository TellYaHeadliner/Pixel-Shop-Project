import { Modal, Descriptions, Table, Button } from 'antd'

import DetailOrderTable from '../Table/DetailOrderTable'

const DetailOrder = ({ order, open, onClose, onDelete, onConfirm }) => {
    return (
      <Modal
        title={`Chi tiết đơn hàng #${order[0]?.idHoaDon || ""}`}
        open={open}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Đóng
          </Button>,
          <Button key="confirm" type="primary" onClick={onConfirm}>
            Đã nhận hàng
          </Button>,
          <Button key="delete" type="primary" danger onClick={onDelete}>
            Hủy đơn hàng
          </Button>,
        ]}
      >
        <Descriptions title="Thông tin chi tiết đơn hàng" bordered column={1}>
          <Descriptions.Item label="Tên khách hàng">
            {order[0]?.hoVaTen}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ giao hàng">
            {order[0]?.diaChi}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số tiền">
            {order[0]?.tongSoTien
              ? `${order[0]?.tongSoTien.toLocaleString()}đ`
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {order[0]?.trangThai ? "Đã xác nhận" : "Chưa xác nhận"}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {order[0]?.phuongThucThanhToan ? "Tiền mặt" : "Ngân hàng"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày thanh toán">
            {order[0]?.ngayXacNhan || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {order[0]?.sdt || "N/A"}
          </Descriptions.Item>
        </Descriptions>
        <DetailOrderTable detailData={order} />
      </Modal>
    );
}

export default DetailOrder;