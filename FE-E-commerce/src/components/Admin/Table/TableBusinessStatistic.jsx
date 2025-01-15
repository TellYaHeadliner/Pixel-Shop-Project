import { Table, Typography } from "antd";

const { Title } = Typography;

// Dữ liệu mẫu: Thống kê doanh thu
const data = [
  {
    key: "1", // Khóa duy nhất cho mỗi hàng
    idSanPham: "SP01",
    tenSanPham: "iPhone 15 Pro",
    doanhThu: 2000000000,
    soLuongBanRa: 500,
    phanTramDongGop: 25,
  },
  {
    key: "2",
    idSanPham: "SP02",
    tenSanPham: "Samsung Galaxy S23",
    doanhThu: 1500000000,
    soLuongBanRa: 300,
    phanTramDongGop: 18.75,
  },
  {
    key: "3",
    idSanPham: "SP03",
    tenSanPham: "MacBook Pro M2",
    doanhThu: 1200000000,
    soLuongBanRa: 100,
    phanTramDongGop: 15,
  },
  {
    key: "4",
    idSanPham: "SP04",
    tenSanPham: "Dell XPS 13",
    doanhThu: 800000000,
    soLuongBanRa: 150,
    phanTramDongGop: 10,
  },
  {
    key: "5",
    idSanPham: "SP05",
    tenSanPham: "Sony WH-1000XM5",
    doanhThu: 500000000,
    soLuongBanRa: 200,
    phanTramDongGop: 6.25,
  },
];

// Cấu hình các cột trong bảng
const columns = [
  {
    title: "STT", // Tiêu đề cột
    dataIndex: "key", // Dữ liệu tương ứng trong `data`
    key: "key",
    render: (text) => <strong>{text}</strong>, // Tùy chỉnh cách hiển thị
  },
  {
    title: "ID Sản phẩm",
    dataIndex: "idSanPham",
    key: "idSanPham",
  },
  {
    title: "Tên Sản phẩm",
    dataIndex: "tenSanPham",
    key: "tenSanPham",
  },
  {
    title: "Doanh thu (VNĐ)",
    dataIndex: "doanhThu",
    key: "doanhThu",
    render: (value) => value.toLocaleString("vi-VN"), // Định dạng số kiểu Việt Nam
  },
  {
    title: "Số lượng bán ra",
    dataIndex: "soLuongBanRa",
    key: "soLuongBanRa",
  },
  {
    title: "Phần trăm đóng góp (%)",
    dataIndex: "phanTramDongGop",
    key: "phanTramDongGop",
    render: (value) => `${value}%`, // Thêm dấu %
  },
];

export default function TableBusinessStatistic() {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Bảng Thống Kê Doanh Thu</Title>
      <Table
        dataSource={data} // Dữ liệu bảng
        columns={columns} // Cấu hình cột
        pagination={{ pageSize: 5 }} // Phân trang (5 hàng mỗi trang)
        bordered // Bật viền bảng
      />
    </div>
  );
}
