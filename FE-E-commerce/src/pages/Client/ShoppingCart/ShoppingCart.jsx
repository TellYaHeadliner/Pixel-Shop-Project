import React, { useState } from "react";
import { Layout, Button, Input, Badge } from "antd";
import { AiFillDelete } from "react-icons/ai";
import styles from "./ShoppingCart.module.scss"; // Đảm bảo bạn có file SCSS tương ứng

const { Content } = Layout;

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sản phẩm A", price: 100000, quantity: 1 },
    { id: 2, name: "Sản phẩm B", price: 200000, quantity: 1 },
  ]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout>
      <Content className={styles.cartContainer}>
        <h2>Giỏ hàng</h2>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.productInfo}>
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString()} đ</p>
            </div>
            <div className={styles.quantityControls}>
              <Button onClick={() => handleDecrease(item.id)}>-</Button>
              <Input value={item.quantity} readOnly style={{ width: "50px", textAlign: "center" }} />
              <Button onClick={() => handleIncrease(item.id)}>+</Button>
            </div>
            <Button
              type="primary"
              danger
              icon={<AiFillDelete />}
              onClick={() => handleRemove(item.id)}
            />
          </div>
        ))}
        <div className={styles.totalAmount}>
          <h3>Tổng tiền: {totalAmount.toLocaleString()} đ</h3>
          <Button type="primary" className={styles.orderButton}>
            Đặt hàng ngay
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default ShoppingCart;