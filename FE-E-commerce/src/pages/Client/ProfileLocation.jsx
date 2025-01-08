import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message, Select, Form } from 'antd';
import ButtonProfile from '../../components/Client/Button/ButtonProfile';

const { Option } = Select;

export default function ProfileLocation() {
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddAddressModalVisible, setIsAddAddressModalVisible] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [editedAddress, setEditedAddress] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchAddressesFromAPI = () => {
            setTimeout(() => {
                const fetchedAddresses = [
                    {
                        id: 1,
                        fullName: "Nguyễn Văn A",
                        phoneNumber: "0912345678",
                        city: "Hà Nội",
                        specificAddress: "Số 10, phường 5 quận 8",
                        isOffice: false,
                        isDefault: true,
                    },
                    {
                        id: 2,
                        fullName: "Trần Thị B",
                        phoneNumber: "0987654321",
                        city: "Hồ Chí Minh",
                        specificAddress: "Số 20, Phố Z, Quận W",
                        isOffice: true,
                        isDefault: false,
                    },
                ];

                setAddresses(fetchedAddresses);
                const defaultAddress = fetchedAddresses.find(addr => addr.isDefault);
                if (defaultAddress) {
                    setSelectedAddressId(defaultAddress.id);
                }
            }, 1000); 
        };

        fetchAddressesFromAPI();
    }, []);

    const addAddress = (values) => {
        const { fullName, phoneNumber, city, specificAddress, isOffice } = values;

        if (addresses.length >= 10) {
            message.error('Đã đạt giới hạn tối đa 10 địa chỉ!');
            return;
        }

        const newAddressObj = {
            id: Date.now(), // Tạo ID duy nhất
            fullName,
            phoneNumber,
            city,
            specificAddress,
            isOffice,
            isDefault: false,
        };

        const updatedAddresses = [...addresses, newAddressObj];
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

        form.resetFields();
        setIsAddAddressModalVisible(false);

        message.success('Địa chỉ đã được thêm thành công!');
    };

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
        setEditedAddress(addressToEdit.specificAddress);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditSubmit = () => {
        if (editedAddress === '') {
            message.error('Vui lòng nhập địa chỉ mới!');
            return;
        }

        const updatedAddresses = addresses.map(addr =>
            addr.id === selectedAddressId ? { ...addr, specificAddress: editedAddress } : addr
        );
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setIsModalVisible(false);
    };

    const deleteAddress = (id) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== id);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        message.success('Địa chỉ đã được xóa!');
    };

    return (
        <div style={{ marginLeft: 10 }}>
            <div>
                <h2>Địa chỉ</h2>
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
                <Form form={form} layout="vertical" onFinish={addAddress}>
                    <div style={{ display: 'flex' }}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input type="text" style={{ width: '300px', height: '40px' }} />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            style={{ marginLeft: 50 }}
                        >
                            <Input type="text" style={{ width: '300px', height: '40px' }} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Tỉnh/Thành phố"
                        name="city"
                        rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành!' }]}
                    >
                        <Input type="text" style={{ width: '100%', height: '40px' }} />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ cụ thể"
                        name="specificAddress"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
                    >
                        <Input type="text" style={{ width: '100%', height: '40px' }} />
                    </Form.Item>

                    <Form.Item
                        label="Loại địa chỉ"
                        name="isOffice"
                        rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
                    >
                        <Select style={{ width: '15%', height: '15%' }}>
                            <Option value={false}>Nhà riêng</Option>
                            <Option value={true}>Văn phòng</Option>
                        </Select>
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
                            <li key={address.id} className='d-flex' style={{fontSize:'150%'}}>
                                {address.fullName} |{address.phoneNumber} <br />{address.city}, {address.specificAddress}
                                <div style={{marginLeft:'30%'}}>
                                    
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
                                    <div style={{marginLeft:'10%', fontSize:'70%'}}>
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
                <div>
                    <label>Địa chỉ mới:</label>
                    <Input
                        type="text"
                        value={editedAddress}
                        onChange={(e) => setEditedAddress(e.target.value)}
                    />
                    <ButtonProfile type="primary" onClick={handleEditSubmit}>
                        Lưu thay đổi
                    </ButtonProfile>
                </div>
            </Modal>
        </div>
    );
}
