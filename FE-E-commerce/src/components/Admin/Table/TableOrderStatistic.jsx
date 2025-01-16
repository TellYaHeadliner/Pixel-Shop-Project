import { Table, Button } from "antd";
import * as XLSX from "xlsx";


const columns = [
  { title: "Ngày", dataIndex: "Ngay", key: "Ngay" },
  { title: "Số đơn hàng", dataIndex: "SoDonHang", key: "SoDonHang" },
  { title: "Doanh thu", dataIndex: "DoanhThu", key: "DoanhThu" },
];

export default function TableOrderStatistic({ dataThongKeLuotMua }) {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataThongKeLuotMua);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "Order_Statistics.xlsx");
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={exportToExcel}
        style={{ marginBottom: 16 }}
      >
        Xuất Excel
      </Button>
      <Table columns={columns} dataSource={dataThongKeLuotMua} />
    </div>
  );
}
