import React, { useState } from "react";
import { Layout, Button, Input, Checkbox, Pagination, Modal } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "./ShoppingCart.module.scss";

const { Content } = Layout;

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sản phẩm A", price: 100000, quantity: 1, selected: false },
    { id: 2, name: "Sản phẩm B", price: 200000, quantity: 1, selected: false },
    { id: 3, name: "Sản phẩm C", price: 200000, quantity: 1, selected: false },
    { id: 4, name: "Điện thoại X", price: 5000000, quantity: 1, selected: false },
    { id: 5, name: "Laptop Y", price: 15000000, quantity: 1, selected: false },
    { id: 6, name: "Máy tính bảng Z", price: 3000000, quantity: 1, selected: false },
    { id: 7, name: "Tai nghe A", price: 1000000, quantity: 1, selected: false },
    { id: 8, name: "Loa Bluetooth B", price: 2000000, quantity: 1, selected: false },
    { id: 9, name: "Đồng hồ thông minh C", price: 2500000, quantity: 1, selected: false },
    { id: 10, name: "Camera D", price: 4000000, quantity: 1, selected: false },
    { id: 11, name: "Máy ảnh E", price: 12000000, quantity: 1, selected: false },
    { id: 12, name: "Máy chiếu F", price: 8000000, quantity: 1, selected: false },
    { id: 13, name: "Ổ cứng gắn ngoài G", price: 1500000, quantity: 1, selected: false },
    { id: 14, name: "Bàn phím H", price: 600000, quantity: 1, selected: false },
    { id: 15, name: "Chuột I", price: 300000, quantity: 1, selected: false },
    { id: 16, name: "Router J", price: 1200000, quantity: 1, selected: false },
    { id: 17, name: "Phụ kiện K", price: 500000, quantity: 1, selected: false },
    { id: 18, name: "Pin sạc L", price: 200000, quantity: 1, selected: false },
    { id: 19, name: "Máy tính để bàn M", price: 10000000, quantity: 1, selected: false },
    { id: 20, name: "Phần mềm N", price: 900000, quantity: 1, selected: false },
    { id: 21, name: "Thiết bị O", price: 500000, quantity: 1, selected: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const showRemoveAllConfirm = () => {
    Modal.confirm({
      title: "Xóa tất cả sản phẩm",
      content: "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?",
      onOk: handleRemoveAll,
    });
  };

  const handleRemoveAll = () => {
    setCartItems([]);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <Content className={styles.cartContainer}>
        <h2>Giỏ hàng</h2>
        <Button onClick={toggleSelectAll} style={{ marginBottom: 20 }}>
          {cartItems.every((item) => item.selected) ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </Button>
        <Button type="danger" onClick={showRemoveAllConfirm} style={{ marginBottom: 20 }}>
          Xóa tất cả
        </Button>
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {currentItems.map((item) => (
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
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={cartItems.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 20, textAlign: 'center' }}
        />
      </Content>
    </Layout>
  );
};

export default ShoppingCart;