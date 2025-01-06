import React, { useState } from 'react';
import './SupplierManagement.scss';
import { Input, Table, Typography, Row, Col, Button,Form, message } from 'antd';
import { IndentUI } from 'ckeditor5';


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

    return (
        <div className='supplier-management w-100'>
            <h2 className='heading'>Nhà cung cấp</h2>
            <hr />
						<div className='default-bnbg pt-4'>
								<Form
									layout="Horizontal"
								>
									<div className='d-flex'>
											<div className='col-6'>
												<Form.Item
													name="tenNhaCungCap"
													label="Tên nhà cung cấp:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
												>
													<Input/>
												</Form.Item>
												<Form.Item
													name="tenLienHe"
													label="Tên người liên hệ:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
												>
													<Input/>
												</Form.Item>
												<Form.Item
													name="diaChi"
													label="Địa chỉ:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
												>
													<Input/>
												</Form.Item>
											</div>
											<div className='col-6'>
												<Form.Item
													name="soDienThoai"
													label="Số điện thoại:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
												>
													<Input/>
												</Form.Item>
												<Form.Item
													name="email"
													label="Email:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
												>
													<Input/>
												</Form.Item>
												<div className='d-flex justify-content-end buttonAdd'>
													<Button
														htmlType='submit'
													>Thêm</Button>
												</div>
											</div>
									</div>
								</Form>
						</div>
            <hr />
						
            <div className='suppliers-list'>
                <h3 className='list-heading'>Danh sách nhà cung cấp</h3>
                <div className='columns'>
                    <div className='column'>Tên</div>
                    <div className='column'>Địa chỉ</div>
                    <div className='column'>Số điện thoại</div>
                    <div className='column'>Email</div>
                    <div className='column'>Sản phẩm</div>
                </div>
                {suppliers.map((supplier, index) => (
                    <div className='columns' key={index}>
                        <div className='column'>{supplier.name}</div>
                        <div className='column'>{supplier.address}</div>
                        <div className='column'>{supplier.phone}</div>
                        <div className='column'>{supplier.email}</div>
                        <div className='column'>{supplier.product}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupplierManagement;