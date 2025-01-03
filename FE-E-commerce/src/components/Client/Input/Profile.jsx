// EditableField.js
import React from 'react';
import { Button } from 'antd';

export default function EditableField({ label, name, value, onChange, onEditClick, type, disabled }) {
    return (
        <div>
            <label>{label}:</label>
            <input
                type={type || "text"}
                name={name}
                value={value}
                onChange={onChange}
                style={{ width: '500px', height: '40px', margin: 20 }}
                disabled={disabled}
            />
            <Button
                type="primary"
                onClick={onEditClick}
                style={{ backgroundColor: '#53CCED', border: 0 }}
            >
                Chỉnh sửa
            </Button>
        </div>
    );
};


