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
  const [idNguoiDung, setIdNguoiDung] = useState(null);
  const [login, setLogin] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  };



  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/getListSanPhamGioHang",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization':`Bearer ${token}`
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

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = getCookie("token");
        if (!token) return; 
        const response = await axios.post(
          "http://127.0.0.1:8000/api/checkToken",
          {
            token: token,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const { idNguoiDung, hoVaTen, anhDaiDien, role } = response.data.data;
        setRole(role);
        setLoading(false);
        setIdNguoiDung(idNguoiDung);
        setHoVaTen(hoVaTen);
        setAnhDaiDien(anhDaiDien);
        setLogin(true);
        setToken(token);
      } catch (err) {
        setLoading(false);
        setLogin(false);
      }
    };
    checkToken();
  }, []);


  useEffect(() => {
    if (loading || !token) return; 
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/getListSanPhamGioHang",
          {},
          {
            headers: {
              "Authorization": `Bearer ${token}`,
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
    fetchCartItemCount();
  }, [token, loading , trigger]);


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
        setTrigger,
        login,
        setLogin,
        loading,
				setLoading,
        idNguoiDung,
        getCookie
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
