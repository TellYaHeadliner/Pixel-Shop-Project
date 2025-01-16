import { Col, Row, Flex } from "antd";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import LineChartBusiness from "../../../components/Admin/Charts/LineChartBusiness";
import TableBusinessStatisticByUser from "../../../components/Admin/Table/TableBusinessStatisticByUser";
import BarChartBusinessByMonth from "../../../components/Admin/Charts/BarChartBusinessByMonth";
import businessStatistic from "../../../services/businessStatisticsService";
import TableBusinessStatisticByProducts from "../../../components/Admin/Table/TableBusinessStatisticByProducts";

const BusinessStatistics = () => {
  const [dailyRevenueData, setDailyRevenueData] = useState(Array(31).fill(0)); 
  const [dataThongKe, setDataThongKe] = useState([])
  const [dataThongKeSPTheoNgay, setDataThongKeSPTheoNgay] = useState([]) 

  useEffect(() => {
    document.title = "Quản trị - Thống kê doanh thu";
    const fetchBarChartData = async () => {
      try {
        const response = await businessStatistic.thongKeDoanhThuTheoThangVaNam(1, 2025);
        calculateDailyRevenue(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
      }
    };
    fetchBarChartData();

    const fetchDataThongKe = async () => {
      try {
        const response = await businessStatistic.thongKeDoanhThuTheoTatCaNguoiDung;
        setDataThongKe(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      }
    }

    fetchDataThongKe();

     const fetchDataThongKeDoanhThuTheoSP = async () => {
       try {
         const response =
           await businessStatistic.thongKeDoanhThuSanPhamTheoNgay;
         console.log(response);
         setDataThongKeSPTheoNgay(response.data.data);
       } catch (error) {
         console.error("Lỗi khi lấy dữ liệu thống kê:", error);
       }
     };

     fetchDataThongKeDoanhThuTheoSP();
     console.log(dataThongKeSPTheoNgay);
  

  }, []);


  const calculateDailyRevenue = (data) => {
    const dailyRevenue = Array(31).fill(0); // Khởi tạo mảng 31 ngày với giá trị 0

    data.forEach(item => {
      const date = new Date(item.ngayXacNhan).getDate(); // Lấy ngày từ ngày xác nhận
      dailyRevenue[date - 1] += item.tongSoTien; // Cộng doanh thu vào ngày tương ứng
    });

    setDailyRevenueData(dailyRevenue); // Cập nhật doanh thu hàng ngày
  };

  const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString()); // Tạo nhãn cho 31 ngày

  const barData = {
    labels,
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)", // Tiêu đề dữ liệu
        data: dailyRevenueData,
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền
        borderWidth: 1, // Độ dày viền
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)", // Tên dữ liệu
        data: dailyRevenueData,
        borderColor: "rgba(75, 192, 192, 1)", // Màu đường
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền (phần bóng dưới đường)
        tension: 0.3, // Độ cong của đường
        fill: true, // Hiển thị phần bóng dưới đường
      },
    ],
  };

  return (
    <Row gutter={[16, 16]}>
      <Col md={24} span={16}>
        <LineChartBusiness dataLineChart={lineData} />
      </Col>
      <Col md={24} span={16}>
        <BarChartBusinessByMonth data={barData} />
      </Col>
      <Col md={24} span={16}>
        <TableBusinessStatisticByUser dataThongKe={dataThongKe}/>
      </Col>
      <Col md={24} span={16}>
        <TableBusinessStatisticByProducts dataThongKe={dataThongKeSPTheoNgay}/>
      </Col>
    </Row>
  );
};

export default BusinessStatistics;