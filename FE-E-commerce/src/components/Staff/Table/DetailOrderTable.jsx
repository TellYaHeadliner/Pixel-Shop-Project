import { Table } from "antd"
import { useState } from "react"



const DetailOrderTable = ({ detailData }) => {
    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Hình ảnh sản phẩm",
        dataIndex: "hinhanhSanPham",
        key: "hinhanhSanPham",
        render: (text, record) => (
          <img
            src={`http://127.0.0.1:8000/imgs/${record.img}`} // Assuming 'text' is the URL of the image
            alt={text}
            style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust size as needed
          />
        ),
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "tenSanPham",
        key: "tenSanPham",
      },
      {
        title: "Giá sản phẩm",
        dataIndex: "gia",
        key: "gia",
      },
      {
        title: "Số lượng",
        dataIndex: "soLuong",
        key: "soLuong",
      },
    ];
    return (
        <Table
            rowKey='idSanPham'
            columns={columns}
            dataSource={detailData}
        />
    );
}

export default DetailOrderTable;