import PropTypes from "prop-types";
import { Modal, Form, DatePicker, Button, Tabs, Input, Radio, message, AutoComplete } from "antd"; // Import Ant Design components
import { useState } from "react";
import styles from "./ModalLoginAndRegister.module.scss";

const { TabPane } = Tabs;

const ModalLoginAndRegister = ({ show, onClose }) => {
  const [key, setKey] = useState("Đăng nhập");
  const [captchaValue, setCaptchaValue] = useState("123456");

  const handleLogin = (values) => {
    if (values.captcha === captchaValue) {
      message.success("Đăng nhập thành công!");
    } else {
      message.error("Mã captcha không chính xác!");
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
      <Tabs className={styles.login_register_form} activeKey={key} onChange={setKey}>
        <TabPane tab="Đăng nhập" key="Đăng nhập">
          <Form onFinish={handleLogin}>
            <Form.Item name="email" label="Tên/ Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
              <Input type="email" placeholder="Tên/ Email" />
            </Form.Item>
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label="Mã captcha" required>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 8 }}>{captchaValue}</span>
                <Input
                  placeholder="Nhập mã captcha"
                  name="captcha"
                  rules={[{ required: true, message: 'Vui lòng nhập mã captcha!' }]}
                />
              </div>
            </Form.Item>
            <Form.Item>
              <Button className={styles.login_btn} type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Đăng ký" key="Đăng ký">
          <Form onFinish={handleRegister}>
            <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="repeatPassword" label="Nhập lại mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <DatePicker />
            </Form.Item>
            <Form.Item name="city" label="Thành phố/Tỉnh" rules={[{ required: true, message: 'Vui lòng nhập thành phố/tỉnh!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ cụ thể" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Giới tính">
              <Radio.Group>
                <Radio value="male">Anh</Radio>
                <Radio value="female">Chị</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item className={styles.showotp} name="otp" label="Mã OTP" >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <AutoComplete
                  key={num}
                  style={{ width: 35, marginRight: 8, textAlign: 'center' }}
                  value={num.toString()}
                />
              ))}
            </Form.Item>
            <Form.Item name="otp" label="Nhập mã OTP" rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
              <AutoComplete />
            </Form.Item>
            <Form.Item>
              <Button className={styles.register_btn} type="primary" htmlType="submit">
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