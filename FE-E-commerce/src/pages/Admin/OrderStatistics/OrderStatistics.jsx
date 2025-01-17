import { Col, Row, Typography, } from 'antd';
import './OrderStatistics.scss'
import TableOrderStatistic from "../../../components/Admin/Table/TableOrderStatistic";
import LineChartBusiness from "../../../components/Admin/Charts/LineChartBusiness";
import BarChartByWeek from '../../../components/Admin/Charts/BarChartByWeek';
import businessStatistic from '../../../services/businessStatisticsService';
import { useEffect, useState } from 'react';
const { Title } = Typography; 
const OrderStatistics = () => {
  const [dataThongKeLuotMua, setDataThongKeLuotMua] = useState([])

  useEffect(() => {
    const fetchDataThongKeLuotMua = async () => {
      try {
        const response = await businessStatistic.thongKeDonHangTheoNgay;
        setDataThongKeLuotMua(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataThongKeLuotMua();
    console.log(dataThongKeLuotMua);
  },[dataThongKeLuotMua])

    return (
      <Row gutter={[16, 16]} style={{ padding: "40px" }} align="middle">
        <Col md={12}>
          <Title level={1}>Thống kê doanh thu</Title>
          <TableOrderStatistic dataThongKeLuotMua={dataThongKeLuotMua}/>
        </Col>
      </Row>
    );
};

export default OrderStatistics;