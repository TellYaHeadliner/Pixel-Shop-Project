import PropTypes from "prop-types";
import {
  Modal,
  Form,
  DatePicker,
  Button,
  Tabs,
  Input,
  Radio,
  message,
  AutoComplete,
} from "antd"; // Import Ant Design components
import { useState } from "react";
import styles from "./ModalLogin.module.css";
import axios from 'axios';

const { TabPane } = Tabs;

const ModalLogin = ({ show, onClose }) => {
  const [key, setKey] = useState("Đăng nhập");
  const [captcha, setCaptcha] = useState("000000");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [session,setSession]=useState('');

  axios.defaults.withCredentials=true;

  const handleLogin = async (values) => {
    try {
      const { tenDangNhap, matKhau, captcha } = values;
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { tenDangNhap, matKhau, captcha , session  },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );  
      if (response.data.success) {
        console.log(response.data);// show data trả về
        setShowCaptcha(false);
        message.success(response.data.message);
      }
    } catch (error) {   
      const data = error.response.data;
      if (!data.success) {   
          if (data.data.solanthu === 5){  
            setShowCaptcha(false);
            message.error(data.message);           
          } 
          else if(data.data.solanthu >=3){
            setShowCaptcha(true);
            message.error(data.message);
            if (data.data.captcha) {
              setCaptcha(data.data.captcha);
            }  
          } else{   
            message.error(data.message);
          }
      }  
    }
  };

  const handleRegister = () => {
    message.success("Đăng ký thành công!");
  };

  return (
    <Modal
      visible={show}
      onCancel={onClose}
      footer={null} // Disable default footer
      title={key === "Đăng nhập" ? "Đăng nhập" : "Đăng ký"}
    >
      <Tabs activeKey={key} onChange={setKey}>
        <TabPane tab="Đăng nhập" key="Đăng nhập">
          <Form onFinish={handleLogin}>
            <Form.Item
              name="tenDangNhap"
              label="Tên/ Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input type="email" name="email" placeholder="Tên/ Email" />
            </Form.Item>
        
            <Form.Item
              name="session"
              style={{ display: 'none' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password name="matKhau" placeholder="Password" />
            </Form.Item>
            {showCaptcha && (
              <Form.Item
                label="Mã captcha"
                name="captcha"
                rules={[
                  { required: true, message: "Vui lòng nhập mã captcha!" },
                ]}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: 8 }}>{captcha}</span>
                  <Input name="captcha" placeholder="Nhập mã captcha" />
                </div>
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Đăng ký" key="Đăng ký">
          <Form onFinish={handleRegister}>
            <Form.Item label="Giới tính">
              <Radio.Group>
                <Radio value="male">Anh</Radio>
                <Radio value="female">Chị</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              ]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="repeatPassword"
              label="Nhập lại mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <DatePicker />
            </Form.Item>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Form.Item
                name="captcha"
                label="Nhập mã OTP gửi qua email"
                rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
                style={{ marginBottom: 0 }} // Để loại bỏ khoảng cách không cần thiết
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi mã
              </Button>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

ModalLogin.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLogin;
