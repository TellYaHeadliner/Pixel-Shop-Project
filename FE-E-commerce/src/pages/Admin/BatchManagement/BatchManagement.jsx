import React, { useState } from 'react';
import { Button, Input, Table, Dropdown, Menu, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const BatchManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
            dataIndex: 'maLoHang',
            key: 'maLoHang',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'nhaCungCap',
            key: 'nhaCungCap',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
        },
        {
            title: 'Ngày nhập lô',
            dataIndex: 'ngayNhap',
            key: 'ngayNhap',
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
        message.info(`Cập nhật lô hàng: ${record.maLoHang}`);
        // Logic cập nhật lô hàng sẽ ở đây
    };

    const handleDelete = (key) => {
        message.warning(`Xóa lô hàng có mã: ${key}`);
        // Logic xóa lô hàng sẽ ở đây
    };

    const handleHighlight = (key) => {
        message.success(`Nổi bật lô hàng có mã: ${key}`);
        // Logic nổi bật lô hàng sẽ ở đây
    };

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
            <Button type="primary" style={{ marginLeft: '10px' }}>
                Thêm lô hàng
            </Button>
            <Table
                dataSource={dataSource.filter(item => item.maLoHang.toLowerCase().includes(searchTerm.toLowerCase()))}
                columns={columns}
                style={{ marginTop: '20px' }}
                pagination={false}
            />
        </div>
    );
};

export default BatchManagement;