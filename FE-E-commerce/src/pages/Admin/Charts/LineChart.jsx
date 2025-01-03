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
      position: "top", // Đảm bảo vị trí của legend là trên
    },
    title: {
      display: true, // Hiển thị tiêu đề
      text: "Chart.js Line Chart", // Tiêu đề của biểu đồ
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Months", // Tiêu đề cho trục X
      },
    },
    y: {
      title: {
        display: true,
        text: "Sales", // Tiêu đề cho trục Y
      },
      beginAtZero: true, // Trục Y bắt đầu từ 0
    },
  },
};

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "500px", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;