import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message } from 'antd';
import ButtonProfile from '../../components/Client/Button/ButtonProfile';

export default function ProfileLocation() {
    const [addresses, setAddresses] = useState([]); 
    const [newAddress, setNewAddress] = useState(''); 
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [selectedAddress, setSelectedAddress] = useState(null); 
    const [editedAddress, setEditedAddress] = useState(''); 

    useEffect(() => {
        const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
        setAddresses(savedAddresses);

        const defaultAddress = savedAddresses.find(addr => addr.isDefault);
        if (defaultAddress) {
            setSelectedAddress(defaultAddress);
        }
    }, []);

    const addAddress = () => {
        if (newAddress === '') {
            message.error('Vui lòng nhập địa chỉ!');
            return;
        }

        if (addresses.length >= 10) {
            message.error('Đã đạt giới hạn tối đa 10 địa chỉ!');
            return;
        }

        const newAddressObj = { 
            address: newAddress, 
            isDefault: false 
        };

        const updatedAddresses = [...addresses, newAddressObj];
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setNewAddress(''); 
    };

    const setDefaultAddress = (address) => {
        const updatedAddresses = addresses.map(addr =>
            addr.address === address ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
        );
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setSelectedAddress(address); 
    };

    const openEditModal = (address) => {
        setSelectedAddress(address);
        setEditedAddress(address); 
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
            addr.address === selectedAddress ? { ...addr, address: editedAddress } : addr
        );
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setIsModalVisible(false);
    };

    const deleteAddress = (address) => {
        const updatedAddresses = addresses.filter(addr => addr.address !== address);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    };

    return (
        <div style={{ marginLeft: 100 }}>
            <div>
                <label>Địa chỉ:</label>
                <Input
                    type="text"
                    name="address"
                    style={{ width: '500px', height: '40px', margin: 20 }}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                />
            </div>
            <ButtonProfile
                type="primary"
                onClick={addAddress}
            >
                Thêm địa chỉ
            </ButtonProfile>

            <div>
                <h3>Danh sách địa chỉ:</h3>
                {addresses.length === 0 ? (
                    <p>Chưa có địa chỉ nào</p>
                ) : (
                    <ul>
                        {addresses.map((address, index) => (
                            <li key={index}>
                                {address.address}
                                {address.isDefault && <span style={{ color: 'green', marginLeft: 10 }}>(Mặc định)</span>}
                                <Button
                                    style={{ marginLeft: 10 }}
                                    type="link"
                                    onClick={() => setDefaultAddress(address.address)}
                                >
                                    Chọn làm mặc định
                                </Button>
                                <Button
                                    style={{ marginLeft: 10 }}
                                    type="link"
                                    onClick={() => openEditModal(address.address)}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    style={{ marginLeft: 10 }}
                                    type="link"
                                    onClick={() => deleteAddress(address.address)}
                                >
                                    Xóa
                                </Button>
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
                    <ButtonProfile
                        type="primary"
                        onClick={handleEditSubmit}
                    >
                        Lưu thay đổi    
                    </ButtonProfile>
                </div>
            </Modal>
        </div>
    );
}
