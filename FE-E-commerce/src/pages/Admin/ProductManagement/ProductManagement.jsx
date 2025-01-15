import React, { useState,useEffect } from 'react';
import { Button, Input, Table, Dropdown, Menu, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import "./ProductManagement.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserProvider} from '../../../routes/UserContext'
const ProductManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
		const navigate = useNavigate();
    const [listPrd, setListPrd] = useState([]);
		const userProvider = UserProvider;
    const columns = [
        {
            title: 'ID',
            dataIndex: 'idSanPham',
            key: 'idSanPham',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tenSanPham',
            key: 'tenSanPham',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
        },
        {
            title: 'Số lượt xem',
            dataIndex: 'soLuotXem',
            key: 'soLuotXem',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Dropdown overlay={actionMenu(record)} trigger={['click']}>
                    <Button icon={<EllipsisOutlined />} />
                </Dropdown>
            ),
        },
    ];

		const handleGetListPrd = async ()=>{
			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/getListSanPham',
					{text:searchTerm},
					{
						headers: {'Content-Type': 'application/json'}
					}
				)
				const list = response.data.data.map(prd=>{
					if(prd.trangThai == 0)
						return {...prd, trangThai:"Chưa bán"};
					if(prd.trangThai == 1)
						return {...prd, trangThai: "Đang bán"};
					if(prd.trangThai == 2)
						return {...prd, trangThai: "Ngừng bán"};
				})
				setListPrd(list);
			} catch (e){
				message.error(e.response.data.message);
			}
		}

		useEffect(() =>{
			handleGetListPrd();

		},[]);

    const actionMenu = (record) => (
        <Menu>
            <Menu.Item onClick={() => handleUpdate(record.idSanPham)}>
                Cập nhật
            </Menu.Item>
            <Menu.Item onClick={() => handleDelete(record.idSanPham)}>
                Xóa
            </Menu.Item>
						
            <Menu.Item onClick={() => handleHighlight(record.idSanPham)}>
                {record.noiBat == 0? "Nổi bật":"Hủy nổi bật"}
            </Menu.Item>
        </Menu>
    );

    const handleUpdate = (key) => {
        message.info(`Cập nhật sản phẩm: ${key}`);
        // Logic cập nhật sản phẩm sẽ ở đây
    };

    const handleDelete = (key) => {
        message.warning(`Xóa sản phẩm có STT: ${key}`);
        // Logic xóa sản phẩm sẽ ở đây
    };

    const handleHighlight = (key) => {
        message.success(`Nổi bật sản phẩm có STT: ${key}`);
        // Logic nổi bật sản phẩm sẽ ở đây
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Quản lý sản phẩm</h2>
            <hr />
            <Input
                placeholder="Tìm kiếm sản phẩm theo tên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', marginBottom: '20px' }}
            />
						<Button type="primary" style={{ marginLeft: '10px' }} onClick={()=>handleGetListPrd()}>
                Tìm kiếm sản phẩm
            </Button>
            <Button type="primary" style={{ marginLeft: '10px' }} onClick={()=>navigate('/admin/products/add')}>
                Thêm sản phẩm
            </Button>
            <Table
                dataSource={listPrd}
                columns={columns}
                style={{ marginTop: '20px' }}
                pagination={false}
            />
        </div>
    );
};

export default ProductManagement;