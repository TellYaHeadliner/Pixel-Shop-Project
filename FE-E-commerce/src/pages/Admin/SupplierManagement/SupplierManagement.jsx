import React, { useState } from 'react';
import { Input, Button, Table, Typography, Row, Col } from 'antd';
import './SupplierManagement.scss';

const { Title } = Typography;

const SupplierManagement = () => {
    const [inputs, setInputs] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        product: '',
    });

    const [suppliers, setSuppliers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = () => {
        setSuppliers([...suppliers, inputs]);
        setInputs({
            name: '',
            address: '',
            phone: '',
            email: '',
            product: '',
        });
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
        },
    ];

    return (
        <div className='supplier-management'>
            <Title level={2} className='heading'>Nhà cung cấp</Title>
            <hr />

            <Row gutter={16}>
                <Col span={4}>
                    <Input
                        name='name'
                        placeholder='Tên nhà cung cấp'
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </Col>
                <Col span={4}>
                    <Input
                        name='address'
                        placeholder='Địa chỉ'
                        value={inputs.address}
                        onChange={handleChange}
                    />
                </Col>
                <Col span={4}>
                    <Input
                        name='phone'
                        placeholder='Số điện thoại'
                        value={inputs.phone}
                        onChange={handleChange}
                    />
                </Col>
                <Col span={4}>
                    <Input
                        name='email'
                        placeholder='Email'
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </Col>
                <Col span={4}>
                    <Input
                        name='product'
                        placeholder='Sản phẩm cung cấp'
                        value={inputs.product}
                        onChange={handleChange}
                    />
                </Col>
                <Col span={4}>
                    <Button type='primary' onClick={handleSubmit}>
                        Thêm
                    </Button>
                </Col>
            </Row>

            <hr />
            <Title level={3} className='list-heading'>Danh sách nhà cung cấp</Title>
            <Table
                dataSource={suppliers.map((supplier, index) => ({ key: index, ...supplier }))}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};

export default SupplierManagement;