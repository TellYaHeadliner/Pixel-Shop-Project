import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message, Select, DatePicker } from 'antd';
import ButtonProfile from '../../../components/Client/Button/ButtonProfile';
import './ProfileInformation.scss';
import axios from 'axios';
import { format, parseISO } from "date-fns";
import moment from 'moment';


export default function ProfileInformation() {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [userInfo, setUserInfo] = useState({data:[{},{}]});
    const [listLocation, setListLocation] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editField, setEditField] = useState("");
    const [defaultLoc, setDefaultLoc] = useState(null);
    const fieldLabels = {
        hoVaTen: "Họ và Tên",
        gioiTinh: "Giới Tính",
        ngaySinh: "Ngày Sinh",
        email: "Email",
        diaChi: "Địa Chỉ",
    };
    const [isDisabled, setIsDisabled] = useState(false);
    const [isClickM, setIsClickM] = useState(false);
    const [countdown, setCountdown] = useState(0); 
    const IdUser = 1;
    let timer = null;

    const handleGetProfile = async ()=>{
        const idNguoiDung = IdUser;
        console.log(idNguoiDung);
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/getProfile",
                {idNguoiDung},
                {
                    haeders:{
                        "Content-Type": "application/json",
                    },
                }
            );
            if(response.data.success) {
                response.data.data.ngaySinh = format(parseISO(response.data.data.ngaySinh), "dd/MM/yyyy");
                setUserInfo(response.data.data);
            }
        }catch (e) {
            const data = e.response.data;
            message.error(data.message);
        }
    }
    const handleGetListLocation = async() =>{
        const idNguoiDung = IdUser;
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/getDiaChiUser",
                {idNguoiDung},
                {
                    haeders:{
                        "Content-Type": "application/json",
                    },
                },
            )
            if(response.data.success) {
                setListLocation(response.data.data);
            }
        }catch(e){
            const data =e.response.data;
            message.error(data.message);
        }
    }

    useEffect(() => {
        handleGetProfile();
        handleGetListLocation();
    }, []);

    useEffect(() => {
        const updatedInfo = { ...userInfo };
        listLocation.forEach((l) => {
            if (l.macDinh == 1) {
                updatedInfo.diaChi = l.diaChi;
                setDefaultLoc(l.diaChi);
            }
        });
        form.setFieldsValue(updatedInfo);
    }, [userInfo, listLocation]);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            Modal.confirm({
                title: "Xác nhận thay đổi",
                content: "Bạn có chắc chắn muốn lưu các thay đổi không?",
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: async () => {
                    if(editField == "diaChi"){
                        try{
                            const data = {
                                idNguoiDung: IdUser,
                                idDiaChi: values[editField+2],
                            };
                            const response=await axios.post(
                                "http://127.0.0.1:8000/api/updateDefaultLocation",
                                data,
                                {
                                    headers: {'Content-Type': 'application/json'},
                                },
                            );
                            if(response.data.success){
                                handleGetListLocation();
                                setIsModalVisible(false);
                                message.success("Thông tin đã được cập nhật thành công!");
                            }
                        }catch(e){
                            message.error(e.response.data.message);
                        }
                    }
                    else{
                        const updatedInfo = { ...userInfo, [editField]: values[editField+2] }
                        console.log(updatedInfo);
                        updatedInfo.captcha = values['captcha'];

                        if(editField == "ngaySinh")
                            updatedInfo.ngaySinh = updatedInfo.ngaySinh.format("DD-MM-YYYY");
                        try{
                            const response = await axios.post(
                                editField == "email"?
                                 "http://127.0.0.1:8000/api/changeEmail"
                                :"http://127.0.0.1:8000/api/updateById",
                                updatedInfo,
                                {
                                    headers: { 'Content-Type': 'application/json' },
                                },
                            );
                            if(response.data.success) {
                                handleGetProfile();
                                setIsModalVisible(false);
                                message.success("Thông tin đã được cập nhật thành công!");
                                setIsClickM(false);
                                setIsDisabled(false);
                                clearTimeout(timer);
                                form.setFieldsValue({captcha: ""});
                            }
                        }catch(e) {
                            const data = e.response.data;
                            message.error(data.message);
                        }
                    }
                    
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
        form.setFieldsValue({captcha: ""});
    };

    const showModal = (field) => {
        setEditField(field);
        if(field == "diaChi")
            form.setFieldsValue({ [field + 2]: defaultLoc });
        else if(field == "ngaySinh"){
            form.setFieldsValue({ [field + 2]: null });
        }
        else
            form.setFieldsValue({ [field + 2]: userInfo[field] });
        setIsModalVisible(true);
    };

    const handleVerificationEmail = async () => {
            setIsClickM(true);
            setIsDisabled(true);
            setCountdown(180); 
            timer = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(timer); 
                  setIsDisabled(false);
                  setIsClickM(false);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
        try {
          const values = await form.validateFields([
            "email2",
          ]);
          const email = values.email2;
          const tenDangNhap = values.email2;
          const name = userInfo.hoVaTen;
    
          const response = await axios.post(
            "http://127.0.0.1:8000/api/VerificationEmail",
            { email,tenDangNhap,name },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            message.success(response.data.message + " qua email:" + email);
          }
        } catch (error) { 
          message.error(error.response.data.message);
          clearInterval(timer);
          setIsDisabled(false);
          setIsClickM(false);
        }
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
                                        <Select.Option value= {0}>Nữ</Select.Option>
                                        <Select.Option value= {1}>Nam</Select.Option>
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

                <div className="col-6" className='d-block'
                    style={{marginLeft:'15%'}}
                >
                        <div >
                            <h3>Ảnh đại diện:</h3>
                            <img
                                src={"http://127.0.0.1:8000/imgs/"+userInfo.anhDaiDien}
                                alt="Preview"
                                style={{
                                    width:'100%',
                                    height:'150px',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    <label
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#53CCED',
                            color: '#fff',
                            cursor: 'pointer',
                            marginTop:'20%'
                        }}
                    >
                        Chọn ảnh
                        <input
                            type="file"
                            accept="image/*"
														name="anhDaiDien"
                            onChange={handleFileChange}
                            style={{ display:'none' }}
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
                                    <Select.Option value = {1} >Nam</Select.Option>
                                    <Select.Option value = {0} >Nữ</Select.Option>
                                </Select>
                            </Form.Item>
                        ) : editField === "diaChi" ? (
                            <Form.Item
                                name={editField + 2}
                                rules={[
                                    { required: true, message: `Vui lòng chọn ${fieldLabels[editField]}!` },
                                    {type: "Oject"}
                                ]}
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
                                        {
                                            validator: (_, value) => {
                                                if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                                    if(!isClickM)
                                                        setIsDisabled(false); 
                                                    return Promise.resolve();
                                                }
                                                    setIsDisabled(true);
                                                return Promise.reject(new Error('Email không đúng định dạng!'));
                                            },
                                        },
                                    ]}
                                
                                >
                                    <Input/>
                                </Form.Item>
                                <div className='d-flex'>
                                    <Form.Item
                                    name='captcha'
                                    label='nhập mã xác nhận email'
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <div className="d-flex align-items-center justify-content-end w-50">
                                    <Button
                                        type="primary"
                                        onClick={handleVerificationEmail}
                                        disabled={isDisabled}
                                    >
                                        {isDisabled ? `Gửi lại sau ${countdown}s` : "Gửi mã"}
                                    </Button>
                                    </div>
                                </div>
                            </>
                        ) 
                        : editField=="ngaySinh" ?(
                            
                                <Form.Item
                                    name={editField+2}
                                    rules={[
                                        { required: true, message: `Vui lòng chọn ${fieldLabels[editField]}!` },
                                    ]}
                                >
                                    <DatePicker  format="DD/MM/YYYY"/>
                                </Form.Item>
                          
                        )
                        :(
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
