import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import "./StaffLayout.scss"; // Đảm bảo import CSS
import StaffSidebar from '../Sidebar/Sidebar';
const { Content, Sider } = Layout;

export default function StaffLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <StaffSidebar />
            </Sider>
            <Layout style={{ marginLeft: '180px' }}>
                <Content style={{ margin: 0, minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}