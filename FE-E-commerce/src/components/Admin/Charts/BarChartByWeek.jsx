import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

import { Card } from "antd";


const orderData = [
    { week: 'Tuần 1', orders: 30 },
    { week: 'Tuần 2', orders: 40 },
    { week: 'Tuần 3', orders: 35 },
    { week: 'Tuần 4', orders: 50 },
];

const revenueData = [
    { week: 'Tuần 1', revenue: 3000 },
    { week: 'Tuần 2', revenue: 4000 },
    { week: 'Tuần 3', revenue: 3500 },
    { week: 'Tuần 4', revenue: 5000 },
];

export default function BarChartByWeek(){
    return (
          <Card title="Số lượng đơn hàng trong tuần" style={{ marginBottom: '20px' }}>
              <BarChart width={1400} height={500} data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#4CAF50" />
              </BarChart>
          </Card>
    )
}

