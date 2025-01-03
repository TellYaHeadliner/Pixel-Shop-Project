// import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import SlideShowAds from "../../components/Client/Slideshow/SlideShowAds";
const Home = () => {
  return (
    <>
      <div style={{ padding: "16px" }}>
        <Row gutter={[12, 12]} style={{ display: "flex"}}>
          <Col lg={12} style={{ height: "88%"}}>
            <SlideShowAds height="100%"/>
          </Col>
          <Col lg={12}>
            <div style={{ height: "25%", overflow: "hidden" }}>
              <SlideShowAds height="50%"/>
            </div>
            <div style={{ height: "23%", marginTop: "16px", overflow: "hidden" }}>
              <SlideShowAds height="50%"/>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
