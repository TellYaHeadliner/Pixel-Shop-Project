import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import "./AdminLayout.scss"; // Đảm bảo import CSS
import Sidebar from '../Sidebar/Sidebar';
import "./AdminLayout.scss";
const { Content, Sider } = Layout;

export default function AdminLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Sidebar />
            </Sider>
            <Layout style={{ marginLeft: '180px' }}>
                <Content style={{ margin: 0, minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}