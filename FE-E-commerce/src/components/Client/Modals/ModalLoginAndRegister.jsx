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
} from "antd";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModalLoginAndRegister.module.scss";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";

const { TabPane } = Tabs;

const ModalLoginAndRegister = ({ show, onClose }) => {
  const [formRegister] = Form.useForm();
  const [key, setKey] = useState("Đăng nhập");
  const [captcha, setCaptcha] = useState("000000");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = useCallback(async (values) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        const { hoVaTen, anhDaiDien, email, role, token } = response.data.data;

        // Store user information in cookies
        Cookies.set('token', token, { expires: 1 }); // Expires in 1 day
        Cookies.set('user', JSON.stringify({ hoVaTen, email, role, anhDaiDien }), { expires: 1 });
        
        message.success(response.data.message);
        onClose();

        // Navigate based on role
        navigate(role === 1 ? "/admin" : role === 2 ? "/staff" : "/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      const data = error.response?.data;
      message.error(data?.success ? data.message : "An error occurred during login.");
    }
  }, [onClose, navigate]);

  const handleRegister = useCallback(async (values) => {
    if (values.matKhau !== values.repeatMatKhau) {
      message.error("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }

    try {
      const formattedNgaySinh = values.ngaySinh.format("DD-MM-YYYY");
      const response = await axios.post("http://127.0.0.1:8000/api/signup", {
        ...values,
        ngaySinh: formattedNgaySinh,
      });

      if (response.data.success) {
        message.success(response.data.message || "Đăng ký thành công!");
        formRegister.resetFields();
        setKey("Đăng nhập");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  }, [formRegister]);

  const handleVerificationEmail = useCallback(async () => {
    try {
      const values = await formRegister.validateFields([
        "tenDangNhap",
        "email",
        "hoVaTen",
        "matKhau",
        "repeatMatKhau",
        "ngaySinh",
      ]);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/VerificationEmail",
        {
          email: values.email,
          tenDangNhap: values.tenDangNhap,
          name: values.hoVaTen,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setIsDisabled(true);
        setCountdown(180);
        message.success(response.data.message + " qua email:" + values.email);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsDisabled(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  }, [formRegister]);

  useEffect(() => {
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <Modal
      open={show}
      onCancel={onClose}
      footer={null}
      title={key === "Đăng nhập" ? "Đăng nhập" : "Đăng ký"}
    >
      <Tabs activeKey={key} onChange={setKey}>
        <TabPane tab="Đăng nhập" key="Đăng nhập">
          <Form onFinish={handleLogin}>
            <Form.Item
              name="tenDangNhap"
              label="Tên đăng nhập/ Email"
              rules={[{ required: true, message: "Vui lòng nhập email hoặc tên đăng nhập!" }]}
            >
              <Input placeholder="Tên/ Email" />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {showCaptcha && (
              <Form.Item
                label="Mã captcha"
                name="captcha"
                rules={[{ required: true, message: "Vui lòng nhập mã captcha!" }]}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: 8 }}>{captcha}</span>
                  <Input placeholder="Nhập mã captcha" />
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
          <Form form={formRegister} onFinish={handleRegister}>
            <Form.Item
              name="gioiTinh"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Radio.Group>
                <Radio value="1">Anh</Radio>
                <Radio value="0">Chị</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="tenDangNhap"
              label="Tên đăng nhập"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              name="hoVaTen"
              label="Họ và Tên:"
              rules={[{ required: true, message: "Vui lòng nhập họ tên của bạn!" }]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: "Vui lòng nhập email hợp lệ!" }]}
            >
              <Input type="email" placeholder="abc@gmail.com" />
            </Form.Item>
            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="repeatMatKhau"
              label="Nhập lại mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="ngaySinh"
              label="Ngày sinh"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
            >
              <DatePicker />
            </Form.Item>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Form.Item
                name="captcha"
                label="Nhập mã OTP gửi qua email"
                rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
                style={{ marginBottom: 0 }}
              >
                <Input />
              </Form.Item>
              <Button
                type="primary"
                onClick={handleVerificationEmail}
                disabled={isDisabled}
              >
                {isDisabled ? `Gửi lại sau ${countdown}s` : "Gửi mã"}
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

ModalLoginAndRegister.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLoginAndRegister;