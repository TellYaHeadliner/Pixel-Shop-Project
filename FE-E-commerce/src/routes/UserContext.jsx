// src/UserContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [anhDaiDien, setAnhDaiDien] = useState(null);
  const [email, setEmail] = useState(null);
  const [hoVaTen, setHoVaTen] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [trigger, setTrigger] = useState(false);



  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getListSanPhamGioHang",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.data;
        setCartItemCount(data.listSanPham.length);
    } catch (err) {}

        if (token) {
          fetchCartItemCount();
        }
    };
  }, [token]);

  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/getListSanPhamGioHang",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;
      setCartItemCount(data.listSanPham.length);
    } catch (err) {
      console.error("Lỗi khi fetch số lượng sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchCartItemCount();
  }, [trigger]);

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        token,
        setToken,
        anhDaiDien,
        setAnhDaiDien,
        email,
        setEmail,
        hoVaTen,
        setHoVaTen,
        cartItemCount,
        setCartItemCount,
        setTrigger
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
