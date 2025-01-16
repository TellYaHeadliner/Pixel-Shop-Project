import { Layout } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import "./AdminLayout.scss"; // Đảm bảo import CSS
import Sidebar from '../Sidebar/Sidebar';
import "./AdminLayout.scss";
const { Content, Sider } = Layout;
import { useEffect } from 'react';


export default function AdminLayout() {

    useEffect(() => {
        document.title = 'Quản trị';
    }, []);
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout style={{ marginLeft: '350px' }}>
                <Content style={{ margin: 0, minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}