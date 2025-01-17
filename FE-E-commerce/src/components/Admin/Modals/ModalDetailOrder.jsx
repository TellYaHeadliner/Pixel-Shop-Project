import { Modal, Table, Button } from "antd"
import * as XLSX from "xlsx";
import { useState } from "react"

const ModalDetailOrder = ({ data, open, onOk, onCancel}) => {

    const columns = [
        {
            title: "STT",
            dataIndex: "STT",
            key: "STT",
            render: (text, record, index) => index + 1
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "TenSanPham",
            key: "TenSanPham"
        },
        {
            title: "Tổng Số lượng",
            dataIndex: "TongSoLuong",
            key: "TongSoLuong"
        },
        {
            title: "Ngày",
            dataIndex: "Ngay",
            key: "Ngay"
        },
        {
            title: "Tổng tiền",
            dataIndex: "TongTien",
            key: "TongTien",
            render: (text) => <span>{Number(text).toLocaleString()} VNĐ</span>
        }
    ]

    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Đơn Hàng")  
      XLSX.writeFile(wb, "don_hang.xlsx");
    };
    return (
      <Modal
        title="Chi tiết đơn hàng"
        onOk={onOk}
        onCancel={onCancel}
        open={open}
        width={800}
        footer={[
          <Button key="export" onClick={exportToExcel}>
            Xuất Excel
          </Button>,
        ]}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record, index) => index}
        />
      </Modal>
    );
}

export default ModalDetailOrder;