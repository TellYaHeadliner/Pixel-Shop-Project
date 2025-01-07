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
} from "antd"; // Import Ant Design components
import { useState } from "react";
import styles from "./ModalLoginAndRegister.module.scss";
import axios from "axios";

const { TabPane } = Tabs;

const ModalLoginAndRegister = ({ show, onClose }) => {
  const [formRegister] = Form.useForm();
  const [key, setKey] = useState("Đăng nhập");
  const [captcha, setCaptcha] = useState("000000");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); 
  const [countdown, setCountdown] = useState(0); 

  axios.defaults.withCredentials = true;

  const handleLogin = async (values) => {
    try {
      const { tenDangNhap, matKhau, captcha } = values;
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { tenDangNhap, matKhau, captcha },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        setShowCaptcha(false);
        message.success(response.data.message);
      }
    } catch (error) {
      const data = error.response.data;
      if (!data.success) {
        if (data.data.solanthu === 5) {
          setShowCaptcha(false);
          message.error(data.message);
        } else if (data.data.solanthu >= 3) {
          setShowCaptcha(true);
          message.error(data.message);
          if (data.data.captcha) {
            setCaptcha(data.data.captcha);
          }
        } else {
          message.error(data.message);
        }
      }
    }
  };

  const handleRegister = async (values) => {
    try {
      const {
        gioiTinh,
        tenDangNhap,
        hoVaTen,
        email,
        matKhau,
        repeatMatKhau,
        ngaySinh,
        captcha,
      } = values;

      // Kiểm tra mật khẩu và nhập lại mật khẩu
      if (matKhau !== repeatMatKhau) {
        message.error("Mật khẩu và nhập lại mật khẩu không khớp!");
        return;
      }

      const formattedNgaySinh = ngaySinh.format("DD-MM-YYYY");

      // Gửi dữ liệu đăng ký qua API
      const response = await axios.post("http://127.0.0.1:8000/api/signup", {
        gioiTinh,
        tenDangNhap,
        hoVaTen,
        email,
        matKhau,
        repeatMatKhau,
        ngaySinh: formattedNgaySinh,
        captcha,
      });
      if (response.data.success) {
        message.success(response.data.message || "Đăng ký thành công!");
        formRegister.resetFields();
        setKey("Đăng nhập");
      }
    } catch (error) {
				console.error(error.response.data);
      message.error(error.response.data.message);
    }
  };

  const handleVerificationEmail = async () => {
    try {
      const values = await formRegister.validateFields([
        "tenDangNhap",
        "email",
        "hoVaTen",
        "matKhau",
        "repeatMatKhau",
        "ngaySinh",
      ]);

      const email = values.email;
      const tenDangNhap = values.tenDangNhap;
      const name = values.hoVaTen;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/VerificationEmail",
        { email, tenDangNhap, name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setIsDisabled(true);
        setCountdown(180); 
        message.success(response.data.message + " qua email:" + email);
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
			console.error(error.response.data);
      message.error(error.data.message);
    }
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
              label="Tên đăng nhập/ Email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email hoặc tên đăng nhập!",
                },
              ]}
            >
              <Input name="email" placeholder="Tên/ Email" />
            </Form.Item>

            <Form.Item name="session" style={{ display: "none" }}>
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
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              ]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              name="hoVaTen"
              label="Họ và Tên:"
              rules={[
                { required: true, message: "Vui lòng nhập họ tên của bạn!" },
              ]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="ngaySinh"
              label="Ngày sinh"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
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
