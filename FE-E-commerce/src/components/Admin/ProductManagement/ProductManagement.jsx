import React, { useState } from 'react';
import { Button, Input, Table, Dropdown, Menu, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import "./ProductManagement.scss"
const ProductManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Dữ liệu mẫu cho bảng
    const dataSource = [
        {
            key: '1',
            stt: 1,
            tenSanPham: 'Sản phẩm 1',
            gia: 100000,
            soLuong: 50,
            danhMuc: 'Danh mục 1',
            soLuotXem: 200,
            trangThai: 'Còn hàng',
        },
        {
            key: '2',
            stt: 2,
            tenSanPham: 'Sản phẩm 2',
            gia: 150000,
            soLuong: 30,
            danhMuc: 'Danh mục 2',
            soLuotXem: 150,
            trangThai: 'Hết hàng',
        },
        // Thêm dữ liệu mẫu khác nếu cần
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
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
            title: 'Danh mục',
            dataIndex: 'danhMuc',
            key: 'danhMuc',
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

    const actionMenu = (record) => (
        <Menu>
            <Menu.Item onClick={() => handleUpdate(record)}>
                Cập nhật
            </Menu.Item>
            <Menu.Item onClick={() => handleDelete(record.key)}>
                Xóa
            </Menu.Item>
            <Menu.Item onClick={() => handleHighlight(record.key)}>
                Nổi bật
            </Menu.Item>
        </Menu>
    );

    const handleUpdate = (record) => {
        message.info(`Cập nhật sản phẩm: ${record.tenSanPham}`);
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
            <Button type="primary" style={{ marginLeft: '10px' }}>
                Thêm sản phẩm
            </Button>
            <Table
                dataSource={dataSource.filter(item => item.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase()))}
                columns={columns}
                style={{ marginTop: '20px' }}
                pagination={false}
            />
        </div>
    );
};

export default ProductManagement;