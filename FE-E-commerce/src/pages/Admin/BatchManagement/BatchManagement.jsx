import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Dropdown, Menu, message} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import axios from 'axios';

const BatchManagement = () => {
		const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
		const [loHang,setLoHang] = useState([])
		const [nhaCungCap,setNhaCungCap] = useState([]);
    // Dữ liệu mẫu cho bảng
    const dataSource = [
        {
            key: '1',
            maLoHang: 'LH001',
            nhaCungCap: 'Nhà cung cấp A',
            soLuong: 100,
            ngayNhap: '2023-01-01',
        },
        {
            key: '2',
            maLoHang: 'LH002',
            nhaCungCap: 'Nhà cung cấp B',
            soLuong: 200,
            ngayNhap: '2023-02-15',
        },
        // Thêm dữ liệu mẫu khác nếu cần
    ];

    const columns = [
        {
            title: 'Mã lô hàng',
            dataIndex: 'idLoHang',
            key: 'idLoHang',
        },
        {
					title: 'Nhà cung cấp',
					dataIndex: 'idNhaCungCap',
					key: 'idNhaCungCap',
					render: (text) => {
						// Kiểm tra giá trị của text trước khi tìm kiếm
						const n = nhaCungCap.find(ncc => ncc?.idNhaCungCap == text);
						return n ? n.tenNhaCungCap : "Chưa có nhà cung cấp"; // Trả về "Chưa có nhà cung cấp" nếu không tìm thấy
					}
				},
        {
            title: 'Tổng giá nhập',
            dataIndex: 'tongNhap',
            key: 'tongNhap',
						render: (text)=>{return text+' VNĐ'}
        },
        {
            title: 'Ngày nhập lô',
            dataIndex: 'date',
            key: 'date',
        },
    ];
		const handleGetLH = async () => {
			try{
				const response = await axios.get('http://127.0.0.1:8000/api/getListLoHang');
				console.log(response.data.data);
				setLoHang(response.data.data);
			}catch(e){
				message.error(e.response.data.message);
			}
		}
		const handleGetNCC = async () => {
			try{
				const response = await axios.get('http://127.0.0.1:8000/api/listNhaCungCap');
				setNhaCungCap(response.data.data);
			}catch(e){
				message.error(e.response.data.message);
			}
		}
		useEffect(() => {
			handleGetLH();
			handleGetNCC();
		},[]);
    return (
        <div style={{ padding: '20px' }}>
            <h2>Quản lý lô hàng</h2>
            <hr />
            <Input
                placeholder="Tìm kiếm lô hàng theo mã"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', marginBottom: '20px' }}
            />
            <Button type="primary" style={{ marginLeft: '10px' }} onClick={()=>navigate('add')}>
                Thêm lô hàng
            </Button>
            <Table
                dataSource={loHang.filter(item => String(item?.idLoHang).includes(searchTerm.toLowerCase()))}
                columns={columns}
                style={{ marginTop: '20px' }}
                pagination={false}
            />
        </div>
    );
};

export default BatchManagement;