import React, { useState, useEffect, useContext } from "react";
import { message, Table, Tag } from "antd";
import axios from "axios";
import { UserContext } from '../../../routes/UserContext'; 

export default function ProfileRatedProducts() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const {token} = useContext(UserContext);

  // useEffect(() => {
  //   // Giả sử bạn có API lấy tất cả sản phẩm
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/api/products");
  //       const result = await response.json();
  //       setProducts(result); // Lưu danh sách sản phẩm
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   // Giả sử bạn có API lấy các đánh giá
  //   const fetchRatings = async () => {
  //     try {
  //       const response = await fetch("/api/ratings");
  //       const result = await response.json();
  //       setData(result); // Lưu danh sách đánh giá
  //     } catch (error) {
  //       console.error("Error fetching ratings:", error);
  //     }
  //   };

  //   fetchProducts();
  //   fetchRatings();
  // }, []);

  // const getProductNameById = (id) => {
  //   const product = products.find((prod) => prod.id === id);
  //   return product ? product.name : "Không có tên sản phẩm";
  // };

  const handleGetProduct=async()=>{
    try{
      const response=await axios.get(
      "http://127.0.0.1:8000/api/getListDanhGia",
      {
        headers:{
          'Authorization': 'Bearer ' + token,
          "Content-Type": "application/json",
        },
      }
      )
      setData(response.data.data)
    }catch(e){
    message.error(e.response.data.err);
  }}
  useEffect(()=>{
    handleGetProduct();
  },[])
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham", // Giả sử dữ liệu trả về từ API có trường 'productId'
      key: "tenSanPham",
    },
    {
      title: "Số sao",
      dataIndex: "soSao",
      key: "soSao",
      render: (soSao) => (
        <Tag color={soSao >= 4 ? "green" : soSao === 3 ? "orange" : "red"}>
          {soSao} ★
        </Tag>
      ),
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "ngayGio",
      key: "date",
    },
  ];

  return (
    <div>
      <h2>Sản phẩm đã đánh giá</h2>
      <hr />
      <div style={{ padding: "20px" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>
    </div>
  );
}
