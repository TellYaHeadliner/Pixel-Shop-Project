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
      position: "top",
    },
    title: {
      display: true,
      text: "Doanh thu theo ngày tháng 1 năm 2025",
    },
  },
};

// Nhãn cho các ngày trong tháng 1




const BarChartBusinessByDay = ({ data}) => {
  return (
    <Bar
      options={options}
      data={data}
      style={{ width: "100%", height: "90%" }}
    />
  );
};

export default BarChartBusinessByDay;
