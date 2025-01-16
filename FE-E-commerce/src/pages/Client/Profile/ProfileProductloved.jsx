import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Flex,message} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';


export default function ProfileProductloved() {
  const [ListLoved, setListLoved] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const navigate = useNavigate(); 
  const idUser=1;
 
  useEffect(() => {
    dataSource();
  }, []);

  const showDeleteConfirm = (key) => {
    setSelectedRowKey(key);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
    const response = await axios.delete(
      'http://127.0.0.1:8000/api/deleteYeuThich',
      {
        headers: {'Content-Type': 'application/json'},
        data: { idNguoiDung: idUser, idSanPham: selectedRowKey },
      }
    )
    setIsModalVisible(false);
    dataSource();
    
    } catch (e){
      message.error(e.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dataSource =async()=>{
    try{
      const reponse = await axios.post(
        "http://127.0.0.1:8000/api/getListYeuThich",
        {idNguoiDung:idUser},
        {
          headers: {
            "Content-Type": "application/json",
        }, 
        }
      )
      setListLoved(reponse.data.data)
      console.log(reponse.data.data)
      
    }catch(e){
      message.error(e.response.data.message);
    }
  }

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      render: (text, record) => (
        <a
          onClick={() => navigate(`/product/${record.idSanPham}`)} 
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
          <a onClick={() => showDeleteConfirm(record.idSanPham)} style={{color:'red',display:Flex, justifyContent:"flex-start"}}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Sản phẩm yêu thích</h1>
      <hr />
      <div style={{ margin: 20, width: "1000px" }}>
            {ListLoved.length===0 ? (
              <p>không có sản phẩm nào</p>
            ) : (
                <Table 
                columns={columns} 
                dataSource={ListLoved} 
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
    </div>
   
  );
}
