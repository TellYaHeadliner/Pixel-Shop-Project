import React, { useState,useEffect, useContext, useRef} from 'react';
import { Button, Input, Table, Dropdown, Menu, message, Spin,Form, Tree } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import "./ProductManagement.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../../../routes/UserContext'
const ProductManagement = () => {
		const {setLoading, loading} = useContext(UserContext);
		const [loading2, setLoading2] = useState(true);
		const [loading3, setLoading3] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
		const navigate = useNavigate();
    const [listPrd, setListPrd] = useState([]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'idSanPham',
            key: 'idSanPham',
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
		const [selectedDanhMuc, setSelectedDanhMuc] = useState(null);
		const treeRef = useRef(null);
		const [categories, setCategories] = useState([]);
		const [treeVisible, setTreeVisible] = useState(true);
    const [searchTermT, setSearchTermT] = useState('');
		const [form] = Form.useForm();
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
		const filteredCategories = filterCategories(categories, searchTermT);
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
		const handleGetListPrd = async ()=>{
			setLoading3(true);
			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/getListSanPham',
					{text:searchTerm,idDanhMuc:selectedDanhMuc},
					{
						headers: {'Content-Type': 'application/json'}
					}
				)
				const list = response.data.data.map(prd=>{
					if(prd.trangThai == 0)
						return {...prd, trangThai:"Chưa bán"};
					if(prd.trangThai == 1)
						return {...prd, trangThai: "Đang bán"};
					if(prd.trangThai == 2)
						return {...prd, trangThai: "Ngừng bán"};
				})
				setListPrd(list);
			} catch (e){
				message.error(e.response.data.message);
			}
			setLoading3(false);
		}
				const getListDanhMuc = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/listDanhMuc');
				setCategories(response.data.data);
			} catch (e) {
				message.error("Lấy danh mục không thành công");
			}
		};

		useEffect(() =>{
			handleGetListPrd();
			document.addEventListener('mousedown', handleClickOutside);
			getListDanhMuc();
			setLoading(false);
			setLoading2(false);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
			

		},[]);

    const actionMenu = (record) => (
        <Menu>
            <Menu.Item onClick={() => handleUpdate(record.slug)}>
                Cập nhật
            </Menu.Item>
            <Menu.Item onClick={() => handleDelete(record.idSanPham)}>
                Xóa
            </Menu.Item>
						
            <Menu.Item onClick={() => handleHighlight(record.idSanPham)}>
                {record.noiBat == 0? "Nổi bật":"Hủy nổi bật"}
            </Menu.Item>
        </Menu>
    );

    const handleUpdate = (key) => {
        navigate('update/'+key)
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

		if (loading2) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }
    return (
        <div style={{ padding: '20px' }} className='w-100'>
            <h2>Quản lý sản phẩm</h2>
            <hr />
            <Input
                placeholder="Tìm kiếm sản phẩm theo tên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', marginBottom: '20px' }}
            />
						<Button type="primary" style={{ marginLeft: '10px' }} onClick={()=>handleGetListPrd()}>
                Tìm kiếm sản phẩm
            </Button>
            <Button type="primary" style={{ marginLeft: '10px' }} onClick={()=>navigate('/admin/products/add')}>
                Thêm sản phẩm
            </Button>
						<div className='d-flex w-100'>
												<Form
													form={form}
													className='w-30'
												>
												<Form.Item 
													name="idDanhMuc"
													label="Danh mục:"
													labelCol={{span: 7}}
													wrapperCol={{span:16}}
													className='col-12'
													>
													<Input readOnly/>
												</Form.Item>
												</Form>
												<div className='btnDanhMuc'>
													<Button onClick={()=>(
														setTreeVisible(!treeVisible)
													)}><EllipsisOutlined/></Button>
													<div className='treeDanhMuc' style={{ display: treeVisible ? 'none' : 'block'}} ref={treeRef}>
														<div className="view-section">
															<Input
																	placeholder="Tìm kiếm danh mục"
																	value={searchTermT}
																	onChange={(e) => setSearchTermT(e.target.value)}
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
						{loading3?
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
									<Spin size="large" />
							</div>
  						:
							<Table
									dataSource={listPrd}
									columns={columns}
									style={{ marginTop: '20px' }}
									pagination={false}
							/>
						}
        </div>
    );
};

export default ProductManagement;