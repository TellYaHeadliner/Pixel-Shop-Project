import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message, Select } from 'antd';
import ButtonProfile from '../../components/Client/Button/ButtonProfile';
import './ProfileInformation.scss';

export default function ProfileInformation() {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [listLocation, setListLocation] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editField, setEditField] = useState("");
    const fieldLabels = {
        hoVaTen: "Họ và Tên",
        gioiTinh: "Giới Tính",
        ngaySinh: "Ngày Sinh",
        email: "Email",
        diaChi: "Địa Chỉ",
    };

    useEffect(() => {
        const diaChi = [
            {
                idDiaChi: "1",
                diaChi: "KG",
                macDinh: "0"
            },
            {
                idDiaChi: "2",
                diaChi: "TN",
                macDinh: "1"
            },
        ];
        setListLocation(diaChi);

        const info = {
            hoVaTen: "TVy",
            gioiTinh: "2",
            ngaySinh: "15/07/2003",
            email: "viev6004@gmail.com",
        };
        setUserInfo(info);
    }, []);

   

    useEffect(() => {
        const updatedInfo = { ...userInfo };
        listLocation.forEach((l) => {
            if (l.macDinh === "1") {
                updatedInfo.diaChi = l.diaChi;
            }
        });
        form.setFieldsValue(updatedInfo);
    }, [userInfo, listLocation]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                localStorage.setItem('imagePreview', reader.result);
                setFile(selectedFile.name);
                message.success("Ảnh đại diện đã được cập nhật!");
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const changeDiaChi = () => {
        const diaChi = [...listLocation];
        diaChi[0].macDinh = "1";
        diaChi[1].macDinh = "0";

        setListLocation(diaChi);
    };

    const changeInfo = () => {
        const info = {
            hoVaTen: "Nguyễn Tuấn Kiệt",
            gioiTinh: "1",
            ngaySinh: "02/07/2004",
            email: "tuankietnguyen113@gmail.com",
        };
        setUserInfo(info);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            Modal.confirm({
                title: "Xác nhận thay đổi",
                content: "Bạn có chắc chắn muốn lưu các thay đổi không?",
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: () => {
                    const updatedInfo = { ...userInfo, [editField]: values[editField] };
                    setUserInfo(updatedInfo);
                    setIsModalVisible(false);
                    message.success("Thông tin đã được cập nhật thành công!");
                    console.log("Thay đổi đã được lưu:", updatedInfo);
                },
                onCancel: () => {
                    console.log("Thay đổi chưa được lưu");
                },
            });
        });
    };

    const handleCancel = () => {
        message.info("Thay đổi chưa được lưu");
        // form.setFieldsValue({ [editField]: userInfo[editField] });
        setIsModalVisible(false);
    };

    const showModal = (field) => {
        setEditField(field);
        form.setFieldsValue({ [field + 2]: userInfo[field] });
        setIsModalVisible(true);
    };

    return (
        <div>
            <h1>Thông tin cá nhân</h1>
            <hr />
            <div className="d-flex w-100">
                <div className="col-6 mt-3">
                    <Form form={form} layout="Horizontal">
                        <div className="d-flex">
                            <div className="col-9">
                                <Form.Item
                                    name="hoVaTen"
                                    label="Tên: "
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Input readOnly value={userInfo.hoVaTen} />
                                </Form.Item>
                            </div>
                            <div className="col-3">
                                <ButtonProfile
                                    type="primary"
                                    onClick={() => showModal("hoVaTen")}
                                >
                                    Chỉnh sửa
                                </ButtonProfile>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-9">
                                <Form.Item
                                    name="gioiTinh"
                                    label="Giới tính: "
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                   <Select
                                        value={userInfo.gioiTinh}
                                        disabled
                                    >
                                        <Select.Option value="1">Nam</Select.Option>
                                        <Select.Option value="2">Nữ</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-3">
                                <ButtonProfile
                                    type="primary"
                                    onClick={() => showModal("gioiTinh")}
                                >
                                    Chỉnh sửa
                                </ButtonProfile>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-9">
                                <Form.Item
                                    name="email"
                                    label="Email: "
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Input readOnly />
                                    
                                </Form.Item>
                            </div>
                            <div className="col-3">
                                <ButtonProfile
                                    type="primary"
                                    onClick={() => showModal("email")}
                                >
                                    Chỉnh sửa
                                </ButtonProfile>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-9">
                                <Form.Item
                                    name="ngaySinh"
                                    label="Ngày sinh:"
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Input readOnly />
                                </Form.Item>
                            </div>
                            <div className="col-3">
                                <ButtonProfile
                                    type="primary"
                                    onClick={() => showModal("ngaySinh")}
                                >
                                    Chỉnh sửa
                                </ButtonProfile>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-9">
                                <Form.Item
                                    name="diaChi"
                                    label="Địa chỉ: "
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 16 }}
                                    backgroundColor={'whit !important'}
                                >
                                    {/* Sử dụng Select để chọn địa chỉ */}
                                    <Select
                                        value={userInfo.diaChi}
                                        onChange={(value) => form.setFieldsValue({ diaChi: value })}
                                        disabled
                                    >
                                        {listLocation.map((loc) => (
                                            <Select.Option key={loc.idDiaChi} value={loc.diaChi}>
                                                {loc.diaChi}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-3">
                                <ButtonProfile
                                    type="primary"
                                    onClick={() => showModal("diaChi")}
                                >
                                    Chỉnh sửa
                                </ButtonProfile>
                            </div>
                        </div>
                    </Form>
                </div>

                <div className="col-6">
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
                            style={{ width: '500px', height: '40px', marginTop: 20 }}
                        />
                    </label>
                </div>

                <Modal
                    title={`Chỉnh sửa ${fieldLabels[editField]}`}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ [editField + 2]: userInfo[editField] }}
                    >
                        {editField === "gioiTinh" ? (
                            <Form.Item
                                name={editField + "2"}
                            >
                                <Select>
                                    <Select.Option value="1">Nam</Select.Option>
                                    <Select.Option value="2">Nữ</Select.Option>
                                </Select>
                            </Form.Item>
                        ) : editField === "diaChi" ? (
                            <Form.Item
                                name={editField + 2}
                                rules={[{ required: true, message: `Vui lòng chọn ${fieldLabels[editField]}!` }]}
                            >
                                <Select
                                    onChange={(value) => form.setFieldsValue({ diaChi2: value })}
                                >
                                    {listLocation.map((loc) => (
                                        <Select.Option key={loc.idDiaChi} value={loc.idDiaChi}>
                                            {loc.diaChi}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        ): editField ==="email" ?(
                            <>
                                <Form.Item
                                    name={editField+2}
                                    rules={[
                                        { required: true,  message: `Vui lòng nhập ${fieldLabels[editField]}!` },
                                        { type : 'email', message: 'Email không đúng định dạng!'}
                                    ]}
                                
                                >
                                    <Input/>
                                </Form.Item>
                                <div className='d-flex'>
                                    <Form.Item
                                    name='capcha'
                                    label='nhập mã xác nhận email'
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <div className="d-flex align-items-center justify-content-end w-50">
                                        <Button>Lấy mã</Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Form.Item
                                name={editField+2}
                                rules={[{ required: true, message: `Vui lòng nhập ${fieldLabels[editField]}!` }]}
                            >
                                <Input />
                            </Form.Item>

                        )}
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
