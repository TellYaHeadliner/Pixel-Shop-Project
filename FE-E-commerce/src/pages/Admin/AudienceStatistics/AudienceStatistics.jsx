import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Alert, Table } from 'antd';
// import { Bar } from '@ant-design/charts';
import apiService from '../../../api/api';
import "./AudienceStatistics.scss"
const AudienceStatistics = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [revenueByUserData, setRevenueByUserData] = useState([]);
    const [productRevenueData, setProductRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);

                // Fetching orders statistics
                const ordersResponse = await apiService.thongKeDonHangTheoNgay();
                setOrdersData(ordersResponse.data.data.map(item => ({
                    type: item.Ngay,
                    value: item.SoDonHang,
                })));

                // Fetching revenue statistics by user
                const revenueByUserResponse = await apiService.thongKeDoanhThuTheoTatCaNguoiDung();
                setRevenueByUserData(revenueByUserResponse.data.data.map(item => ({
                    type: item.TenNguoiDung,
                    value: item.TongTien,
                })));

                // Fetching product revenue statistics
                const productRevenueResponse = await apiService.thongKeDoanhThuSanPhamTheoNgay;
                const productRevenueData = productRevenueResponse.data.data.map(item => ({
                    TenSanPham: item.TenSanPham,
                    Ngay: item.Ngay?.substring(0, 10), // Extract date only
                    TongSoLuong: item.TongSoLuong,
                    TongTien: item.TongTien,
                }));
                setProductRevenueData(productRevenueData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const ordersConfig = {
        data: ordersData,
        xField: 'type',
        yField: 'value',
        label: {
            position: 'bottom',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            type: { alias: 'Ngày' },
            value: { alias: 'Số Đơn Hàng' },
        },
    };

    const revenueByUserConfig = {
        data: revenueByUserData,
        xField: 'type',
        yField: 'value',
        label: {
            position: 'bottom',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            type: { alias: 'Người Dùng' },
            value: { alias: 'Doanh Thu' },
        },
    };

    const productColumns = [
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'TenSanPham',
            key: 'TenSanPham',
        },
        {
            title: 'Ngày',
            dataIndex: 'Ngay',
            key: 'Ngay',
        },
        {
            title: 'Tổng Số Lượng',
            dataIndex: 'TongSoLuong',
            key: 'TongSoLuong',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'TongTien',
            key: 'TongTien',
            render: (text) => <span>{Number(text).toLocaleString()} VNĐ</span>, // Format currency
        },
    ];

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" />;
    }

    return (
        <div className='AudienceStatistics'>
            <h2>Thống kê Doanh thu và Đơn hàng</h2>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Thống kê Đơn hàng theo Ngày" bordered={false}>
                        {/* <Bar {...ordersConfig} /> */}
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Thống kê Doanh thu theo Người dùng" bordered={false}>
                        {/* <Bar {...revenueByUserConfig} /> */}
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Thống kê Doanh thu Sản phẩm theo Ngày" bordered={false}>
                        <Table 
                            dataSource={productRevenueData} 
                            columns={productColumns} 
                            pagination={false} 
                            rowKey="TenSanPham" // or another unique identifier
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AudienceStatistics;