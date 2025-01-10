import React, { useEffect, useState, useContext } from "react";
import { Layout, Button, Input, Checkbox,Pagination, message, notification, Modal } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "./ShoppingCart.module.scss";
import { UserContext } from "../../../routes/UserContext.jsx";

import axios from "axios";

const { Content } = Layout;

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setTrigger } = useContext(UserContext);
  const [currentPage,setCurrentPage]=useState(1);

  const itemsPerPage=5;
  const indexOfLastItem= currentPage* itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem); 

  const selectedItems = cartItems.filter((item) => item.selected);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getListSanPhamGioHang"
        );
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
        console.error("Lỗi:", error);
      }
    };

    fetchCartItems();
  }, []);

  const callAPIUpdateSoLuong = async (idSanPham, soLuong) => {
    setLoading(true);
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/updateSoLuongSanPhamGioHang",
        {
          idSanPham: idSanPham,
          soLuong: soLuong,
          token:token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        console.log(response.data);
        return true;
      }
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (id) => {
    if (loading) return;
    let index = cartItems.findIndex((item) => item.id === id);
    console.log(cartItems[index].quantity + 1);
    console.log(cartItems[index].id);

    const callAPIupdate = await callAPIUpdateSoLuong(
      cartItems[index].id,
      cartItems[index].quantity + 1
    );

    if (callAPIupdate) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const handleDecrease = async (id) => {
    if (loading) return;
    let index = cartItems.findIndex((item) => item.id === id);
    console.log(cartItems[index].quantity - 1);
    console.log(cartItems[index].id);

    const callAPIupdate = await callAPIUpdateSoLuong(
      cartItems[index].id,
      cartItems[index].quantity - 1
    );

    if (callAPIupdate) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const handleRemove = async (id) => {
    let index = cartItems.findIndex((item) => item.id === id);
    try {
      const response = await axios.request({
        url: "http://127.0.0.1:8000/api/deleteSanPhamId",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          idSanPham: cartItems[index].id,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setTrigger((prev) => !prev);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveAll = async () => {
    const idArray = selectedItems.map((product) => product.id);
    console.log(idArray);

    if (idArray.length < 1) {
      return notification.open({
        message: "Thông báo lỗi",
        description: "Chọn sản phẩm cần xóa !",
        onClick: () => {
          console.log("Thông báo được click!");
        },
      });
    }

    Modal.confirm({
      title:"Xác nhận xóa tất cả sản phẩm",
      content:`Bạn có muốn bỏ ${idArray.length} sản phẩm ?`,
      okText:"Có",
      cancelText:"Trở lại",
      onOk: async ()=>{
        try {
          const response = await axios.request({
            url: "http://127.0.0.1:8000/api/deleteSanPhamAll",
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              listIdSanPham: idArray,
            },
          });
          if (response.data.success) {
            setTrigger((prev) => !prev);
            setCartItems((prevItems) => prevItems.filter((item) => !idArray.includes(item.id)));
            toggleSelectAll();
          }
        } catch (err) {
          console.log(err.response.data);
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra khi xóa sản phẩm!",
          });
        }
      },
      onCancel:()=>{
        console.log("Trở lại");
      },
    });    
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

  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePaymentClick = () => {
    navigate("/payment", { state: { selectedItems } });
  };

  return (
    <Layout>
      <Content className={styles.cartContainer}>
        <h2>Giỏ hàng</h2>
        <Button onClick={toggleSelectAll} style={{ marginBottom: 20 }}>
          {cartItems.every((item) => item.selected)
            ? "Bỏ chọn tất cả"
            : "Chọn tất cả"}
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: 20, marginLeft: 20 }}
          icon={<AiFillDelete />}
          danger
          className={styles.deleteButton}
          onClick={handleRemoveAll}
        >
          Xóa
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
                <p className={styles.cartItem_price}>
                  {item.price.toLocaleString()} đ
                </p>
                <div className={styles.quantityControls}>
                  <Button onClick={() => handleDecrease(item.id)}>-</Button>
                  <Input
                    value={item.quantity}
                    readOnly
                    style={{ width: "50px", textAlign: "center" }}
                  />
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
            <Button
              type="primary"
              className={styles.orderButton}
              onClick={handlePaymentClick}
            >
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
