import { Container, Row, Col } from "react-bootstrap";

import styles from "./FooterClient.module.css";
const FooterClient = () => (
  <Container fluid className={`${styles.footerClient} py-4 text-white`}>
    <Row className="px-5">
      <Col lg={6}>
        <img src="/imgs/logo.png" alt="" />
      </Col>
      <Col lg={6}>
        <h2 className="text-white text-center">
          Nền tảng mua sắm trực trực tuyến hàng đầu <br />
          hàng triệu sản phẩm chất lượng
        </h2>
      </Col>
    </Row>
    <Row className="mt-3 px-5">
      <Col lg={3}>
        <p className="m-0">Thông tin về chúng tôi:</p>
        <ul>
          <li>Giới thiệu</li>
          <li>Chính sách bảo mật</li>
          <li>Điều khoản sử dụng</li>
        </ul>
      </Col>
      <Col lg={3}>
        <p className="m-0">Kết nối với chúng tôi:</p>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Youtube</li>
          <li>Tiktok</li>
        </ul>
      </Col>
      <Col lg={3}>
        <p className="m-0">Hỗ trợ khách hàng</p>
        <ul>
          <li>Hướng dẫn mua hàng</li>
          <li>Chính sách đổi trả</li>
          <li>Câu hỏi thường gặp (FAQ)</li>
        </ul>
      </Col>
      <Col lg={3}>
        <p className="m-0">Tin tức và blog</p>
        <ul>
          <li>Mẹo mua sắm thông minh</li>
          <li>Xu hướng sản phẩm mới</li>
        </ul>
      </Col>
    </Row>
    <Row className="mt-3 px-5">
      <Col lg={8}>
        <p className="m-0">Địa chỉ & Thông tin liên hệ:</p>
        <ul>
          <li>Trụ sở chính: 65 Huỳnh Khúc Kháng, P. Bến Nghé, Q. 1, TP.HCM</li>
          <li>Tổng đài hỗ trợ: 1900 123 456 (7:00 - 22:00 hàng ngày)</li>
          <li>Email: support@ecommerce.com</li>
        </ul>
      </Col>
      <Col lg={4}>
        <p className="m-0">Phương thức thanh toán hỗ trợ:</p>
        <ul>
          <li>VNPAY</li>
          <li>Thanh toán COD (Cash on Delivery)</li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default FooterClient;
