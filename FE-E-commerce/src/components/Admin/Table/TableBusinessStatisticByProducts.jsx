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
    title: "Tên Sản Phẩm",
    dataIndex: "TenSanPham",
    key: "TenSanPham",
  },
  {
    title: "Ngày",
    dataIndex: "Ngay",
    key: "Ngay",
  },
  {
    title: "Số Lượng",
    dataIndex: "TongSoLuong",
    key: "TongSoLuong",
  },
  {
    title: "Tổng Tiền (VNĐ)",
    dataIndex: "TongTien",
    key: "TongTien",
    render: (value) => value.toLocaleString("vi-VN"), // Định dạng số kiểu Việt Nam
  },
];

export default function TableBusinessStatisticByProducts({ dataThongKe }) {
  // Chuyển đổi dữ liệu thành định dạng bảng
  const dataSource = dataThongKe.map((item, index) => ({
    key: index + 1,
    TenSanPham: item.TenSanPham,
    Ngay: item.Ngay,
    TongSoLuong: item.TongSoLuong,
    TongTien: item.TongTien,
  }));

  const exportToExcel = () => {
    const formattedData = dataThongKe.map((item, index) => ({
      "STT": index + 1,
      "Tên Sản Phẩm": item.TenSanPham,
      "Ngày": item.Ngay,
      "Tổng Số Lượng": item.TongSoLuong,
      "Tổng Tiền": item.TongTien
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh Thu Sản Phẩm Theo Ngày");

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
    a.download = "doanh_thu_san_pham_theo_ngay.xlsx"; // Sửa tên file cho đúng định dạng
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Bảng Thống Kê Doanh Thu Sản Phẩm Theo Ngày</Title>
      <Button type="primary" onClick={exportToExcel}>
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
