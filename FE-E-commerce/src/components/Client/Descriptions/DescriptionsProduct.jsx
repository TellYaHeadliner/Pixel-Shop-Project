import { Card } from "antd";
import "./DescriptionsProduct.module.css"

const DescriptionsProduct = ({ description }) => {
    return (
      <Card title="Mô tả">
        <p>
          {description}
        </p>
      </Card>
    );
}

export default DescriptionsProduct;