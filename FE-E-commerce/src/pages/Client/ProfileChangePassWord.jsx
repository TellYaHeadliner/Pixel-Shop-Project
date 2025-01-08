import React, { useState } from 'react';
import ButtonProfile from '../../components/Client/Button/ButtonProfile';
import { notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

export default function ChangePassword() {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const oldPasswordInDB = 'oldPassword123'; // Mật khẩu cũ giả định

    const handleSave = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            notification.error({
                message: 'Lỗi',
                description: 'Mật khẩu mới và xác nhận mật khẩu không khớp.',
            });
            return;
        }

        setTimeout(() => {
            if (passwordData.oldPassword !== oldPasswordInDB) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Mật khẩu cũ không chính xác.',
                });
                return;
            }

            console.log('Cập nhật mật khẩu:', passwordData);
            notification.success({
                message: 'Thành công',
                description: 'Mật khẩu đã được cập nhật thành công.',
            });
        }, 1000);
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleInputChange = (field, value) => {
        setPasswordData({
            ...passwordData,
            [field]: value,
        });
    };

    return (
        <div style={{ marginLeft: 100, width: 500 }}>
            <h2>Thay đổi mật khẩu</h2>
            {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
                <div key={field} style={{ marginBottom: '20px', height: '70px' }}>
                    <label>
                        {field === 'oldPassword' ? 'Mật khẩu cũ' : field === 'newPassword' ? 'Mật khẩu mới' : 'Xác nhận mật khẩu'}:
                    </label>
                    <Input
                        type={showPassword[field] ? 'text' : 'password'}
                        value={passwordData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        style={{ width: 500 }}
                        addonAfter={
                            <span
                                onClick={() => togglePasswordVisibility(field)}
                                style={{ cursor: 'pointer' }}
                            >
                                {showPassword[field] ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            </span>
                        }
                    />
                </div>
            ))}

            <ButtonProfile onClick={handleSave}>Lưu thay đổi</ButtonProfile>
        </div>
    );
}
