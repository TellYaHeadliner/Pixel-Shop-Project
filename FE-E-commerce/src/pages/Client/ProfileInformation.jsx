import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import EditableField from '../../components/Client/Input/Profile'; // Import EditableField từ file khác
import ModalProfile from '../../components/Client/Modals/ModalProfile';

export default function ProfileInformation() {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editField, setEditField] = useState(""); // Trường đang chỉnh sửa
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dob: "",
        address: "",
    });

    useEffect(() => {
        // Giả sử bạn lấy dữ liệu từ API hoặc localStorage
        const savedData = {
            name: "John Doe",
            email: "john@example.com",
            dob: "1990-01-01",
            address: "123 Main St",
        };
        setFormData(savedData);
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                localStorage.setItem('imagePreview', reader.result);
                setFile(selectedFile.name);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const showModal = (field) => {
        setEditField(field); // Ghi nhận trường đang chỉnh sửa
        setIsModalVisible(true); // Hiển thị modal
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <form className="d-flex" style={{ margin: 100 }}>
                <div className="d-block">
                    {["name", "email", "dob", "address"].map((field) => (
                        <EditableField
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={formData[field]}
                            type={field === "dob" ? "date" : "text"}
                            onChange={handleInputChange}
                            onEditClick={() => showModal(field)}  // Gọi hàm mở modal
                            disabled={false}  // Chỉnh sửa trường
                        />
                    ))}
                </div>

                <div style={{ marginLeft: 50 }}>
                    {imagePreview && (
                        <div>
                            <h3>Ảnh đại diện:</h3>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    marginLeft: '150px',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    )}
                    <label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ width: '500px', height: '40px', margin: 20 }}
                        />
                    </label>
                    {file && <p>File đã chọn: {file}</p>}
                </div>
            </form>

            {/* Modal */}
            <ModalProfile
                visible={isModalVisible}
                field={editField}
                value={formData[editField]}
                onOk={handleOk}
                onCancel={handleCancel}
                onChange={handleInputChange}
            />
        </div>
    );
}
