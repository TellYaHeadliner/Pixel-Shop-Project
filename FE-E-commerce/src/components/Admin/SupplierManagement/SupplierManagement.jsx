import React, { useState } from 'react';
import './SupplierManagement.scss';

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
        <div className='supplier-management'>
            <h2 className='heading'>Nhà cung cấp</h2>
            <div className='input-container'>
                <input
                    type='text'
                    name='name'
                    placeholder='Tên nhà cung cấp'
                    value={inputs.name}
                    onChange={handleChange}
                    className='input-field'
                />
                <input
                    type='text'
                    name='address'
                    placeholder='Địa chỉ'
                    value={inputs.address}
                    onChange={handleChange}
                    className='input-field'
                />
                <input
                    type='tel'
                    name='phone'
                    placeholder='Số điện thoại'
                    value={inputs.phone}
                    onChange={handleChange}
                    className='input-field'
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={inputs.email}
                    onChange={handleChange}
                    className='input-field'
                />
                <input
                    type='text'
                    name='product'
                    placeholder='Sản phẩm cung cấp'
                    value={inputs.product}
                    onChange={handleChange}
                    className='input-field'
                />
                <button onClick={handleSubmit} className='add-button'>Thêm</button>
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