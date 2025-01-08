import React, { useEffect, useState } from "react";
import { Layout, Button, Input, Checkbox } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Thêm import này
import styles from "./ShoppingCart.module.scss"; // Đảm bảo bạn có file SCSS tương ứng
import axios from "axios";

const { Content } = Layout;

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getListSanPhamGioHang");
        console.log(response.data.data.listSanPham);
        const listSanPham = response.data.data.listSanPham;

      const mappedItems = listSanPham.map((item) => ({
        id: item.idSanPham,
        name: item.tenSanPham,
        price: item.gia,
        quantity: item.soLuong,
        selected: false, 
      }));

       setCartItems(mappedItems);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchCartItems();
  },[]);

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

  const toggleSelectItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePaymentClick = () => {
    navigate("/payment", { state: { selectedItems } });
  };

  return (
    <Layout>
      <Content className={styles.cartContainer}>
        <h2>Giỏ hàng</h2>
        <Button onClick={toggleSelectAll} style={{ marginBottom: 20 }}>
          {cartItems.every((item) => item.selected) ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </Button>
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <Checkbox
                  checked={item.selected}
                  onChange={() => toggleSelectItem(item.id)}
                />
                <h3 className={styles.cartItem_title}>{item.name}</h3>
                <p className={styles.cartItem_price}>{item.price.toLocaleString()} đ</p>
                <div className={styles.quantityControls}>
                  <Button onClick={() => handleDecrease(item.id)}>-</Button>
                  <Input value={item.quantity} readOnly style={{ width: "50px", textAlign: "center" }} />
                  <Button onClick={() => handleIncrease(item.id)}>+</Button>
                  <Button
                    type="primary"
                    danger
                    icon={<AiFillDelete />}
                    onClick={() => handleRemove(item.id)}
                    className={styles.deleteButton}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalContainer}>
            <h3>Tổng tiền: {totalAmount.toLocaleString()} đ</h3>
            <Button type="primary" className={styles.orderButton} onClick={handlePaymentClick}>
              Đặt hàng ngay
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ShoppingCart;