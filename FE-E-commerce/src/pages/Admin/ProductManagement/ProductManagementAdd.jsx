import React, { useState } from 'react';
import { Upload, Button, Input, Table, Form, Dropdown, Menu, message, Select, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './ProductManagementAdd.scss'
const ProductManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
		const navigate = useNavigate();
    
		const [choseDanhMuc,setChoseDanhMuc] = useState("");
		const [loaiSanPham,setLoaiSanPham] = useState(0);
		const [file, setFile] = useState(null);
		const [previewUrl, setPreviewUrl] = useState(null);
		const changeFile = ({ fileList: newFileList }) => {
			setFile(newFileList[0]);
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
			if (newFile && newFile.originFileObj) {
				setPreviewUrl(URL.createObjectURL(newFile.originFileObj));
			}
		};

    return (
        <div style={{ padding: '20px' }}>
            <h2>Thêm sản phẩm mới</h2>
            <hr />
            <div>
							<Button className="back-button" onClick={()=>navigate('/admin/products/')}> Trở lại </Button>

							<div className="body-form pt-5">
								<Form
									layout="Horizontal"

								>
									<div className='d-flex'>
										<div className='col-6'>
											<Form.Item 
												name="tenSanPham"
												label="Tên sản phẩm:"
												labelCol={{span: 5}}
												wrapperCol={{span: 7}}
											>
												<Input/>
											</Form.Item>
											<Form.Item
												name="gia"
												label="Giá bán:"
												labelCol={{span: 5}}
												wrapperCol={{span: 7}}
											>
												<Input/>
											</Form.Item>
											<div className='d-flex'>
											<Form.Item 
												name="idDanhMuc"
												label="Danh mục:"
												labelCol={{span: 10}}
												wrapperCol={{span:14}}
												className='col-6'
												>
												<Input readOnly value={choseDanhMuc}/>
											</Form.Item>
											<Button>...</Button>
											</div>
											<Form.Item
												name="loai"
												label="Loại sản phẩm:"
												labelCol={{span: 5}}
												wrapperCol={{span: 7}}
											>
												<Select
													showSearch
													style={{
														width: 200,
													}}
													optionFilterProp="label"
													filterSort={(optionA, optionB) =>
														(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
													}
													defaultValue="0"
													onChange={(value)=>setLoaiSanPham(value)}
													options={[
														{
															value: '0',
															label: 'Điện thoại',
														},
														{
															value: '2',
															label: 'Laptop',
														}
													]}
												/>
											</Form.Item>
										</div>
										<div className='d-flex flex-column align-items-center w-100'>
											<Form.Item
												label="Hình ảnh sp:"
											>
												<Upload
													fileList={file ? [] : []}
													beforeUpload={() => false}
													onChange={changeFile}
													maxCount={1}
													accept="image/*"
												>
													<Button icon={<UploadOutlined />}>Chọn File</Button>
												</Upload>
											</Form.Item>
											<div>
												{file !== null ? (
													<img
														src={URL.createObjectURL(file.originFileObj)} // Tạo URL tạm thời cho file
														alt="Preview"
														style={{ maxWidth: '100%', maxHeight: '170px' }} // Thêm style để hình ảnh không bị phóng đại
													/>
												) : null}
											</div>
										</div>
									</div>
									{loaiSanPham==0?<div>Điện thoại</div>:<div>Laptop</div>}
									
								</Form>
							</div>
						</div>
        </div>
    );
};

export default ProductManagement;