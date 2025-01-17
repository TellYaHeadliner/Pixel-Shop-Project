import { Col, Row, Typography, } from 'antd';
import './OrderStatistics.scss'
import TableOrderStatistic from "../../../components/Admin/Table/TableOrderStatistic";

import businessStatistic from '../../../services/businessStatisticsService';
import { useEffect, useState } from 'react';
const { Title } = Typography; 
const OrderStatistics = () => {
  const [dataThongKeLuotMua, setDataThongKeLuotMua] = useState([])
  const [dataThongKeDoanhThuSP, setDataThongKeDoanhThuSP] = useState([])

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