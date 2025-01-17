import { Table, Button, Modal } from "antd";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";

import businessStatistic from "../../../services/businessStatisticsService";
import ModalDetailOpen from "../Modals/ModalDetailOrder"


export default function TableOrderStatistic({ dataThongKeLuotMua }) {
  const [dataThongKeDoanhThuSP, setDataThongKeDoanhThuSP] = useState([]);
  const [spByDay, setSPByDay] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDay = async (record) => {
    setIsModalVisible(true)
    const selectedDate = new Date(record.Ngay); 
    const day = selectedDate.getUTCDate(); 
    const response = await businessStatistic.thongKeDoanhThuSanPhamTheoNgay;
    const allData = response.data.data
    const dataSimple = [];
    allData.forEach((element) => {
      const elementDay = new Date(element.Ngay).getUTCDate() + 1;
      if (day === elementDay)
        dataSimple.push(element);
    });
    setSPByDay(dataSimple);
    console.log(spByDay);
  }

  const handleClose = () => {
    setIsModalVisible(false);
  }

  const columns = [
    { title: "Ngày", dataIndex: "Ngay", key: "Ngay" },
    { title: "Số đơn hàng", dataIndex: "SoDonHang", key: "SoDonHang" },
    {
      title: "Doanh thu",
      dataIndex: "DoanhThu",
      key: "DoanhThu",
      render: (text) => <span>{Number(text).toLocaleString()} VNĐ</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleDay(record)} type="primary">
          Xem chi tiết
        </Button>
      ),
    },
  ];
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
      <ModalDetailOpen data={spByDay} open={isModalVisible} onClose={handleClose} onCancel={handleClose} /> 
    </div>
  );
}
