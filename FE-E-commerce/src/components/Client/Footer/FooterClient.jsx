import React from "react";
import { Row, Col, Layout } from "antd";
import styles from "./FooterClient.module.css";

const { Footer } = Layout;

const FooterClient = () => (
  <Footer className={styles.footerClient} style={{ backgroundColor: '#f0f0f0', color: '#000', padding: '40px 50px' }}>
    <Row justify="space-between">
      <Col span={24}>
        <h1 style={{ textAlign: 'left' }}>PIXEL</h1>
      </Col>
    </Row>
    <Row justify="space-between" className="mt-4">
      <Col span={12}>
        <p>Địa chỉ & Thông tin liên hệ:</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>Trụ sở chính: 65 Huỳnh Thúc Kháng, P. Bến Nghé, Q. 1, TP.HCM</li>
          <li>Tổng đài hỗ trợ: 1900 123 456 (7:00 - 22:00 hàng ngày)</li>
          <li>Email: support@ecommerce.com</li>
        </ul>
        <p>Phương thức thanh toán hỗ trợ:</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>VNPAY</li>
          <li>Thanh toán COD (Cash on Delivery)</li>
        </ul>
      </Col>
      <Col span={12}>
        <h2>Kết nối với chúng tôi:</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>YouTube</li>
          <li>TikTok</li>
        </ul>
        <h2>Thông tin về chúng tôi:</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>Giới thiệu</li>
          <li>Chính sách bảo mật</li>
          <li>Điều khoản sử dụng</li>
        </ul>
      </Col>
    </Row>
  </Footer>
);

export default FooterClient;