import React, { useState } from 'react';
import { Button } from 'antd';
import ButtonProfile from '../Button/ButtonProfile';



export default function EditableField({ label, name, value, onChange, onEditClick, type, disabled }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(type === "password");

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            <label>{label}:</label>
            <input
                type={isPasswordVisible ? "password" : "text"}
                name={name}
                value={value}
                onChange={onChange}
                style={{ width: '250px', height: '30px', margin:15 }}
                disabled={disabled}
            />
            {type === "password" && (
                <Button
                    onClick={togglePasswordVisibility}
                   
                >
                    {isPasswordVisible ? "Hiện" : "Ẩn"}
                </Button>
            )}
            <ButtonProfile
                type="primary"
                onClick={onEditClick}
                
            >
                Chỉnh sửa
            </ButtonProfile>
        </div>
    );
}
