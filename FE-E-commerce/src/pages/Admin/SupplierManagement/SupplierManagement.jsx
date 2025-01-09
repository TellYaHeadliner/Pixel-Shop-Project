import React, { useEffect, useState } from 'react';
import './SupplierManagement.scss';
import { Input, Table, Typography, Button,Form,Space,Tag , message} from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SupplierManagement = () => {
    const [suppliers, setSuppliers] = useState([]);
		const handleListSuppliers = async () => {
			try {
				const response = await axios.get("http://127.0.0.1:8000/api/listNhaCungCap");
				console.log(response.data.data);
				setSuppliers(response.data.data);
			} catch (e){
				message.error(e.message || "Đã có lỗi xảy ra khi lấy dữ liệu!");
			}
		}
		useEffect(()=>{
			handleListSuppliers();
		},[]);
		const handleAddSupplier = async (values) => {
			const {tenNhaCungCap , tenLienHe, diaChi, soDienThoai, email} = values;
			try {
				const response = await axios.post(
					"http://127.0.0.1:8000/api/addNhaCungCap",
					{tenNhaCungCap , tenLienHe, diaChi, soDienThoai, email},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if(response.data.success){
					message.success(response.data.message);
					handleListSuppliers();
				}
			}catch(e) {
				const data = e.response.data;
				message.error(data.message);
			}
		}
		
		const columns = [
			{
				title: 'Tên nhà cung cấp',
				dataIndex: 'tenNhaCungCap',
				key: 'tenNhaCungCap',
			},
			{
      title: 'Tên liên hệ',
      dataIndex: 'tenLienHe',
      key: 'tenLienHe',
			},
			{
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
			},
			{
				title: 'Số điện thoại',
				dataIndex: 'soDienThoai',
				key: 'soDienThoai',
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
		];

    return (
        <div className='supplier-management w-100'>
            <h2 className='heading'>Nhà cung cấp</h2>
            <hr />
						<div className='default-bnbg pt-4'>
								<Form
									layout="Horizontal"
									onFinish={handleAddSupplier}
								>
									<div className='d-flex'>
											<div className='col-6'>
												<Form.Item
													name="tenNhaCungCap"
													label="Tên nhà cung cấp:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
													rules={[
														{required: true, whitespace: true, message: 'Vui lòng nhập tên nhà cung cấp!'}
													]}
												>
													<Input/>
												</Form.Item>
												<Form.Item
													name="tenLienHe"
													label="Tên người liên hệ:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
													rules={[
														{required: true, whitespace: true, message: 'Vui lòng nhập tên người liên hệ!'}
													]}
												>
													<Input/>
												</Form.Item>
												<Form.Item
													name="diaChi"
													label="Địa chỉ:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
													rules={[
														{required: true, whitespace: true, message: 'Vui lòng nhập địa chỉ nhà cung cấp!'}
													]}
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
													rules={[
														{required: true, message: 'Vui lòng nhập số điện thoại!'},
														{
															pattern: /^0\d{9}$/,
															message: 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0!',
														}
													]}
												>
													<Input/>
												</Form.Item>
												<Form.Item
													name="email"
													label="Email:"
													labelCol={{span: 7}}
													wrapperCol={{span: 15}}
													rules={[
														{ required: true, message: 'Vui lòng nhập email!' },
														{ type: 'email', message: 'Định dạng email không hợp lệ!' },
													]}
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
						{suppliers.length==0?
							<div className='d-flex justify-content-center'>
								<h5>Chưa có nhà cung cấp nào trong hệ thống!</h5>
							</div>
						:
							<Table columns={columns} dataSource={suppliers} pagination={false} />
							// <div className='suppliers-list'>
							// 		<h3 className='list-heading'>Danh sách nhà cung cấp</h3>
							// 		<div className='columns'>
							// 				<div className='column'>Tên</div>
							// 				<div className='column'>Địa chỉ</div>
							// 				<div className='column'>Người liên hệ</div>
							// 				<div className='column'>Số điện thoại</div>
							// 				<div className='column'>Email</div>
							// 		</div>
							// 		{suppliers.map((supplier, index) => (
							// 				<div className='columns' key={index}>
							// 						<div className='column'>{supplier.tenNhaCungCap}</div>
							// 						<div className='column'>{supplier.diaChi}</div>
							// 						<div className='column'>{supplier.tenLienHe}</div>
							// 						<div className='column'>{supplier.soDienThoai}</div>
							// 						<div className='column'>{supplier.email}</div>
							// 				</div>
							// 		))}
							// </div>
						}
        </div>
    );
};

export default SupplierManagement;