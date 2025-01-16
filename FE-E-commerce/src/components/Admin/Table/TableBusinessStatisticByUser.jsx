import { Table, Typography, Button } from "antd";

import * as XLSX from "xlsx";


const { Title } = Typography;

// Cấu hình các cột trong bảng
const columns = [
  {
    title: "STT", // Tiêu đề cột
    dataIndex: "key", // Dữ liệu tương ứng trong `data`
    key: "key",
    render: (text) => <strong>{text}</strong>, // Tùy chỉnh cách hiển thị
  },
  {
    title: "Tên Người Dùng",
    dataIndex: "TenNguoiDung",
    key: "TenNguoiDung",
  },
  {
    title: "Tổng Tiền (VNĐ)",
    dataIndex: "TongTien",
    key: "TongTien",
    render: (value) => value.toLocaleString("vi-VN"), // Định dạng số kiểu Việt Nam
  },
  {
    title: "Số Lượng",
    dataIndex: "SoLuong",
    key: "SoLuong",
  },
];

export default function TableBusinessStatisticByUser({ dataThongKe }) {
  // Chuyển đổi dữ liệu thành định dạng bảng
  const dataSource = dataThongKe.map((item, index) => ({
    key: index + 1,
    TenNguoiDung: item.TenNguoiDung,
    TongTien: item.TongTien,
    SoLuong: item.SoLuong,
  }));

  const exportToExcel = (dataThongKe) => {
    const formattedData = dataThongKe.map((item, index) => ({
      "Tên người dùng": item.TenNguoiDung,
      "Tổng tiền (VNĐ)": item.TongTien,
      "Số lượng": item.SoLuong
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh Thu");
    
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(dataBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "doanh_thu.xlss";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url)
  } 

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Bảng Thống Kê Doanh Thu Theo Người Dùng</Title>
      <Button type="primary" onClick={() => exportToExcel(dataThongKe)}>
        Xuất ra file excel
      </Button>
      <Table
        dataSource={dataSource} // Dữ liệu bảng
        columns={columns} // Cấu hình cột
        pagination={{ pageSize: 5 }} // Phân trang (5 hàng mỗi trang)
        bordered // Bật viền bảng
      />
    </div>
  );
}