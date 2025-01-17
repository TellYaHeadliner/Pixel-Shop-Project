import { useState, useEffect } from "react";

import { Typography, Row, Col } from "antd";

const { Title } = Typography;

import OrderTable from "../components/Staff/Table/OrderTable";
import donhangService from "../services/donHangService";

const OrderManagement = () => {
    const [ orders, setOrders ] = useState([]);  
    
    useEffect(() => {
        const fetchDonHang = async () => {
            try {
                const response = await donhangService.getListHoaDon;
                setOrders(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDonHang();
    }, [orders]);
    return (
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Title level={1}>Quản lý đơn hàng</Title>
          <OrderTable data={orders}/>
        </Col>
      </Row>
    );
};

export default OrderManagement;
