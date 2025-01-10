import { Row, Col, Card } from "antd";

import DescriptionLapTop from "../../components/Client/Descriptions/DescriptionsLapTop";
import ImageProduct from "../../components/Client/Image/ImageProduct";
import HeadingProduct from "../../components/Client/Descriptions/HeadingProduct";
import StarRating from "../../components/Client/Descriptions/StarRating";
import ViewCount from "../../components/Client/Descriptions/ViewCount";
import HeartCount from "../../components/Client/Descriptions/HeartCount";
import ThemSanPham from "../../components/Client/Button/ThemSanPham";
import DescriptionsProduct from "../../components/Client/Descriptions/DescriptionsProduct";
import Review from "../../components/Client/Input/Review";
import RatingStar from "../../components/Client/Input/RatingStar";
import TableComment from "../../components/Client/Table/TableComment";
import SanPhamCard from "../../components/Client/Cards/CardSanPham";
import Price from "../../components/Client/Descriptions/Price"


const DetailProduct = () => {
  return (
    <div style={{ marginTop: "16px" }}>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col md="16">
          <ImageProduct />
          <HeadingProduct />
            <Price
              price="15,500,000"
              discount="50%"
              priceDiscount="12,000,000"
            />
          <Row justify="flex-start" align="middle">
            <Col>
              <StarRating rating="3.2" />
            </Col>
            <Col>
              <ViewCount rating="320" />
            </Col>
            <Col>
              <HeartCount rating="430" />
            </Col>
          </Row>
          <div style={{ marginTop: "1rem" }}>
            <ThemSanPham />
          </div>
        </Col>
        <Col md="16">
          <DescriptionLapTop />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={18} style={{ marginTop: "2rem" }}>
          <DescriptionsProduct description="Laptop mang đến cho bạn một thiết kế vừa đẹp, vừa mạnh mẽ, đáp ứng tốt mọi nhu cầu từ giải trí đến công việc. Với thiết kế gọn nhẹ, hiện đại cùng các tính năng vượt trội như màn hình lớn, camera chất lượng và pin bền bỉ, sẽ là trợ thủ đắc lực, luôn đồng hành cùng bạn trong mọi hoạt động thường ngày......" />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={18} style={{ marginTop: "2rem" }}>
          <Card title="Đánh giá sản phẩm">
            <RatingStar />
            <Review />
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={18} style={{ marginTop: "2rem" }}>
          <Card title="Danh sách đánh giá">
            <TableComment />
          </Card>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        gutter={[16, 16]}
        style={{ marginTop: "2rem" }}
      >
        <Col lg={6}>
          <SanPhamCard />
        </Col>
        <Col lg={6}>
          <SanPhamCard />
        </Col>
        <Col lg={6}>
          <SanPhamCard />
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;
