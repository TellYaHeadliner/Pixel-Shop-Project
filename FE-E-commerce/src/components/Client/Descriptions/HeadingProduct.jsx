import { Typography } from "antd";
const { Title } = Typography;

const HeadingProduct = ({ tenSanPham }) => {
    return (
      <Title level={1}>
        {tenSanPham}
      </Title>
    );
}

export default HeadingProduct;