import React, { useState, useContext, useEffect} from "react";
import { Table, Button, Modal, message, Tag } from "antd";
import "antd/dist/reset.css";
import {  useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../../routes/UserContext'; 


export default function ProfileOrderBeingShip() {
  const {id} = useParams();
  const {token} = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleHuyDon = async()=>{
    try{
      const response= await axios.put(
         "http://127.0.0.1:8000/api/updateStatusHoaDon",
         {idHoaDon:id,trangThai:3},
         {
          headers:{
            'Authorization': 'Bearer ' + token,
            "Content-Type": "application/json",
          },
         } 
      )
      if(response.data.success) {
        message.success(response.data.message);
      }
  }catch(e){

    message.error(e.response.data.message);
    }
  }
  
  
 
  const renderOrderStatus = (status) => {
    switch (status) {
      case 0:
        return <Tag color="blue">Chờ xác nhận</Tag>;
      case 1:
        return <Tag color="orange">Đang vận chuyển</Tag>;
      case 2:
        return <Tag color="green">Đã nhận</Tag>;
      case 3:
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };
  
  const handleGetListHoaDon = async()=>{
    try{
      const response= await axios.get(
         "http://127.0.0.1:8000/api/getHoaDonById/"+id,
{
          headers:{
            'Authorization': 'Bearer ' + token,
            "Content-Type": "application/json",
          },
         } 
      )
      if(response.data.success) {
        console.log(response.data.data)
        setOrderData(response.data.data);
      }
  }catch(e){

      console.log(e.response.data)
    }
  }
 
  
  useEffect(()=>{
    handleGetListHoaDon();
  },[]);
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={'http://127.0.0.1:8000/imgs/'+img} alt="Product" style={{ width: "50px" }} />,
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Lịch sử đơn hàng {orderData[0]?.idHoaDon??""}</h2>
      <p>
        <strong>Tên khách hàng: {orderData[0]?.hoVaTenDC ?? ""}</strong> 
      </p>
      <p>
        <strong>Địa chỉ giao hàng:</strong> {orderData[0]?.diaChi??""}
      </p>
      <p>
        <strong>Tổng số tiền:</strong> {orderData[0]?.tongTien??""}
      </p>
      <p>
        <strong>Trạng thái:</strong> {renderOrderStatus(orderData[0]?.trangThai??"")}
      </p>
      <p>
        <strong>Phương thức thanh toán:</strong> {orderData[0]?.phuongThucThanhToan?"COD":"VNPay"}
      </p>
      <p>
        <strong>Ngày đặt hàng:</strong> {orderData[0]?.ngayDat??""}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {orderData[0]?.sdt??""}
      </p>


      <h3 style={{ marginTop: "20px" }}>Chi tiết đơn hàng:</h3>
      <Table dataSource={orderData} columns={columns} pagination={false} bordered />

     
    </div>
  );
}
