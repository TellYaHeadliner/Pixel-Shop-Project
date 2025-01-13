import { Typography, Flex, Row, Col } from "antd"

const { Title } = Typography;
const Price = ({ gia, khuyenMai }) => {

    const giaKhuyenMai = (gia, khuyenMai) => {
        if (gia == null || khuyenMai == null || gia <= 0 || khuyenMai < 0 || khuyenMai > 1) {
            return null;
        } else {
            const giaSauKhuyenMai = gia - (gia * khuyenMai);
            return <span>Giá: {giaSauKhuyenMai.toLocaleString()} VNĐ</span>;
        }
    };

    return (
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={3}>{gia ? gia.toLocaleString() + " VNĐ" : ""}</Title>
        </Col>
        <Col span={8}>
          <Title delete level={3}>
            {khuyenMai ? (khuyenMai * 100) + "%" : ""} 
          </Title>
        </Col>
        <Col span={8}>
          <Title level={3}>{giaKhuyenMai(gia, khuyenMai)}</Title>
        </Col>
      </Row>
    );
}

export default Price;