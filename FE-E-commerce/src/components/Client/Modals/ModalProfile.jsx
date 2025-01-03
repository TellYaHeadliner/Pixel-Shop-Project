// ModalProfile.jsx
import React from 'react';
import { Modal } from 'antd';

export default function ModalProfile({ visible, field, value, onOk, onCancel, onChange }) {
  return (
    <Modal
      title={`Chỉnh sửa ${field}`}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>
        <label>{field}:</label>
        <input
          type={field === "dob" ? "date" : "text"}
          name={field}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
    </Modal>
  );
}
