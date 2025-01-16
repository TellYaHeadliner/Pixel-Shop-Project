import { Typography, Flex, Row, Col } from "antd"

const { Title } = Typography;
const Price = ({ gia, khuyenMai }) => {

     const giaKhuyenMai = (gia, khuyenMai) => {
        if (gia == null || khuyenMai == null || gia <= 0 || khuyenMai < 0 || khuyenMai == 0) {
            return null; // hoặc có thể trả về chuỗi thông báo
        } else {
            const giaSauKhuyenMai = gia - (gia * khuyenMai / 100);
            return giaSauKhuyenMai; // trả về giá sau khuyến mãi
        }
    };

    const giaSauKhuyenMai = giaKhuyenMai(gia, khuyenMai);

    return (
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Title level={3}>{gia ? gia.toLocaleString() + " VNĐ" : ""}</Title>
        </Col>
        <Col span={8}>
          <Title delete level={3}>
            {khuyenMai ? khuyenMai + "%" : ""}
          </Title>
        </Col>
        <Col span={8}>
          <Title level={3}>
            {" "}
            {giaSauKhuyenMai !== null
              ? giaSauKhuyenMai.toLocaleString() + " VNĐ"
              : ""}
          </Title>
        </Col>
      </Row>
    );
}

export default Price;