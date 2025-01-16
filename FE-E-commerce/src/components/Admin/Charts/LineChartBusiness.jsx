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
      text: "Xu hướng tăng trưởng doanh thu theo tháng 1 năm 2025", // Tiêu đề biểu đồ
    },
  },
};


export default function LineChartBusiness({ dataLineChart }) {
  return <Line options={options} data={dataLineChart} />;
}