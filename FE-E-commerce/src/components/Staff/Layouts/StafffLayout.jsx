import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import StaffSidebar from '../Sidebar/Sidebar';
import "./StaffLayout.scss"; // Đảm bảo import CSS
const { Content, Sider } = Layout;

export default function StaffLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <StaffSidebar />
            <Layout style={{ marginLeft: '180px' }}>
                <Content style={{ margin: 0, minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}