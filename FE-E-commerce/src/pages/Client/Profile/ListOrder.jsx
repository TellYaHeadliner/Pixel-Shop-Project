import React, { useState, useEffect } from "react";
import { Table , message } from "antd";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import axios from "axios";
// Dữ liệu mẫu ban đầu
// const initialData = [
//   {
//     key: "1",
//     idDonHang: "ip15 plus",
//     hoVaTen: "Kiệt",
//     sdt: "10005",
//     diaChi:"10/22b tân hưng",
//     tongTien:"1500"

    
//   },
//   {
//     key: "2",
//     idDonHang:"ip16 promax",
//     hoVaTen: "Vy",
//     sdt: "10005",
//     diaChi:"10/22b tân hưng",
//     tongTien:"1500"
    
//   },
//   {
//     key: "3",
//     idDonHang:"ip12 promax",
//     hoVaTen: "Vyy",
//     sdt: "1005",
//     diaChi:"10/22b tân hưng",
//     tongTien:"1500"
//   },
// ];
const idUser=1;
export default function ListOrderr({trangThai}) {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [ListOrder,setListOrder]=useState([])
 
  useEffect(() => {
    dataSource()
  },[trangThai]);




//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

    const dataSource = async()=>{
        try{
            const response=await axios.post(
                "http://127.0.0.1:8000/api/getListOrder",
                {trangThai:trangThai, idNguoiDung:idUser},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },            
                },
            )
            setListOrder(response.data.data);
           

        }catch(e) {
            message.error(e.response.data.message);
            
        }
    }
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "idHoaDon",
      key: "idHoaDon",
    },
    {
      title: "Họ tên",
      dataIndex: "hoVaTen",
      key: "hoVaTen",
    },
    {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
      },
      {
        title: "Địa chỉ",
        dataIndex: "diaChi",
        key: "diaChi",
      },
      {
        title: "Tổng tiền",
        dataIndex: "tongSoTien",
        key: "tongSoTien",
      }

  ];

  return (
    <div>
      <h1>{trangThai==0? 'Đang chờ xác nhận': trangThai==1?'Đang vận chuyển': trangThai==2? 'Đã nhận':'Đã hủy'}</h1>
      <hr />
      <div style={{ margin: 20, width: "1000px" }}>
            {ListOrder.length===0 ? (
              <p>không có đơn hàng nào</p>
            ) : (
                <Table 
                columns={columns} 
                dataSource={ListOrder} 
                pagination={false} 
                style={{ width: 950 }}
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`${location.pathname}/${record.idHoaDon}`),
                    };
                }}
                />
            )}
          </div>
    </div>
   
  );
}
