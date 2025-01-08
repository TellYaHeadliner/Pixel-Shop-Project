import { Col, Row, Typography, } from 'antd';
import './OrderStatistics.scss'
import TableOrderStatistic from "../../../components/Admin/Table/TableOrderStatistic";
import LineChartBusiness from "../../../components/Admin/Charts/LineChartBusiness";
import BarChartByWeek from '../../../components/Admin/Charts/BarChartByWeek';
const { Title } = Typography; 
const OrderStatistics = () => {
    // Dữ liệu mẫu cho biểu đồ
    // const orderData = [
    //     { week: 'Tuần 1', orders: 30 },
    //     { week: 'Tuần 2', orders: 40 },
    //     { week: 'Tuần 3', orders: 35 },
    //     { week: 'Tuần 4', orders: 50 },
    // ];

    // const revenueData = [
    //     { week: 'Tuần 1', revenue: 3000 },
    //     { week: 'Tuần 2', revenue: 4000 },
    //     { week: 'Tuần 3', revenue: 3500 },
    //     { week: 'Tuần 4', revenue: 5000 },
    // ];

    // // Dữ liệu cho bảng
    // const tableData = [
    //     { date: '01/01/2023', orders: 10, revenue: 1000 },
    //     { date: '02/01/2023', orders: 15, revenue: 1500 },
    //     { date: '03/01/2023', orders: 20, revenue: 2000 },
    //     { date: '04/01/2023', orders: 25, revenue: 2500 },
    // ];

    // const columns = [
    //     {
    //         title: 'Ngày',
    //         dataIndex: 'date',
    //         key: 'date',
    //     },
    //     {
    //         title: 'Số đơn',
    //         dataIndex: 'orders',
    //         key: 'orders',
    //     },
    //     {
    //         title: 'Doanh thu',
    //         dataIndex: 'revenue',
    //         key: 'revenue',
    //     },
    // ];

    return (
      <Row gutter={[16, 16]} style={{ padding: "40px" }} align="middle">
        <Col md={12}>
          <Title level={1}>Thống kê doanh thu</Title>
          <TableOrderStatistic />
        </Col>
        <Col md={12}>
          <LineChartBusiness />
        </Col>
        <Col md={24}>
            <BarChartByWeek />
        </Col>
      </Row>
      // <div style={{ padding: '20px' }}>
      //     <h2>Thống kê đơn hàng</h2>

      //     {/* <Card className='order-statistics-information' title="Thông tin đơn hàng">
      //         <Table dataSource={tableData} columns={columns} pagination={false} />
      //     </Card> */}

      //     {/* <Card title="Số lượng đơn hàng trong tuần" style={{ marginBottom: '20px' }}>
      //         <BarChart width={600} height={300} data={orderData}>
      //             <CartesianGrid strokeDasharray="3 3" />
      //             <XAxis dataKey="week" />
      //             <YAxis />
      //             <Tooltip />
      //             <Legend />
      //             <Bar dataKey="orders" fill="#4CAF50" />
      //         </BarChart>
      //     </Card>

      //     <Card title="Doanh thu theo tuần">
      //         <LineChart width={600} height={300} data={revenueData}>
      //             <XAxis dataKey="week" />
      //             <YAxis />
      //             <Tooltip />
      //             <Legend />
      //             <Line type="monotone" dataKey="revenue" stroke="#FF5733" />
      //         </LineChart>
      //     </Card> */}

      // </div>
    );
};

export default OrderStatistics;