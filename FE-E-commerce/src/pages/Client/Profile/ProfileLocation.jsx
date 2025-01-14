import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message, Select, Form } from 'antd';
import ButtonProfile from '../../../components/Client/Button/ButtonProfile';
import axios from 'axios';
const { Option } = Select;

export default function ProfileLocation() {
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [editedAddress, setEditedAddress] = useState('');
    const [form] = Form.useForm();
    const IdUser = 1;
    const [listTinhThanh, setListTinhThanh] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listXa, setListXa] = useState([]);
    const [formadd]=Form.useForm();

    const handleGetListLocation = async () => {
        const idNguoiDung = IdUser;
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/getDiaChiUser",
                { idNguoiDung },
                {
                    headers: {
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
        } catch (e) {
            console.error('Lỗi:', e);
            message.error('Lấy danh sách quận huyện thất bại! Vui lòng thử lại sau');
        }
    };
    useEffect(() => {
        handleGetListLocation();
        handleGetTinhTP();
    }, []);

    const setDefaultAddress = (id) => {
        const updatedAddresses = addresses.map(addr =>
            addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
        );
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setSelectedAddressId(id);
    };

    const openEditModal = (id) => {
        const addressToEdit = addresses.find(addr => addr.id === id);
        setSelectedAddressId(id);
        form.setFieldsValue({
            fullName: addressToEdit.fullName,
            phoneNumber: addressToEdit.phoneNumber,
            city: addressToEdit.city,
            specificAddress: addressToEdit.specificAddress,
            isOffice: addressToEdit.isOffice
        });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditSubmit = async () => {
        const idNguoiDung = IdUser;
        const idDiaChi = selectedAddressId;
        const { fullName, phoneNumber, city, specificAddress, isOffice } = form.getFieldsValue();

        if (!fullName || !phoneNumber || !city || !specificAddress) {
            message.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/updateDefaultLocation",
                {
                    idNguoiDung,
                    idDiaChi,
                    fullName,
                    phoneNumber,
                    city,
                    specificAddress,
                    isOffice,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                message.success(response.data.message);
                setIsModalVisible(false);
                handleGetListLocation();
            }
        } catch (e) {
            const data = e.response.data;
            message.error(data.message);
        }
    };

    const deleteAddress = (id) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== id);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        message.success('Địa chỉ đã được xóa!');
    };
    const addAddress = async (values) => {
        try{
            const resphonse = await axios.post(
                
            )
        }catch (e){
            message.error(e.reponse.data.message);
        }
    }

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

            {/* Modal thêm địa chỉ */}
            <Modal
                title="Thêm địa chỉ mới"
                visible={isAddAddressModalVisible}
                onCancel={() => setIsAddAddressModalVisible(false)}
                footer={null}
                width={800}
            >
                <Form form={formadd} layout="vertical" onFinish={addAddress()}>
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
                        label="Quận/Huyện"
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
                            <Option value={false}>Nhà riêng</Option>
                            <Option value={true}>Văn phòng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="sdt"
                        rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
                    >
                        <Input/>
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
                    <ul>
                        {addresses.map((address) => (
                            <li key={address.id} className='d-flex' style={{ fontSize: '120%' }}>
                                {address.sdt} <br />{address.diaChi}
                                <div style={{ marginLeft: '30%' }}>
                                    <Button
                                        style={{ }}
                                        type="link"
                                        onClick={() => setDefaultAddress(address.id)}
                                    >
                                        Chọn làm mặc định
                                    </Button>
                                    <Button
                                        style={{  }}
                                        type="link"
                                        onClick={() => openEditModal(address.id)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        style={{    }}
                                        type="link"
                                        onClick={() => deleteAddress(address.id)}
                                    >
                                        Xóa
                                    </Button>
                                    <div style={{ marginLeft: '10%', fontSize: '70%' }}>
                                        {address.isOffice && <span style={{ color: 'blue', marginLeft: 5 }}>(Văn phòng)</span>}
                                        {!address.isOffice && <span style={{ color: 'brown', marginLeft: 5 }}>(Nhà riêng)</span>}
                                        {address.isDefault && <span style={{ color: 'green', marginLeft: 5 }}>(Mặc định)</span>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Modal
                title="Chỉnh sửa địa chỉ"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
                    <Form.Item label="Họ và tên" name="fullName">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phoneNumber">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label="Tỉnh/Thành phố" name="city">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label="Địa chỉ cụ thể" name="specificAddress">
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item label="Loại địa chỉ" name="isOffice">
                        <Select>
                            <Option value={false}>Nhà riêng</Option>
                            <Option value={true}>Văn phòng</Option>
                        </Select>
                    </Form.Item>

                    <ButtonProfile htmlType="submit">Lưu thay đổi</ButtonProfile>
                </Form>
            </Modal>
        </div>
    );
}
