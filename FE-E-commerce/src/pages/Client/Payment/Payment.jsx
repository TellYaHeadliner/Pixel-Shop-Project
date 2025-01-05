import React from "react";
import { Layout, Row, Col, Button, Input } from "antd";
import "./Payment.scss";

const { Content } = Layout;

const Payment = () => {
  return (
    <Layout className="checkout-layout">
      <Content className="checkout-content">
        <h2 className="checkout-title">Thông tin nhận hàng</h2>

        <Row gutter={[32, 16]}>
          <Col span={16} className="info-section">
            <div className="info-header">
              <h3>Nguyễn Văn A</h3>
              <p>(+84) 916553230</p>
              <p>431/21 Nguyễn Văn Ai, phường 21, quận Bình Thạnh</p>
              <Button type="link">Thay đổi</Button>
            </div>

            <div className="product-list">
              <div className="product-item">
                <span className="product-name">Sản phẩm A</span>
                <span className="product-price">150,000 đ</span>
                <span className="product-quantity">Số lượng: 1</span>
              </div>
              <div className="product-item">
                <span className="product-name">Sản phẩm B</span>
                <span className="product-price">150,000 đ</span>
                <span className="product-quantity">Số lượng: 1</span>
              </div>
            </div>
          </Col>

          <Col span={8} className="summary-section">
            <h3>Thanh toán</h3>
            <div className="summary-item">
              <span>Thành tiền:</span>
              <span className="total-price">300,000 đ</span>
            </div>
            <div className="payment-method">
              <h4>Phương thức thanh toán</h4>
              <Input placeholder="Thanh toán bằng tiền mặt" />
              <Input placeholder="Thanh toán bằng VNPay" />
            </div>
            <Button type="primary" className="confirm-button">
              Xác nhận
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Payment;