import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Doanh thu theo ngày", // Tiêu đề biểu đồ
    },
  },
};
const labels = Array.from({ length: 31 }, (_, index) => index + 1);

// Dữ liệu mẫu
const data = {
  labels, // Gắn nhãn trục X
  datasets: [
    {
      label: "Doanh thu (triệu VNĐ)", // Tiêu đề dữ liệu
      data: [12, 15, 8, 20, 17, 10, 25], // Dữ liệu doanh thu từng ngày
      backgroundColor: "rgba(54, 162, 235, 0.5)", // Màu nền
      borderColor: "rgba(54, 162, 235, 1)", // Màu viền
      borderWidth: 1, // Độ dày viền
    },
  ],
};

export function BarChartBusinessByDay() {
  return <Bar options={options} data={data} />;
}
