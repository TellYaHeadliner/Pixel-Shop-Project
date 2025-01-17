import React, { useState, useEffect,useContext } from 'react';
import { Modal, Button, Input, message, Select, Form, Flex } from 'antd';
import ButtonProfile from '../../../components/Client/Button/ButtonProfile';
import axios from 'axios';
const { Option } = Select;
import { UserContext } from '../../../routes/UserContext'; 

export default function ProfileLocation() {
    const {token} = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [editedAddress, setEditedAddress] = useState('');
    const [form] = Form.useForm();
    const [listTinhThanh, setListTinhThanh] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listXa, setListXa] = useState([]);
    const [formadd]=Form.useForm();
    



    const handleGetListLocation = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/getDiaChiUser",
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.success) {
                setAddresses(response.data.data);
            }
        } catch (e) {
            const data = e.response.data;
            message.error(data.message);
        }
    };
    const handleGetTinhTP = async () => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/p/',
                {
                    withCredentials: false,
                }
            );
            setListTinhThanh(response.data);
        } catch (e) {
            console.error('Lỗi:', e);
            message.error('Lấy danh sách tỉnh thành thất bại! Vui lòng thử lại sau');
        }
    };
    const handleGetQuanHuyen = async (key) => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/p/'+key,
                {
                    withCredentials: false,
                    params: {'depth':2},
                }
            );
            setListQuanHuyen(response.data.districts);
            formadd.setFieldsValue({district:null,ward:null});
            form.setFieldsValue({district:null,ward:null});
        } catch (e) {
            console.error('Lỗi:', e);
            message.error('Lấy danh sách quận huyện thất bại! Vui lòng thử lại sau');
        }
    };
    const handleGetXa = async (key) => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/d/'+key,
                {
                    withCredentials: false,
                    params: {'depth':2},
                }
            );
            setListXa(response.data.wards);
            formadd.setFieldsValue({ward:null});
            form.setFieldsValue({ward:null});
        } catch (e) {
            console.error('Lỗi:', e);
            message.error('Lấy danh sách quận huyện thất bại! Vui lòng thử lại sau');
        }
    };
    useEffect(() => {
        handleGetListLocation();
        handleGetTinhTP();
    }, []);

    const setDefaultAddress = async (id) => {
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/updateDefaultLocation",
                { idDiaChi:id},
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        "Content-Type": "application/json",
                    },
                }
            );
                if(response.data.success) {
                    message.success(response.data.message);
                    handleGetListLocation();
                }
        }catch(e){
            message.error(e.response.data.message)
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditSubmit = async (values) => {
        const {idDiaChi,sdt,note,loaiDiaChi,hoVaTen,province,district,ward,specificAddress} = values;
        const diaChi = specificAddress+', '+ward+', '+district+', '+province;
        console.log(values);
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/updateLocation",
                 {idDiaChi,sdt,note,loaiDiaChi,hoVaTen,diaChi},
                 {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                 }}
            )
            message.success(response.data.message);
            handleGetListLocation();    
            setIsModalVisible(false); 
            
            
        }catch (e){
            message.error(e.response.data.message);
        }
    };

    const deleteAddress = async(id) => {
        console.log(id);
        try{
            const response=await axios.post(
                  "http://127.0.0.1:8000/api/deleteLocation",
                 {idDiaChi:id},
                  {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                  }}
            )
            if(response.data.success){
                
                message.success(response.data.message);
                handleGetListLocation();
               
            }
        }catch(e){
            console.log(e.response.data)
            message.error(e.response.data.message);
        }
       
    };
    const addAddress = async (values) => {
        const {sdt,note,loaiDiaChi,hoVaTen,province,district,ward,specificAddress} = values;
        const diaChi = specificAddress+', '+ward+', '+district+', '+province;
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/addLocation",
                 {sdt,note,loaiDiaChi,hoVaTen,diaChi},
                 {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,

                 }}
            )
            message.success(response.data.message);
            handleGetListLocation();    
            setIsAddAddressModalVisible(false); 
            formadd.resetFields(); 
        }catch (e){
            message.error(e.response.data.message);
        }
    }
    
    const openEditModal = (diaChi) => {
        var diaChiS = diaChi.diaChi;
        var diaChiC = [];
        for (var i = 0; i < 3; i++) {
            var index = diaChiS.lastIndexOf(', ');
            diaChiC = [...diaChiC,diaChiS.slice(index+2)];
            diaChiS = diaChiS.slice(0, index);
        }
        diaChiC = [...diaChiC,diaChiS];
            form.setFieldsValue({
                idDiaChi: diaChi.idDiaChi,
                hoVaTen: diaChi.hoVaTen,
                sdt: diaChi.sdt,
                province: diaChiC[0],
                district: diaChiC[1],
                ward: diaChiC[2],
                specificAddress:diaChiC[3],
                loaiDiaChi: diaChi.loaiDiaChi,
            });
            setIsModalVisible(true); 
    };
    

    return (
        <div style={{ marginLeft: 10 }}>
            <div>
                <h1>Địa chỉ</h1>
                <hr />
                <ButtonProfile
                    type="primary"
                    onClick={() => setIsAddAddressModalVisible(true)}
                    style={{ marginLeft: 700 }}
                >
                    Thêm địa chỉ
                </ButtonProfile>
            </div>

            <Modal
                title="Thêm địa chỉ mới"
                visible={isAddAddressModalVisible}
                onCancel={() => setIsAddAddressModalVisible(false)}
                footer={null}
                width={'70%'}
            >
                <Form form={formadd} layout="vertical" 
                    onFinish={addAddress}>
                    <div style={{ display: 'flex' }}>
                        <Form.Item
                            label="Họ và tên"
                            name="hoVaTen"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input type="text" style={{ width: '300px', height: '40px' }} />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="sdt"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            style={{ marginLeft: 50 }}
                        >
                            <Input type="text" style={{ width: '300px', height: '40px' }} />
                        </Form.Item>
                    </div>
                    <div className='d-flex w-100'>
                        <Form.Item
                            className='col-4'
                            label="Tỉnh/Thành phố"
                            name="province"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành!' }]}
                        >
                            <Select style={{ width: '90%', height: '15%' }} onChange={(value,option)=>handleGetQuanHuyen(option.key)}>
                            {listTinhThanh.map(i => {
                                return <Option key={i.code} value={i.name}>{i.name}</Option>;
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='col-4'
                            label="Quận/Huyện"
                            name="district"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành!' }]}
                        >
                            <Select style={{ width: '90%', height: '15%' }} onChange={(value,option)=>handleGetXa(option.key)}>
                            {listQuanHuyen.map(i => {
                                return <Option key={i.code} value={i.name}>{i.name}</Option>;
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='col-4'
                            label="Xã/Phường"
                            name="ward"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành!' }]}
                        >
                            <Select style={{ width: '90%', height: '15%' }}>
                            {listXa.map(i => {
                                return <Option key={i.code} value={i.name}>{i.name}</Option>;
                            })}
                            </Select>
                        </Form.Item>
                    </div>
                    
                    <Form.Item
                        label="Địa chỉ cụ thể"
                        name="specificAddress"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
                    >
                        <Input type="text" style={{ width: '100%', height: '40px' }} />
                    </Form.Item>

                    <Form.Item
                        label="Loại địa chỉ"
                        name="loaiDiaChi"
                        rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
                    >
                        <Select style={{ width: '15%', height: '15%' }}>
                            <Option value="Nhà riêng">Nhà riêng</Option>
                            <Option value="Văn phòng">Văn phòng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ghi chú"
                        name="note"
                        
                    >
                        <Input/>
                    </Form.Item>
                    <ButtonProfile htmlType="submit">Thêm địa chỉ</ButtonProfile>
                </Form>
            </Modal>

            <div>
                <h3>Danh sách địa chỉ:</h3>
                {addresses.length === 0 ? (
                    <p>Chưa có địa chỉ nào</p>
                ) : (
                    <ul >
                        {addresses.map((address) => (
                            <>
                            <li key={address.idDiaChi} className='d-flex' style={{ fontSize: '100%' }}>
                                <div className='col-7'>
                                    {address.hoVaTen} | {address.sdt} | {`(${address.loaiDiaChi})`} <br />{address.diaChi}
                                </div>
                                <div className='col-5'>
                                    {address.macDinh == 0?
                                        <Button
                                            type="link"
                                            onClick={() => setDefaultAddress(address.idDiaChi)}
                                        >
                                            Chọn làm mặc định
                                        </Button>
                                    :
                                        <Button
                                            type="link"
                                        >
                                            <span style={{color:"red"}}>Đã chọn là mặc định</span>
                                        </Button>
                                    }
                                    <Button
                                        style={{  }}
                                        type="link"
                                        onClick={() => openEditModal(address)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => deleteAddress(address.idDiaChi)}
                                    >
                                        Xóa
                                    </Button>
                                   
                                </div>
                            </li>
                            <hr/>
                            </>
                        ))}
                    </ul>
                )}
            </div>

            <Modal
                title="Chỉnh sửa địa chỉ"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={'70%'}
            >
                <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
                <Form.Item name="idDiaChi" style={{display:'none'}}>
                    <Input />
                </Form.Item>
                    <Form.Item label="Họ và tên" name="hoVaTen">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="sdt">
                        <Input type="text" />
                    </Form.Item>

                    <div className='d-flex w-100'>
                        <Form.Item
                            className='col-4'
                            label="Tỉnh/Thành phố"
                            name="province"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành!' }]}
                        >
                            <Select style={{ width: '90%', height: '15%' }} onChange={(value,option)=>handleGetQuanHuyen(option.key)}>
                            {listTinhThanh.map(i => {
                                return <Option key={i.code} value={i.name}>{i.name}</Option>;
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='col-4'
                            label="Quận/Huyện"
                            name="district"
                            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                        >
                            <Select style={{ width: '90%', height: '15%' }} onChange={(value,option)=>handleGetXa(option.key)}>
                            {listQuanHuyen.map(i => {
                                return <Option key={i.code} value={i.name}>{i.name}</Option>;
                            })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className='col-4'
                            label="Xã/ Phường"
                            name="ward"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành!' }]}
                        >
                            <Select style={{ width: '90%', height: '15%' }}>
                            {listXa.map(i => {
                                return <Option key={i.code} value={i.name}>{i.name}</Option>;
                            })}
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item label="Địa chỉ cụ thể" name="specificAddress">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item
                        label="Loại địa chỉ"
                        name="loaiDiaChi"
                        rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
                    >
                        <Select style={{ width: '15%', height: '15%' }}>
                            <Option value="Nhà riêng">Nhà riêng</Option>
                            <Option value="Văn phòng">Văn phòng</Option>
                        </Select>
                    </Form.Item>

                    <ButtonProfile htmlType="submit">Lưu thay đổi</ButtonProfile>
                </Form>
            </Modal>
        </div>
    );
}
