import React from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import './WebsiteInfo.scss';

const { Title } = Typography;

const WebsiteInfo = () => {
    const value = 'https://example.com';
    const Phonevalue = '0123456789';

    const onFinish = (values) => {
        console.log('Received values: ', values);
    };

    return (
        <div className='website-info'>
            <Title level={2} className='heading'>Thông tin trang web</Title>
            <Divider />
            <Form
                name="websiteInfo"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Link trang web:"
                    name="websiteName"
                    initialValue={value}
                    rules={[{ required: true, message: 'Vui lòng nhập tên trang web!' }]}
                >
                    <Input placeholder='Nhập tên trang web' />
                </Form.Item>

                <Form.Item
                    label="Link TikTok:"
                    name="websiteUrl"
                    initialValue={value}
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ URL!' }]}
                >
                    <Input placeholder='Nhập địa chỉ URL' />
                </Form.Item>

                <Form.Item
                    label="Link Facebook:"
                    name="websiteEmail"
                    initialValue={value}
                    rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                >
                    <Input placeholder='Nhập email liên hệ' />
                </Form.Item>

                <Form.Item
                    label="Link Instagram:"
                    name="websiteIg"
                    initialValue={value}
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ Instagram!' }]}
                >
                    <Input placeholder='Nhập địa chỉ Instagram' />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại:"
                    name="websitePhone"
                    initialValue={Phonevalue}
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input type="tel" placeholder='Nhập số điện thoại' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='save-button'>
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default WebsiteInfo;