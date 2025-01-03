import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message } from 'antd';

export default function ProfileLocation() {
    const [addresses, setAddresses] = useState([]); // Lưu danh sách địa chỉ
    const [newAddress, setNewAddress] = useState(''); // Lưu địa chỉ mới nhập vào
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
    const [selectedAddress, setSelectedAddress] = useState(null); // Địa chỉ cần chỉnh sửa
    const [editedAddress, setEditedAddress] = useState(''); // Địa chỉ sau khi chỉnh sửa

    // Lấy danh sách địa chỉ đã lưu trong localStorage khi trang reload
    useEffect(() => {
        const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
        setAddresses(savedAddresses);

        // Nếu có địa chỉ mặc định đã lưu, chọn địa chỉ đó làm mặc định
        const defaultAddress = savedAddresses.find(addr => addr.isDefault);
        if (defaultAddress) {
            setSelectedAddress(defaultAddress);
        }
    }, []);

    // Hàm để thêm địa chỉ mới vào danh sách
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
        setNewAddress(''); // Reset ô nhập địa chỉ
    };

    // Hàm để chọn địa chỉ làm mặc định
    const setDefaultAddress = (address) => {
        const updatedAddresses = addresses.map(addr =>
            addr.address === address ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
        );
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setSelectedAddress(address); // Cập nhật địa chỉ mặc định
    };

    // Hàm mở modal chỉnh sửa địa chỉ
    const openEditModal = (address) => {
        setSelectedAddress(address);
        setEditedAddress(address); // Đặt giá trị địa chỉ vào ô nhập
        setIsModalVisible(true);
    };

    // Hàm để đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Hàm để lưu địa chỉ đã chỉnh sửa
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

    // Hàm để xóa địa chỉ
    const deleteAddress = (address) => {
        const updatedAddresses = addresses.filter(addr => addr.address !== address);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    };

    return (
        <div style={{ margin: 50 }}>
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
            <Button
                type="primary"
                style={{ backgroundColor: '#53CCED', border: 0 }}
                onClick={addAddress}
            >
                Thêm địa chỉ
            </Button>

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

            {/* Modal chỉnh sửa địa chỉ */}
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
                    <Button
                        type="primary"
                        style={{ marginTop: 10, backgroundColor: '#53CCED', border: 0 }}
                        onClick={handleEditSubmit}
                    >
                        Lưu thay đổi    
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
