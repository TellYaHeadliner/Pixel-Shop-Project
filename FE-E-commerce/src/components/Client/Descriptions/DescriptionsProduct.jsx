import { Card } from "antd";
import "./DescriptionsProduct.module.css"

const DescriptionsProduct = ({ description }) => {
    return (
      <Card title="Mô tả">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Card>
    );
}

export default DescriptionsProduct;