import React from "react";
import { Form, Input, Button, message } from "antd";

const { TextArea } = Input;

export default function ContactForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Thông tin liên hệ:", values);
    message.success("Thông tin của bạn đã được gửi!");
    form.resetFields(); // Reset form sau khi gửi
  };

  const handleError = (errorInfo) => {
    console.error("Lỗi:", errorInfo);
    message.error("Vui lòng kiểm tra lại thông tin!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Liên hệ với chúng tôi</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={handleError}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề!" },
          ]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^\d{10}$/, message: "Số điện thoại phải có 10 chữ số!" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung!" },
          ]}
        >
          <TextArea rows={4} placeholder="Nhập nội dung liên hệ" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
