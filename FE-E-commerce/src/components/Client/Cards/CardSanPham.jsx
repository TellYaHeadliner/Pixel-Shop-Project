import React from "react";
import { Card } from "antd";
import { BsStar } from "react-icons/bs";
import "./SanPhamCard.module.scss"; // Nhớ import file CSS

const SanPhamCard = () => {
  return (
    <Card
      className="san-pham-card"
      style={{
        backgroundColor: "#6626B9",
        color: "#fff",
        width: "80%",  // Hoặc một kích thước cụ thể như 431px
        border: "none", // Bỏ viền nếu cần
      }}
      cover={
        <img
          alt="Product"
          src="/imgs/product.png"
          className="product-image"
        />
      }
    >
      <Card.Meta
        title="9,999,999đ"
        description={
          <>
            <h3 className="product-title">LAPTOP GAMING MAX</h3>
            <p className="brand-name">HP</p>
            <div className="star-rating">
              <BsStar />
              <BsStar />
              <BsStar />
              <BsStar />
              <BsStar />
            </div>
          </>
        }
      />
    </Card>
  );
};

export default SanPhamCard;