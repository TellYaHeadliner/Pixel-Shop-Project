import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import EditableField from '../../components/Client/Input/Profile'; 
import ModalProfile from '../../components/Client/Modals/ModalProfile';
import ButtonProfile from '../../components/Client/Button/ButtonProfile';
export default function ProfileInformation() {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editField, setEditField] = useState(""); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dob: "",
        address: "",
    });

    useEffect(() => {
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
        setEditField(field);
        setIsModalVisible(true);
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
            <form className="d-flex" style={{ marginLeft:15 }}>
                <div className="d-block" style={{width:'550px'}}>
                    <h2>Thông tin cá nhân</h2>
                    {["name", "email", "dob", "address"].map((field) => (
                        <EditableField
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={formData[field]}
                            type={field === "dob" ? "date" : "text"}
                            onChange={handleInputChange}
                            onEditClick={() => showModal(field)}
                            disabled={false}

                        />
                    ))}
                </div>

                <div >
                    {imagePreview && (
                        <div>
                            <h3>Ảnh đại diện:</h3>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    marginLeft: '170px',
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
                            style={{ width: '500px', height: '40px', marginTop:20 }}

                        />
                    </label>
                    {/* {file && <p>File đã chọn: {file}</p>} */}
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
