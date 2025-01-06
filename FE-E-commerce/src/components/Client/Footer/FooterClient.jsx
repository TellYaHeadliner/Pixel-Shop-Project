import React from "react";
import { Row, Col, Layout, Input, Button } from "antd";
import styles from "./FooterClient.module.css";

const { Footer } = Layout;

const FooterClient = () => (
  <Footer className={styles.footerClient} style={{ backgroundColor: '#f0f0f0', color: '#000', padding: '40px 50px' }}>
    <Row justify="space-between">
      <Col span={12}>
        <h1>PIXEL</h1>
        <p>Đăng ký để nhận các thông báo mới nhất</p>
        <Input placeholder="*Email" style={{ width: '300px', marginBottom: '10px' }} />
        <Button type="primary">Đăng ký</Button>
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
    <Row className="mt-3" gutter={[16, 16]}>
      <Col span={16}>
        <p className="m-0">Địa chỉ & Thông tin liên hệ:</p>
        <ul>
          <li>Trụ sở chính: 65 Huỳnh Khúc Kháng, P. Bến Nghé, Q. 1, TP.HCM</li>
          <li>Tổng đài hỗ trợ: 1900 123 456 (7:00 - 22:00 hàng ngày)</li>
          <li>Email: support@ecommerce.com</li>
        </ul>
      </Col>
      <Col span={8}>
        <p className="m-0">Phương thức thanh toán hỗ trợ:</p>
        <ul>
          <li>VNPAY</li>
          <li>Thanh toán COD (Cash on Delivery)</li>
        </ul>
      </Col>
    </Row>
  </Footer>
);

export default FooterClient;