import { useState } from 'react';
import ContactTable from '../../../components/Staff/Table/ContactTable';
import { Row, Col, Typography} from 'antd'

const { Title } = Typography; 




const StaffContact = () =>{
    const [data, setData] = useState([
  {
    id: 1,
    hoVaTen: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    sdt: "0987654321",
    noiDung: "Tôi cần hỗ trợ về sản phẩm.",
    thoiGian: new Date(),
    trangThai: true,
  },
  {
    id: 2,
    hoVaTen: "Trần Thị B",
    email: "tranthib@example.com",
    sdt: "0971234567",
    noiDung: "Khi nào giao hàng?",
    thoiGian: new Date(new Date().setDate(new Date().getDate() - 1)), // Hôm qua
    trangThai: false,
  },
  {
    id: 3,
    hoVaTen: "Lê Hồng C",
    email: "lehongc@example.com",
    sdt: "0969876543",
    noiDung: "Làm thế nào để đổi trả sản phẩm?",
    thoiGian: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 ngày trước
    trangThai: false,
  },
  {
    id: 4,
    hoVaTen: "Phạm Quốc D",
    email: "phamquocd@example.com",
    sdt: "0951234987",
    noiDung: "Hỗ trợ thanh toán qua VNPay.",
    thoiGian: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 ngày trước
    trangThai: true,
  },
  {
    id: 5,
    hoVaTen: "Vũ Thị E",
    email: "vuthie@example.com",
    sdt: "0943219876",
    noiDung: "Làm thế nào để tích điểm thành viên?",
    thoiGian: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 ngày trước
    trangThai: false,
  },
])

return (
    <Row gutter={[16, 16]} style={{ padđing: '20px'}}>
        <Col span={24}>
            <Title level={1}>Danh sách liên hệ</Title>
            <ContactTable data={data} />
        </Col>
    </Row>
);
};


export default StaffContact;