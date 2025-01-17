import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Card } from 'antd';
import apiService from '../../../api/api';
import './WebsiteInfo.scss';

const AdminWebsiteInfo = () => {
    const [info, setInfo] = useState({
        dichVu: '',
        facebook: '',
        instagram: '',
        youtube: '',
        tiktok: '',
    });

    // Lấy thông tin hiện có từ API
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await apiService.getThongTin();
                setInfo(response.data);
            } catch (error) {
                console.error("Error fetching website info:", error);
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể tải thông tin trang web!',
                });
            }
        };

        fetchInfo();
    }, []);

    // Xử lý thay đổi dữ liệu trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };

    // Xử lý dữ liệu khi gửi form
    const handleSubmit = async (values) => {
        console.log("Dữ liệu trước khi gửi:", values);
        try {
            await apiService.updateThongTin(values);
            notification.success({
                message: 'Thành công',
                description: 'Cập nhật thông tin trang web thành công!',
            });
        } catch (error) {
            console.error("Error updating website info:", error);
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi cập nhật thông tin trang web!',
            });
        }
    };

    return (
        <Card className='admin-website-info'>
            <h2 className='heading'>Quản lý thông tin trang web</h2>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={info}
            >
                <Form.Item label="Dịch vụ" name="dichVu">
                    <Input name="dichVu" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Link Facebook" name="facebook">
                    <Input name="facebook" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Link Instagram" name="instagram">
                    <Input name="instagram" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Link YouTube" name="youtube">
                    <Input name="youtube" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Link TikTok" name="tiktok">
                    <Input name="tiktok" onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AdminWebsiteInfo;