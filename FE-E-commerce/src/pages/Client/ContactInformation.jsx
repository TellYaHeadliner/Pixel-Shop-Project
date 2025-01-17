import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios"

const { TextArea } = Input;

export default function ContactForm() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log(values);
    const data = {...values}
    try{
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addLienHe",
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      message.success(response.data.message);
      form.resetFields();
    }catch(e){
      message.error(e.response.data.message);
    }
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
          name="hoVaTen"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="sdt"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^\d{10}$/, message: "Số điện thoại phải có 10 chữ số!" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="noiDung"
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
