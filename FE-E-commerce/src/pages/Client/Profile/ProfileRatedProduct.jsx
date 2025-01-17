import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";

export default function ProfileRatedProducts() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Giả sử bạn có API lấy tất cả sản phẩm
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();
        setProducts(result); // Lưu danh sách sản phẩm
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Giả sử bạn có API lấy các đánh giá
    const fetchRatings = async () => {
      try {
        const response = await fetch("/api/ratings");
        const result = await response.json();
        setData(result); // Lưu danh sách đánh giá
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchProducts();
    fetchRatings();
  }, []);

  const getProductNameById = (id) => {
    const product = products.find((prod) => prod.id === id);
    return product ? product.name : "Không có tên sản phẩm";
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productId", // Giả sử dữ liệu trả về từ API có trường 'productId'
      key: "productName",
      render: (productId) => getProductNameById(productId), // Lấy tên sản phẩm từ ID
    },
    {
      title: "Số sao",
      dataIndex: "soSao",
      key: "rating",
      render: (rating) => (
        <Tag color={rating >= 4 ? "green" : rating === 3 ? "orange" : "red"}>
          {rating} ★
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
