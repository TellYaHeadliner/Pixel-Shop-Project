import { Table, Button } from "antd";
import * as XLSX from "xlsx";

const data = [
  { date: "01/01/2023", orders: 10, revenue: 1000 },
  { date: "02/01/2023", orders: 15, revenue: 1500 },
  { date: "03/01/2023", orders: 20, revenue: 2000 },
  { date: "04/01/2023", orders: 25, revenue: 2500 },
];

const columns = [
  { title: "Ngày", dataIndex: "date", key: "date" },
  { title: "Số đơn hàng", dataIndex: "orders", key: "orders" },
  { title: "Doanh thu", dataIndex: "revenue", key: "revenue" },
];

export default function TableOrderStatistic() {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
