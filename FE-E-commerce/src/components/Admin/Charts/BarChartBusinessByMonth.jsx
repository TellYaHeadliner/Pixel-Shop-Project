import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Doanh thu theo tháng ',
    },
  },
};

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

const data = {
  labels, // Gắn nhãn trục X
  datasets: [
    {
      label: "Doanh thu (triệu VNĐ)", // Tiêu đề dữ liệu
      data: [50, 70, 40, 85, 60, 90, 100], // Dữ liệu tương ứng từng tháng
      backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền
      borderColor: "rgba(75, 192, 192, 1)", // Màu viền
      borderWidth: 1, // Độ dày viền
    },
  ],
};

const BarChartBusinessByMonth = () => {
  return (
  <Bar options={options} data={data} style={{ width: "100%", height: "90%"}}/>
  );
}

export default BarChartBusinessByMonth;