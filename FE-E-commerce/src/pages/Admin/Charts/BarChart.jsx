import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Đảm bảo biểu đồ tự điều chỉnh kích thước
    maintainAspectRatio: false, // Cho phép thay đổi tỉ lệ kích thước
    plugins: {
      legend: {
        position: "top", // Đặt vị trí legend
      },
    },
    layout: {
      padding: 20, // Khoảng cách giữa các phần tử và khung bao quanh
    },
    scales: {
      y: {
        beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
      },
    },
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      {" "}
      {/* Điều chỉnh kích thước bên ngoài của biểu đồ */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
