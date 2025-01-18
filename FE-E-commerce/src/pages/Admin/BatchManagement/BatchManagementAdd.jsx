import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Dropdown, Menu, message, Form, Select, Modal, Checkbox } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import axios from 'axios';
const BatchManagement = () => {
	const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tenSanPham',
      width: '45%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: '45%',
			render: (text)=>(text == 0 ? "Chưa bán" : "Đang bán")
    },
  ];
	const [form] = Form.useForm();
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [tam,setTam] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [data, setData] = useState([{tenSanPham: "", idSanPham:""}] );
	const [nhaCungCap, setNhaCungCap] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const handleGetSP = async ()=>{
		try{
			const response = await axios.post(
				'http://127.0.0.1:8000/api/getListSanPham',
				{trangThai: [0,1], condition: 3},
				{
					headers: {'Content-Type': 'application/json'},
				}
			)
			setData(response.data.data)
		}catch(e){
			console.log(e);
			message.error(e.response.data.message);
		}
	}
	const handleGetNCC = async ()=>{
		try{
			const response = await axios.get('http://127.0.0.1:8000/api/listNhaCungCap');
			console.log("NCC");
			console.log(response.data.data);
			setNhaCungCap(response.data.data);
		}catch(e){
			message.error(e.response.data.message);
		}
	}
	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		setSearchText(value);
	};
	const handleOpenModal = ()=>{
		setTam([...selectedRowKeys]);
		setShowModal(true);
	}
	const handleOk = ()=>{
		setShowModal(false);
	};
	const handleCancel = ()=>{
		setSelectedRowKeys([...tam]);
		setShowModal(false);
	};
	const filteredData = data.filter((item) =>
    item.tenSanPham.toLowerCase().includes(searchText)
  );
	const  formMap = () => {
			return selectedRowKeys.map(idSanPham => {
					const sp = data.find(sp => sp.idSanPham == idSanPham);
					if (!sp) {
						return null;
					}
					return (
						<div className='w-100 d-flex'>
							<Form.Item
									className='w-50'
									key={'s'+idSanPham}
									name={'s'+idSanPham}
									label={sp.tenSanPham}
									labelCol={{span:16}}
									wrapperCol={{span: 7}}
									rules={[
										{ required: true, message: 'Nhập số lượng sản phẩm!' },
									]}
							>
									<Input 
										placeholder='Số lượng'
										type='number'
										onChange={(e)=>{
											if(e.target.value <= 0)
												form.setFieldsValue({['s'+idSanPham]: ""})
											let newValue = "";
											for(let i of e.target.value){
												if(i==".")
													form.setFieldsValue({['s'+idSanPham]: newValue})
												newValue = newValue + i;
											}
										}}/>
							</Form.Item>
							<Form.Item
								key={'g'+idSanPham}
								name={'g'+idSanPham}
								wrapperCol={{span: 21}}
								rules={[
										{ required: true, message: 'Nhập giá sản phẩm!' },
									]}
							>
								<Input
									placeholder='Giá nhập (VNĐ)'
									type='number'
									onChange={(e)=>{
										if(e.target.value <= 0)
											form.setFieldsValue({['g'+idSanPham]: ""})
										let newValue = "";
										for(let i of e.target.value){
											if(i==".")
												form.setFieldsValue({['g'+idSanPham]: newValue})
											newValue = newValue + i;
										}
									}}
								/>
							</Form.Item>
							<Button type='dashed' danger
								onClick={()=>{
									const updatedSelectedRowKeys = selectedRowKeys.filter(key => key !== idSanPham);
    							setSelectedRowKeys(updatedSelectedRowKeys);
								}}	
							>Xóa</Button>
						</div>
					);
			});
	};
	const handleSubmit = async (values) => {
		
		if(selectedRowKeys.length == 0)
			return message.error("Chưa thêm sản phẩm nào vào lô hàng!")
		values['idSanPham'] = selectedRowKeys;
		console.log(values);
		try{
			const response = await axios.post('http://127.0.0.1:8000/api/addLoHang',
																				values,
																				{
																					headers: { 'Content-Type': 'application/json'},
																				}
																			);
			message.success(response.data.message);
		}catch(e){message.error(e.response.data.message);}
	};
	useEffect(()=>{
		console.log(selectedRowKeys)
	},[selectedRowKeys])
	useEffect(()=>{
		handleGetSP();
		handleGetNCC();
	},[])
    return (
        <div style={{ padding: '20px' }}>
            <h2>Thêm lô hàng</h2>
            <hr />
						<Form
							form={form}
							onFinish={handleSubmit}
						>
							<Form.Item
								name='idNhaCungCap'
								label='Nhà cung cấp:'
								labelCol={{span:3}}
								wrapperCol = {{ span: 12 }}
								rules={[
										{ required: true, message: 'Chưa chọn nhà cung cấp!' },
									]}
							>
								<Select
										placeholder="Chọn nhà cung cấp"
										allowClear
										style={{ width: '100%' }}
								>
										{nhaCungCap?.map((n) => (
												<Option key={n.idNhaCungCap} value={n.idNhaCungCap ?? ""}>
														{n.tenNhaCungCap ?? "Không có tên"}
												</Option>
										))}
								</Select>
							</Form.Item>
						
						<Button className='mb-4' onClick={handleOpenModal}>Thêm sản phẩm</Button>

						 
							{formMap()}
							<br/>
							<Button htmlType='submit'>Thêm</Button>
						</Form>
						<Modal open={showModal}
							
								onCancel={handleCancel}
								onOk={handleOk}
						>
							<Input
								placeholder="Tìm kiếm ID Sản Phẩm"
								onChange={handleSearch}
								style={{ marginBottom: '16px', width: '50%' }}
							/>
							<Table
								columns={columns}
								dataSource={filteredData}
								pagination={{ pageSize: 10}}
								rowKey="idSanPham"
								rowSelection={{
									selectedRowKeys,
									onChange: setSelectedRowKeys,
								}}
							/>
						</Modal>
        </div>
    );
};

export default BatchManagement;