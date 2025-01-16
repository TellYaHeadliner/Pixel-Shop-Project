import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, notification } from 'antd';
import apiService from '../../../api/api';
import './WebsiteInfo.scss';

const { Title, Text } = Typography;

const WebsiteInfo = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await apiService.getThongTin();
                setInfo(response.data); // Giả sử response.data chứa thông tin bạn cần
            } catch (error) {
                console.error("Error fetching website info:", error);
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể tải thông tin trang web!',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, []);

    if (loading) {
        return <Spin />;
    }

    if (!info) {
        return <Text>Không có thông tin để hiển thị.</Text>;
    }

    return (
        <Card className='website-info'>
            <Title level={2}>Thông tin trang web</Title>
            <hr />
            <div className='input-group'>
                <Text strong>Dich vu của chúng tôi:</Text>
                <Text>{info.dichVu}</Text>
            </div>
            <div className='input-group'>
                <Text strong>Link TikTok:</Text>
                <Text>{info.tiktok}</Text>
            </div>
            <div className='input-group'>
                <Text strong>Link Facebook:</Text>
                <Text>{info.facebook}</Text>
            </div>
            <div className='input-group'>
                <Text strong>Link Instagram:</Text>
                <Text>{info.instagram}</Text>
            </div>
        </Card>
    );
};

export default WebsiteInfo;