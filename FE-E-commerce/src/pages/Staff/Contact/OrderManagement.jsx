import { useState } from "react";
import OrderTable from "../../../components/Staff/Table/OrderTable";
import { Typography, Row, Col } from "antd";

const { Title } = Typography;


const OrderManagement = () => {
    const [ orders, setOrders ] = useState([
    {
        key: '1',
        idHoaDon: 'HD001',
        nguoiDatHang: 'Nguyễn Văn A',
        ngayDat: '2025-01-01',
        tongSoTien: 5000000,
        trangThai: 1, // Đã xác nhận
        phuongThucThanhToan: 1, // Tiền mặt
        nhanVienXacNhan: 'Trần Thị B',
        ngayXacNhan: '2025-01-02',
        soLan: 1,
        thoiGianKhoa: '2025-01-03 15:30:00',
    },
    {
        key: '2',
        idHoaDon: 'HD002',
        nguoiDatHang: 'Phạm Thị C',
        ngayDat: '2025-01-02',
        tongSoTien: 3000000,
        trangThai: 0, // Chưa xác nhận
        phuongThucThanhToan: 0, // Ngân hàng
        nhanVienXacNhan: null, // Chưa xác nhận
        ngayXacNhan: null,
        soLan: 0,
        thoiGianKhoa: null,
    },
    {
        key: '3',
        idHoaDon: 'HD003',
        nguoiDatHang: 'Lê Văn D',
        ngayDat: '2025-01-03',
        tongSoTien: 7000000,
        trangThai: 1, // Đã xác nhận
        phuongThucThanhToan: 0, // Ngân hàng
        nhanVienXacNhan: 'Nguyễn Thị E',
        ngayXacNhan: '2025-01-03',
        soLan: 2,
        thoiGianKhoa: '2025-01-04 10:00:00',
    },
    {
        key: '4',
        idHoaDon: 'HD004',
        nguoiDatHang: 'Trần Văn F',
        ngayDat: '2025-01-04',
        tongSoTien: 4500000,
        trangThai: 1, // Đã xác nhận
        phuongThucThanhToan: 1, // Tiền mặt
        nhanVienXacNhan: 'Phạm Văn G',
        ngayXacNhan: '2025-01-05',
        soLan: 1,
        thoiGianKhoa: '2025-01-06 12:00:00',
    },
    {
        key: '5',
        idHoaDon: 'HD005',
        nguoiDatHang: 'Hoàng Thị H',
        ngayDat: '2025-01-05',
        tongSoTien: 2500000,
        trangThai: 0, // Chưa xác nhận
        phuongThucThanhToan: 0, // Ngân hàng
        nhanVienXacNhan: null, // Chưa xác nhận
        ngayXacNhan: null,
        soLan: 0,
        thoiGianKhoa: null,
    },
]);    
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
