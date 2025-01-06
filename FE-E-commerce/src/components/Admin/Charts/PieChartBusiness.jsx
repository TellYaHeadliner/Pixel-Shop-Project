import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right", // Hiển thị chú thích bên phải
    },
    title: {
      display: true,
      text: "Tỷ lệ doanh thu đóng góp của từng sản phẩm", // Tiêu đề biểu đồ
    },
  },
};

// Dữ liệu mẫu: Tổng doanh thu theo sản phẩm (idSanPham)
const productSales = [
  { idSanPham: "SP01", tongTien: 500 },
  { idSanPham: "SP02", tongTien: 300 },
  { idSanPham: "SP03", tongTien: 150 },
  { idSanPham: "SP04", tongTien: 50 },
];

// Chuẩn bị dữ liệu cho Pie Chart
const data = {
  labels: productSales.map((item) => item.idSanPham), // Danh sách idSanPham
  datasets: [
    {
      label: "Doanh thu (triệu VNĐ)",
      data: productSales.map((item) => item.tongTien), // Tổng doanh thu từng sản phẩm
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)", // Màu sắc từng phần
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)", // Màu viền từng phần
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1, // Độ dày viền
    },
  ],
};

export function PieChartBusiness() {
  return <Pie options={options} data={data} />;
}
