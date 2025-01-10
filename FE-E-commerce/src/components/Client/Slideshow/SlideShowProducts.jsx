import { Carousel, Col, Row } from "antd";
import CardSanPham  from "../Cards/CardSanPham";  

const SlideShowProducts = ({ products }) => {
    if (!Array.isArray(products) || products.length === 0){
        return (
            <div>
                Loading
            </div>
        )
    } 

    return (
      <Row gutter={[16, 16]}>
        <Carousel
          autoplay
          afterChange={onchange}
          dots={false}
          effect="fade"
          style={{ marginTop: "20px" }}
        >
          {products.map((product, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <CardSanPham
                tenSanPham={product?.tenSanPham}
                hang={product?.hang}
                gia={product?.gia}
                img={product?.img}
                slug={product?.slug}
              />
            </Col>
          ))}
        </Carousel>
      </Row>
    );
}

export default SlideShowProducts;