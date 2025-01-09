import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";

export default function ProfileRatedProducts() {
  // Dữ liệu tĩnh (giả sử lấy từ API)
  const [data, setData] = useState([]);

  useEffect(() => {
    // Dữ liệu tĩnh thay cho API
    const staticData = [
      {
        key: "1",
        productName: "Laptop Dell XPS 13",
        rating: 4,
        date: "2025-01-07 14:30",
      },
      {
        key: "2",
        productName: "Điện thoại iPhone 15 Pro",
        rating: 5,
        date: "2025-01-06 10:15",
      },
      {
        key: "3",
        productName: "Tai nghe Sony WH-1000XM5",
        rating: 3,
        date: "2025-01-05 17:00",
      },
      {
        key: "4",
        productName: "Đồng hồ thông minh Garmin Fenix 7",
        rating: 4,
        date: "2025-01-04 08:45",
      },
    ];

    // Giả lập API call bằng cách set dữ liệu
    setData(staticData);
  }, []);

  // Cột hiển thị cho bảng
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số sao",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Tag color={rating >= 4 ? "green" : rating === 3 ? "orange" : "red"}>
          {rating} ★
        </Tag>
      ),
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Sản phẩm đã đánh giá</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}
