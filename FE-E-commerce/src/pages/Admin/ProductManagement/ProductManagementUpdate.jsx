import React, { useEffect, useState, useRef } from 'react';
import { Upload, Button, Input,  Form,  Select, Tree, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductManagementAdd.scss'
import CkeditorInsert from "../../../components/Admin/CKeditor/CkeditorInsert"
import axios from 'axios';
const ProductManagement = () => {
		const {slug} = useParams();
		const navigate = useNavigate();
    const [form] = Form.useForm();
		const [loaiSanPham,setLoaiSanPham] = useState(0);
		const [file, setFile] = useState(null);
		const [previewUrl, setPreviewUrl] = useState(null);
		const [ckeData, setCkeData] = useState("");
		const [treeVisible, setTreeVisible] = useState(true);
		const [selectedDanhMuc, setSelectedDanhMuc] = useState(null);
		const treeRef = useRef(null);

		///AN
		const [categories, setCategories] = useState([]);
		const [searchTerm, setSearchTerm] = useState('');
		const renderTree = (data) => {
        return data.map(cat => ({
            title: cat.tenDanhMuc,
            key: cat.idDanhMuc,
            children: cat.child.length > 0 ? renderTree(cat.child) : [],
        }));
    };
		const filterCategories = (data, term) => {
        return data.map(cat => {
                const matchedChildren = filterCategories(cat.child, term);
                if (cat.tenDanhMuc.toLowerCase().includes(term.toLowerCase()) || matchedChildren.length > 0) {
                    return { ...cat, child: matchedChildren };
                }
                return null;
            })
            .filter(Boolean);
    };
		const filteredCategories = filterCategories(categories, searchTerm);
		////

		const handleGetProduct = async () => {
			try{
				const response = await axios.post(
					'http://127.0.0.1:8000/api/getProductBySlug',
					{slug: slug},
					{
						headers: { 'Content-Type': 'application/json'},
					}
				)
				console.log(response.data.data);
			}
			catch(e){
				message.error(e.response.data.message);
			}

		}

		useEffect(() => {
			form.setFieldsValue({ idDanhMuc: selectedDanhMuc ? selectedDanhMuc.tenDanhMuc : "" });
		}, [selectedDanhMuc]);

		const selectDanhMuc = (listDanhMuc,id)=>{
			for(let dm of listDanhMuc){
				if(dm.idDanhMuc == id)
					return {idDanhMuc:dm.idDanhMuc, tenDanhMuc:dm.tenDanhMuc};
				if(dm.child.length > 0){
					const result = selectDanhMuc(dm.child, id);
					if(result)
						return result;
				}
			}
			return null;
		}

		const handleClickOutside = (event) => {
			if (treeRef.current && !treeRef.current.contains(event.target)) {
				setTreeVisible(true);
			}
		};

		const getListDanhMuc = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/listDanhMuc');
				setCategories(response.data.data);
			} catch (e) {
				message.error("Lấy danh mục không thành công");
			}
		};

		useEffect(() => {
			document.addEventListener('mousedown', handleClickOutside);
			handleGetProduct();
			getListDanhMuc();
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, []);

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
						rules={[
							{ required: true, message: 'Nhập hệ điều hành!' },
						]}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="CPU"
						label="CPU:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={[
							{ required: true, message: 'Nhập thông số CPU!' },
						]}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="RAM"
						label="RAM:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={[
							{ required: true, message: 'Nhập dung lượng RAM!' },
						]}
					>
						<Input className='input-gray' placeholder='GB' type='number'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({RAM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({RAM: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>
					<Form.Item
						name="dungLuongROM"
						label="Bộ nhớ trong:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={[
							{ required: true, message: 'Nhập dung lượng ROM!' },
						]}
					>
						<Input className='input-gray' placeholder='GB' type='number'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({dungLuongROM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({dungLuongROM: newValue})
									newValue = newValue + i;
								}
							}}/>
					</Form.Item>
				</div>
				<div className='col-3 d-flex flex-column justify-content-between'>
					<Form.Item
						name="manHinh"
						label="Màn hình:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={
							[{ required: true, message: 'Nhập thông số màn hình!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="cameraTruoc"
						label="Camera trước:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={
							[{ required: true, message: 'Nhập thông số camera trước!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="cameraSau"
						label="Camera sau:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={
							[{ required: true, message: 'Nhập thông số camera sau!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="pin"
						label="Pin:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={
							[{ required: true, message: 'Nhập thông số pin!' }]
						}
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
						rules={
							[{ required: true, message: 'Nhập thông số sạc!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="SIM"
						label="Sim:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={
							[{ required: true, message: 'Nhập thông số SIM!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="loa"
						label="Loa:"
						labelCol={{span: 10}}
						wrapperCol={{span: 14}}
						rules={
							[{ required: true, message: 'Nhập thông số loa!' }]
						}
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
						rules={
							[{ required: true, message: 'Nhập mô tả màu sắc!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="trongLuong"
						label="Trọng lượng:"
						labelCol={{span: 10}}
						wrapperCol={{span: 13}}
						rules={[
							{ required: true, message: 'Nhập trọng lượng!' },
						]}
					>
						<Input className='input-gray' type='number' placeholder='Kg'
							onChange={(e)=>{
								if(e.target.value < 0)
									form.setFieldsValue({trongLuong: ""})
							}}
						/>
					</Form.Item>

					<Form.Item
						name="kichThuoc"
						label="Kích thước:"
						labelCol={{span: 10}}
						wrapperCol={{span: 13}}
						rules={[
							{ required: true, message: 'Nhập thông số kích thước!' },
						]}
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
						rules={
							[{ required: true, message: 'Nhập hệ điều hành!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="CPU"
						label="CPU:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông số CPU!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="kichThuoc"
						label="Kích thước:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông kích thước!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="manHinh"
						label="Màn hình:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông màn hình!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="GPU"
						label="GPU:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông số GPU!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="loa"
						label="Sound card:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông số sound card!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="congKetNoi"
						label="Cổng kết nối:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập cổng kết nối!' }]
						}
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
						rules={
							[{ required: true, message: 'Nhập loại ROM!' }]
						}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="dungLuongROM"
						label="Dung lượng ROM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						rules={
							[{ required: true, message: 'Nhập dung lượng ROM!' }]
						}
					>
						<Input type='number' placeholder='GB'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({dungLuongROM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({dungLuongROM: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>

					<Form.Item
						name="soKheROM"
						label="Số khe ROM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						rules={
							[{ required: true, message: 'Nhập số khe ROM!' }]
						}
					>
						<Input type='number'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({soKheROM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({soKheROM: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>
					</div>
					<Form.Item
						name="trongLuong"
						label="Trọng lượng:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						className='mt-4p5'
						rules={
							[{ required: true, message: 'Nhập trọng lượng!' }]
						}
					>
						<Input className='input-gray' type='number' placeholder='Kg'
							onChange={(e)=>{
								if(e.target.value < 0)
									form.setFieldsValue({trongLuong: ""})
							}}
						/>
					</Form.Item>
					<Form.Item
						name="cameraTruoc"
						label="Webcam:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông số webcam!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
					<Form.Item
						name="pin"
						label="Pin:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						rules={
							[{ required: true, message: 'Nhập thông số pin!' }]
						}
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
						rules={
							[{ required: true, message: 'Nhập dung lượng RAM!' }]
						}
					>
						<Input type='number' placeholder='GB'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({RAM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({RAM: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>

					<Form.Item
						name="RAMToiDa"
						label="RAM tối đa:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						rules={
							[{ required: true, message: 'Nhập RAM tối đa!' }]
						}
					>
						<Input type='number' placeholder='GB'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({RAMToiDa: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({RAMToiDa: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>

					<Form.Item
						name="loaiRAM"
						label="Loại RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						rules={
							[{ required: true, message: 'Nhập loại RAM!' }]
						}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						name="busRAM"
						label="Buss RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						rules={
							[{ required: true, message: 'Nhập buss RAM!' }]
						}
					>
						<Input type='number' placeholder='MHz'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({busRAM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({busRAM: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>
					<Form.Item
						name="soLuongKheRAM"
						label="Số lượng khe RAM:"
						labelCol={{span: 8}}
						wrapperCol={{span: 15}}
						rules={
							[{ required: true, message: 'Nhập số lượng khe RAM!' }]
						}
					>
						<Input type='number'
							onChange={(e)=>{
								if(e.target.value <= 0)
									form.setFieldsValue({soLuongKheRAM: ""})
								let newValue = "";
								for(let i of e.target.value){
									if(i==".")
										form.setFieldsValue({soLuongKheRAM: newValue})
									newValue = newValue + i;
								}
							}}
						/>
					</Form.Item>
					</div>
					<Form.Item
						name="sac"
						label="Sạc:"
						labelCol={{span: 7}}
						wrapperCol={{span: 13}}
						className='mt-4p5'
						rules={
							[{ required: true, message: 'Nhập thông số sạc!' }]
						}
					>
						<Input className='input-gray'/>
					</Form.Item>
				</div>
			</>
		);

		const addProduct = async (values) => {
			let data = {...values};
			data.moTa = ckeData;
			data.img = file? file.originFileObj: null;
			data.idDanhMuc = selectedDanhMuc.idDanhMuc;
			console.log(data);
			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/addSanPham',
					data,
					{
						headers: { 'Content-Type': 'multipart/form-data'},
					}
				)
				message.success(response.data.message);
			} catch (e) {
				message.error(e.response.data.message);
			}
		}

    return (
        <div style={{ padding: '20px' }}>
            <h2>Cập nhật sản phẩm</h2>
            <hr />
            <div>
							<Button className="back-button" onClick={()=>navigate('/admin/products/')}> Trở lại </Button>

							<div className="body-form pt-5">
								<Form
									form = {form}
									onFinish={addProduct}
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
												rules={
														[{ required: true, message: 'Tên sản phẩm không được để trống!' }]
													}

											>
												<Input/>
											</Form.Item>
											<Form.Item
												name="gia"
												label="Giá bán:"
												labelCol={{span: 5}}
												wrapperCol={{span: 7}}
												rules={
														[{ required: true, message: 'Nhập giá sản phẩm!' }]
													}
											>
												<Input type='number' placeholder='VNĐ'
													onChange={(e)=>{
														if(e.target.value <= 0)
															form.setFieldsValue({gia: ""})
														let newValue = "";
														for(let i of e.target.value){
															if(i==".")
																form.setFieldsValue({gia: newValue})
															newValue = newValue + i;
														}
													}
												}/>
											</Form.Item>
											<Form.Item 
												name="hang"
												label="Hãng:"
												labelCol={{span: 10}}
												wrapperCol={{span:14}}
												className='col-6'
												rules={
														[{ required: true, message: 'Hãng không được để trống!' }]
													}
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
													rules={
														[{ required: true, message: 'Chưa chọn danh mục!' }]
													}
													>
													<Input readOnly/>
												</Form.Item>
												<div className='btnDanhMuc'>
													<Button onClick={()=>(
														setTreeVisible(!treeVisible)
													)}><EllipsisOutlined/></Button>
													<div className='treeDanhMuc' style={{ display: treeVisible ? 'none' : 'block'}} ref={treeRef}>
														<div className="view-section">
															<Input
																	placeholder="Tìm kiếm danh mục"
																	value={searchTerm}
																	onChange={(e) => setSearchTerm(e.target.value)}
																	style={{ marginBottom: '20px' }}
															/>
															<Tree
																	treeData={renderTree(filteredCategories)}
																	onSelect={(keys) => {
																			const selected = selectDanhMuc(categories,Number(keys[0]));
																			setSelectedDanhMuc(selected);
																	}}
															/>
														</div>
													</div>
												</div>
											</div>
											<Form.Item
												name="loai"
												label="Loại sản phẩm:"
												labelCol={{span: 5}}
												wrapperCol={{span: 7}}
											>
												<Select
													showSearch
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
															value: '1',
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
									<div className='w-100 d-flex justify-content-center'>
										<div className='col-11 d-flex justify-content-end mb-3'>
											<Button
												htmlType='submit'
												type='primary'
											>
												thêm
											</Button>
										</div>
									</div>
								</Form>
						</div>
					</div>
			</div>
    );
};

export default ProductManagement;