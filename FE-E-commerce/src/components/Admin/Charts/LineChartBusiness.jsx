import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", // Vị trí chú thích
    },
    title: {
      display: true,
      text: "Xu hướng tăng trưởng doanh thu theo thời gian", // Tiêu đề biểu đồ
    },
  },
};

const labels = Array.from({ length: 31 }, (_, index) => `Ngày ${index + 1}`);

const data = {
  labels, // Trục X: Các ngày trong tháng
  datasets: [
    {
      label: "Doanh thu (triệu VNĐ)", // Tên dữ liệu
      data: Array.from(
        { length: 31 },
        () => Math.floor(Math.random() * 100) + 1
      ), // Dữ liệu ngẫu nhiên
      borderColor: "rgba(75, 192, 192, 1)", // Màu đường
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền (phần bóng dưới đường)
      tension: 0.3, // Độ cong của đường
      fill: true, // Hiển thị phần bóng dưới đường
    },
  ],
};

export default function LineChartBusiness() {
  return <Line options={options} data={data} />;
}