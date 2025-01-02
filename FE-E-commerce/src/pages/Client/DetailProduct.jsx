import { Row, Col } from "antd";

import DescriptionLapTop from "../../components/Client/Descriptions/DescriptionsLapTop";
import ImageProduct from "../../components/Client/Image/ImageProduct";
import HeadingProduct from "../../components/Client/Descriptions/HeadingProduct";
import StarRating from "../../components/Client/Descriptions/StarRating";
import ViewCount from "../../components/Client/Descriptions/ViewCount";
import HeartCount from "../../components/Client/Descriptions/HeartCount";
import ThemSanPham from "../../components/Client/Button/ThemSanPham";

const DetailProduct = () => {
  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[12, 12]}>
        <Col
          lg="12"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ImageProduct />
          <HeadingProduct />
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            <StarRating rating="3.2"  />
            <ViewCount rating="320" />
            <HeartCount rating="430" />
          </div>
          <ThemSanPham />
        </Col>
        <Col lg="12">
          <DescriptionLapTop />
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;
