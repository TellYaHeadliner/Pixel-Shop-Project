import React, { useState } from 'react';
import { Upload, Button, Input, Table, Form, Dropdown, Menu, message, Select, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './ProductManagementAdd.scss'
import CkeditorInsert from "../../../components/Admin/CKeditor/CkeditorInsert"
const ProductManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
		const navigate = useNavigate();
    
		const [choseDanhMuc,setChoseDanhMuc] = useState("");
		const [loaiSanPham,setLoaiSanPham] = useState(0);
		const [file, setFile] = useState(null);
		const [previewUrl, setPreviewUrl] = useState(null);
		const [ckeData, setCkeData] = useState("");
		const changeFile = ({ fileList: newFileList }) => {
			setFile(newFileList[0]);
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
			if (newFile && newFile.originFileObj) {
				setPreviewUrl(URL.createObjectURL(newFile.originFileObj));
			}
		};
		const thongTinDienThoai = () => (
			<>
				<div className='col-3'>
					<Form.Item
						name="heDieuHanh"
						label="Hệ điều hành:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="CPU"
						label="CPU:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="RAM"
						label="RAM:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="dungluongROM"
						label="Bộ nhớ trong:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
				<div className='col-3 d-flex flex-column justify-content-between'>
					<Form.Item
						name="manHinh"
						label="Màn hình:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="cameraTruoc"
						label="Camera trước:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="cameraSau"
						label="Camera sau:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="pin"
						label="Pin:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
				<div className='col-3 d-flex flex-column justify-content-between'>
					<Form.Item
						name="sac"
						label="Sạc:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="SIM"
						label="Sim:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="loa"
						label="Loa:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
				<div className='col-3 d-flex flex-column justify-content-between '>
					<Form.Item
						name="mauSac"
						label="Màu sắc:"
						labelCol={{span: 10}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="trongLuong"
						label="Trọng lượng:"
						labelCol={{span: 10}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>

					<Form.Item
						name="kichThuoc"
						label="Kích thước:"
						labelCol={{span: 10}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
			</>
		);
		const thongTinLapTop = ()=>(
			<>
				<div className='col-4 d-flex flex-column justify-content-between'>
					<Form.Item
						name="heDieuHanh"
						label="Hệ điều hành:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="CPU"
						label="CPU:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="kichThuoc"
						label="Kích thước:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="manHinh"
						label="Màn hình:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="GPU"
						label="GPU:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="loa"
						label="Sound card:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="congKetNoi"
						label="Cổng kết nối:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
				<div className='col-4 d-flex flex-column justify-content-between'>
					<div className='d-flex flex-column justify-content-between w-89 default-bnbg '>
					<Form.Item
						name="loaiROM"
						label="Loại ROM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						className='mt-4'
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="dungluongROM"
						label="Dung lượng ROM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="soKheROM"
						label="Số khe ROM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
					>
						<Input/>
					</Form.Item>
					</div>
					<Form.Item
						name="trongLuong"
						label="Trọng lượng:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						className='mt-4p5'
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="cameraTruoc"
						label="Webcam:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="pin"
						label="Pin:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
				<div className='col-4 d-flex flex-column justify-content-center'>
					<div className='d-flex flex-column justify-content-between w-89 default-bnbg '>
					<Form.Item
						name="RAM"
						label="Dung lượng RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						className='mt-4'
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="RAMToiDa"
						label="RAM tối đa:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="loaiRAM"
						label="Loại RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="busRAM"
						label="Buss RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
					>
						<Input/>
					</Form.Item>
					<Form.Item
						name="soluongkheRAM"
						label="Số lượng khe RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
					>
						<Input/>
					</Form.Item>
					</div>
					<Form.Item
						name="sac"
						label="Sạc:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						className='mt-4p5'
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
			</>
		);
    return (
        <div style={{ padding: '20px' }}>
            <h2>Thêm sản phẩm mới</h2>
            <hr />
            <div>
							<Button className="back-button" onClick={()=>navigate('/admin/products/')}> Trở lại </Button>

							<div className="body-form pt-5">
								<Form
									layout="Horizontal"
									initialValues={{
										loai: "0",
									}}
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
											<Form.Item 
												name="hang"
												label="Hãng:"
												labelCol={{span: 10}}
												wrapperCol={{span:14}}
												className='col-6'
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
									<div className='w-100 d-flex justify-content-center'>
										<div className='col-11 form-thongTin'>
											<div className='d-flex mt-4'>
												{loaiSanPham==0? thongTinDienThoai() : thongTinLapTop()}
											</div>
										</div>
									</div>
									<div className='w-100 d-flex justify-content-center'>
										<div className='mt-4 d-flex col-11'>
												<div className='col-1p173 d-flex justify-content-end'>
														Mô tả:
												</div>
												<div className="col-10p827">
													<Form.Item
												name="moTa"
												wrapperCol={{span: 24}}
												style={{marginLeft: "0.7%"}}
										>
																							
												<CkeditorInsert
													setData={setCkeData}
												/>

										</Form.Item>
												</div>
										</div>
									</div>
								</Form>
						</div>
					</div>
			</div>
    );
};

export default ProductManagement;