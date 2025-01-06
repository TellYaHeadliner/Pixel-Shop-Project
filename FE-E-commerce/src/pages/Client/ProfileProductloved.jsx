import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Flex } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Dữ liệu mẫu ban đầu
const initialData = [
  {
    key: "1",
    tenSanPham: "Laptop",
    gia: "1000",
    
  },
  {
    key: "2",
    tenSanPham: "Smartphone",
    gia: "500",
    
  },
  {
    key: "3",
    tenSanPham: "Headphones",
    gia: "200",
   
  },
];

export default function ProfileProductloved() {
  const [dataSource, setDataSource] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const navigate = useNavigate(); 
 
  useEffect(() => {
    setDataSource(initialData);
  }, []);

  const showDeleteConfirm = (key) => {
    setSelectedRowKey(key);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newData = dataSource.filter((item) => item.key !== selectedRowKey);
    setDataSource(newData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      render: (text, record) => (
        <a
          onClick={() => navigate(`/product/${record.key}`)} 
          style={{ color:'black', textDecoration:'underline' }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space style={{marginRight:-100, padding:0}}>
          <a onClick={() => showDeleteConfirm(record.key)} style={{color:'red',display:Flex, justifyContent:"flex-start"}}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: 20, width: "1000px" }}>
      {dataSource.length===0 ? (
        <p>không có sản phẩm nào</p>
      ) : (
          <Table 
          columns={columns} 
          dataSource={dataSource} 
          pagination={false} 
          style={{ width: 950 }} 
          />
      )}
      
      
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Bạn chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
    </div>
  );
}
