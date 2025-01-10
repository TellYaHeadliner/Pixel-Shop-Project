import { Typography, Flex, Row, Col } from "antd"

const { Title } = Typography;
const Price = ({ price, discount, priceDiscount}) => {
    return (    
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Title level={3}>
                    {price}
                </Title>
            </Col>
            <Col span={8}>
                <Title delete level={3}>
                    {discount}
                </Title>
            </Col>
            <Col span={8}>
                <Title level={3}>
                    {priceDiscount}
                </Title>
            </Col>
        </Row>
    )
}

export default Price;